const { spawn, execSync } = require('child_process');
const fs = require("fs")


exports.push = async function push(link) {
  if (link == "-v") return console.log(require("./package.json").version);
  if (link[0].startsWith("http")) {
    const commands = [
      { command: 'git', args: ['init'] },
      { command: 'git', args: ['add', '.'] },
      { command: 'git', args: ['commit', '-m', 'Initial commit'] },
      { command: 'git', args: ['branch', '-M', 'main'] },
      { command: 'git', args: ['remote', 'add', 'origin', link] },
      { command: 'git', args: ['push', '-u', 'origin', 'main'] },
    ];
    for (const { command, args } of commands) {
      const proc = spawn(command, args);
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
      await new Promise(resolve => proc.on('close', resolve));
    }
    return
  }

  let projectVersion = ""
  try {
    let packageJSON = fs.readFileSync("./package.json", "utf-8")
    let { version } = JSON.parse(packageJSON)
    projectVersion = version
  } catch (er) {
    console.log("Couldnt find ./package.json")
    return
  }

  let isFeature = link.includes("--feature") || link.includes("-F")
  let isBugfix = link.includes("--bugfix") || link.includes("-B")
  let type = isFeature ? "feature" : isBugfix ? "bugfix" : ""

  link = link.join(' ').replace(/--feature|-F|--bugfix|-B/g, "").replace("  ", " ");

  let GHLink = execSync("git config --get remote.origin.url").toString().trim().replace(".git", "")
  if (type.length)
    updateChangelog(projectVersion, link, type, GHLink)

  const proc = spawn('git', ['add', '.']);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  await new Promise(resolve => proc.on('close', resolve));
  const message = link.replace(/"/g, '\\"');
  const commitProc = spawn('git', ['commit', '-m', message]);
  commitProc.stdout.pipe(process.stdout);
  commitProc.stderr.pipe(process.stderr);
  await new Promise(resolve => commitProc.on('close', resolve));
  const pushProc = spawn('git', ['push']);
  pushProc.stdout.pipe(process.stdout);
  pushProc.stderr.pipe(process.stderr);
  await new Promise(resolve => pushProc.on('close', resolve));
};


function updateChangelog(version, message, type, repo) {
  const changelogPath = "./CHANGELOG.md";
  if (!fs.existsSync(changelogPath))
    fs.writeFileSync(changelogPath, "");

  const changelogContent = fs.readFileSync(changelogPath, 'utf8').split("#### [");
  const currentDate = new Date().toISOString().split('T')[0];

  function getCommitLink(commitHash) {
    return `[${commitHash}](${repo}/commit/${commitHash})`;
  }
  const GH_SHA = execSync("git log -1 --format=\" % H\"").toString().trim()
  function getNewContent() {
    for (let i in changelogContent) {
      if (changelogContent[i].includes(version)) {
        console.log(`Added ${message} to ${type} in ${changelogPath} version v${version}`);
        if (type === "feature") {
          changelogContent[i] = changelogContent[i].replace(
            `##### Implemented enhancements:`,
            `##### Implemented enhancements:\n- ${message} (${getCommitLink(GH_SHA)})`
          );
          return changelogContent.join("#### [");
        } else if (type === "bugfix") {
          changelogContent[i] = changelogContent[i].replace(
            `##### Fixed bugs:`,
            `##### Fixed bugs:\n- ${message} (${getCommitLink(GH_SHA)})`
          );
          return changelogContent.join("#### [");
        }
      }
    }
    let structure = "";
    if (type === "feature") {
      structure = `# Changelog
#### [${version}] - ${currentDate}

[Full Changelog](${repo}/commits/main)

##### Implemented enhancements:
- ${message} (${getCommitLink(GH_SHA)}) 

##### Fixed bugs:
`;
    } else if (type === "bugfix") {
      structure = `# Changelog
#### [${version}] - ${currentDate}
[Full Changelog](${repo}/commits/main)

##### Implemented enhancements:

##### Fixed bugs:
- ${message} (${getCommitLink(GH_SHA)})
`;
    }
    console.log(`Created new version v${version} with ${message} inside ${type}`);
    return structure + changelogContent.join("#### [").replace("# Changelog", "");
  }

  fs.writeFileSync(changelogPath, getNewContent());
}
