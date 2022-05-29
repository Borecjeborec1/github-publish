const { execSync } = require('child_process');

exports.push = async function push(link) {
  if (link == "-v") return console.log(require("./package.json").version);
  if (link.startsWith("http")) {
    execSync('git init');
    execSync('git add .');
    execSync('git commit -m "Initial commit"');
    execSync('git branch -M main');
    execSync(`git remote add origin ${link}`);
    execSync('git push -u origin main');
  } else {
    execSync('git add .');
    execSync('git commit -m ' + link);
    execSync('git push');
  }
}


