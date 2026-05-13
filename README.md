<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0f0f,100:1a1a2e&height=200&section=header&text=GhostCommit&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Backfill%20your%20GitHub%20contribution%20graph%20silently&descAlignY=58&descSize=16&descColor=aaaaaa" width="100%" />
</div>

<div align="center">

  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-1a1a2e?style=for-the-badge&logo=linux&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Author-ghozali25-ff6b6b?style=for-the-badge&logo=github&logoColor=white" />
  <a href="https://github.com/ghozali25/GhostCommit/stargazers">
    <img src="https://img.shields.io/github/stars/ghozali25/GhostCommit?style=for-the-badge&logo=apachespark&logoColor=white&color=f5a623" />
  </a>

</div>

<br />

> GhostCommit fills your GitHub contribution graph with backdated commits, randomly distributed across the past year. Built to be minimal, stable, and safe to run for hundreds of commits without crashing.

---

## Preview

```
+ GhostCommit: Auto Commit Tool +
+ AUTHOR : ghozali25
+ GITHUB : ghozali25
  Total  : 100
  Push   : after all

  [########################################]  100.0% (100/100)

  ----------------------------------------
  Success : 100 commits
  Time    : 12.4s
  Speed   : 8.1 commit/s
  ----------------------------------------
```

---

## Requirements

<table>
  <tr>
    <td><img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" /></td>
    <td>Git installed and configured with user name and email</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" /></td>
    <td>Node.js version 18 or higher</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" /></td>
    <td>A remote repository with push access</td>
  </tr>
</table>

---

## 🚀 Quick Start

Follow these steps to set up GhostCommit and start backfilling your contribution graph.

### 1. Create a Repository
1. Go to [GitHub](https://github.com/new) and create a **new repository** (can be public or private).
2. Name it something like `my-contributions`.
3. Do **not** initialize it with a README or License.

### 2. Setup Locally
Open your terminal/command prompt and run:

```bash
# Clone this repository
git clone https://github.com/ghozali25/GhostCommit.git
cd GhostCommit

# Initialize your own remote (optional if you want to push to your own repo)
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3. Installation
GhostCommit is built with zero external dependencies to ensure stability. You only need Node.js installed.

```bash
# No npm install needed!
# Just ensure you have Node.js 18+
node -v
```

---

## ⚙️ Configuration

Open `GhostCommit.js` and edit the `Config` object at the top:

```javascript
const Config = {
    StartYear: 2023,   // The year to start from
    EndYear: null,     // The year to end (null for "Today")
    CommitsPerDay: 50, // How many commits per day
    PushAfterAll: true, // Auto-push to GitHub when finished
    Verbose: false,    // Show detailed logs
};
```

| Key | Default | Description |
|---|---|---|
| `StartYear` | `2023` | The year the script starts generating commits. |
| `EndYear` | `null` | The year to stop. If `null`, it goes up to today's date. |
| `CommitsPerDay` | `50` | Number of commits to generate for every single day. |
| `PushAfterAll` | `true` | Automatically runs `git push` after all commits are done. |
| `DataFile` | `./data.json` | The file that gets modified to trigger a real commit. |

---

## 🏃 Usage

Once configured, simply run:

```bash
node GhostCommit.js
```

### What happens next?
1. GhostCommit calculates every date from `StartYear` to `EndYear`.
2. It generates `CommitsPerDay` commits for each date.
3. A beautiful progress bar shows the status.
4. Once finished, it pushes everything to your GitHub repository.

---

## 📂 Project Structure

```
GhostCommit/
├── GhostCommit.js   — The engine
├── data.json        — Tracked file (modified per commit)
├── package.json     — Project metadata
└── README.md        — Documentation
```

---

<div align="center">
  <img src="https://img.shields.io/badge/Made%20by-ghozali25-ff6b6b?style=for-the-badge&logo=github&logoColor=white" />
  <br /><br />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:0f0f0f&height=100&section=footer" width="100%" />
</div>
