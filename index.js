const { execSync } = require('child_process');
const { existsSync } = require('fs');

exports.push = async function push(link, username) {
  if (link == "-v") return console.log(require("./package.json").version);
  link = username ? `https://github.com/${username}/${link}.git` : link;
  let dirname = execSync('cd');
  console.log(dirname + "/.git")
  if (existsSync(dirname + "/.git")) {
    execSync('git add .');
    execSync('git commit -m "Update"');
    execSync('git push');
    return
  }
  if (!link) return console.log('Please provide a link to push');
  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "Initial commit"');
  execSync('git branch -M main');
  execSync('git remote add origin ' + link);
  execSync('git push -u origin main');
}


