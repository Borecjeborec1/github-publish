const { exec, execSync } = require('child_process');
const { existsSync } = require('fs');

exports.push = async function push(link, username) {
  if (!link) return console.log('Please provide a link to push');
  if (link == "-v") return console.log(require("./package.json").version);
  link = username ? `https://github.com/${username}/${link}.git` : link;
  if (existsSync(__dirname + "/.git")) {
    execSync('git add .');
    execSync('git commit -m "Update"');
    execSync('git push');
    return
  }
  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "Initial commit"');
  execSync('git branch -M main');
  execSync('git remote add origin ' + link);
  execSync('git push -u origin main');
}


