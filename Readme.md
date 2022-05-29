# Github-publisher

Github-publisher is simple library for pushing to github with 1 command 
```shell
  github-publisher https://github.com/<username>/<reponame>.git
```
instead of 
```shell
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin <repolink>
  git push -u origin main
```

# Uses
```shell
  github-publisher https://github.com/<username>/<reponame>.git
```
For existing repos
```shell
  github-publisher <commit>
```

