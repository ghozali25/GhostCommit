// GHOST COMMIT
// AUTHOR : ghozali25
// GITHUB : https://github.com/ghozali25/GhostCommit

import { writeFileSync } from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const Dirname = path.dirname(fileURLToPath(import.meta.url));

const Config = {
    StartYear: process.env.DAILY_MODE === "true" ? new Date().getFullYear() : 2023,
    EndYear: process.env.DAILY_MODE === "true" ? new Date().getFullYear() : null,
    DataFile: "./data.json",
    RetryAttempts: 3,
    PushAfterAll: process.env.CI !== "true",
    Verbose: false,    // Set to false for cleaner output with many commits
    CommitsPerDay: 50  // How many commits to make per day (1 is enough for green)
};

// Override StartYear if we are in Daily Mode to only process today
if (process.env.DAILY_MODE === "true") {
    const Today = new Date();
    Config.StartYear = Today.getFullYear();
}

const Git = Args => {
    const Result = spawnSync("git", Args, {
        cwd: Dirname,
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 10
    });
    if (Result.status !== 0) {
        throw new Error(Result.stderr || Result.stdout || "git command failed");
    }
    return Result.stdout.trim();
};

const FormatDate = DateObj => {
    const Pad = N => String(N).padStart(2, "0");
    return (
        `${DateObj.getFullYear()}-${Pad(DateObj.getMonth() + 1)}-${Pad(DateObj.getDate())}` +
        `T12:00:00+07:00` // Fixed time at noon
    );
};

const ProgressBar = (Current, Total, Width = 40) => {
    const Pct = Current / Total;
    const Filled = Math.round(Pct * Width);
    const Bar = "#".repeat(Filled) + ".".repeat(Width - Filled);
    const Percent = (Pct * 100).toFixed(1).padStart(5);
    process.stdout.write(`\r  [${Bar}] ${Percent}% (${Current}/${Total})`);
};

const MakeCommit = (DateStr, Index) => {
    // Update data.json to make the commit "real"
    const Data = {
        LastCommit: DateStr,
        TotalProcessed: Index + 1
    };
    writeFileSync(path.join(Dirname, Config.DataFile), JSON.stringify(Data, null, 2));

    // Stage and Commit
    Git(["add", Config.DataFile]);
    Git([
        "commit",
        "-m",
        `GhostCommit: ${DateStr}`,
        `--date=${DateStr}`,
        "--no-verify"
    ]);

    if (Config.Verbose)
        process.stdout.write(`\n  OK -> ${DateStr}\n`);
};

const Run = () => {
    process.stdout.write(`\n+ GhostCommit - Auto Commit Tool +\n`);
    process.stdout.write(` + AUTHOR     :    ghozali25\n`);
    process.stdout.write(` + GITHUB     :    ghozali25\n`);
    process.stdout.write(`       Range  :    ${Config.StartYear} - ${Config.EndYear || "Today"} (Every Day)\n`);
    process.stdout.write(
        `       Push   :    ${Config.PushAfterAll ? "after all" : "CI handles"}\n\n`
    );

    try {
        Git(["rev-parse", "--is-inside-work-tree"]);
    } catch {
        process.stderr.write("  Not a git repository. Run 'git init' first.\n");
        process.exit(1);
    }

    // Calculate all dates
    const Dates = [];
    let Current = process.env.DAILY_MODE === "true" 
        ? new Date() 
        : new Date(`${Config.StartYear}-01-01T12:00:00`);
    
    const EndDate = Config.EndYear
        ? new Date(`${Config.EndYear}-12-31T23:59:59`)
        : new Date();

    while (Current <= EndDate) {
        for (let i = 0; i < Config.CommitsPerDay; i++) {
            Dates.push(FormatDate(new Date(Current)));
        }
        Current.setDate(Current.getDate() + 1);
    }

    const TotalCommits = Dates.length;
    process.stdout.write(`       Commits:    ${TotalCommits} commits to process\n\n`);

    let SuccessCount = 0;
    const StartTime = Date.now();

    for (let I = 0; I < TotalCommits; I++) {
        try {
            MakeCommit(Dates[I], I);
            SuccessCount++;
        } catch (Err) {
            process.stderr.write(`\n  Error at ${Dates[I]}: ${Err.message}\n`);
        }
        ProgressBar(I + 1, TotalCommits);
    }

    process.stdout.write("\n\n");

    if (Config.PushAfterAll) {
        process.stdout.write("  Pushing to GitHub...\n");
        try {
            Git(["push"]);
            process.stdout.write("  Push OK\n\n");
        } catch (Err) {
            process.stderr.write(`  Push failed: ${Err.message}\n`);
            process.stderr.write("  Please run 'git push' manually.\n\n");
        }
    }

    const Elapsed = ((Date.now() - StartTime) / 1000).toFixed(1);
    process.stdout.write(`${"─".repeat(40)}\n`);
    process.stdout.write(`  Total Commits: ${TotalCommits}\n`);
    process.stdout.write(`  Success    : ${SuccessCount} commits\n`);
    process.stdout.write(`  Time       : ${Elapsed}s\n`);
    process.stdout.write(`${"─".repeat(40)}\n\n`);
};

Run();


