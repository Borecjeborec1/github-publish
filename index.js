const { spawn } = require('child_process');

exports.push = async function push(link) {
  link = link.join(' ');
  if (link == "-v") return console.log(require("./package.json").version);
  if (link.startsWith("http")) {
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
  } else {
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
  }
};
