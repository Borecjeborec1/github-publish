# Github-publisher

Github-publisher is a simple library that allows you to push to GitHub with just one command. With the latest version of Github-publisher, it also handles the generation of a CHANGELOG file for your repository.

## Installation
To install Github-publisher, use the following command:
```shell
  npm install -g github-publisher
```

## Usage
#### Creating a New Repository
To create a new repository on GitHub and push your code to it, use the following command: 
```shell
github-publisher https://github.com/<username>/<reponame>.git
```

You can also use the shorter alias `gp`:

```shell
gp https://github.com/<username>/<reponame>.git
```

#### Pushing to an Existing Repository
If you already have a repository and want to push a commit to it, use the following command:

```shell
github-publisher <commit>
```

Again, you can use the shorter alias `gp`:
```shell
gp <commit>
```

#### Writing Changelog
Github-publisher allows you to include your commit in specific sections of the CHANGELOG file. Use the following flags to indicate the type of commit:

- `--bugfix` or `-B`: Add the commit under the "Fixed Bugs" section in the CHANGELOG.
- `--feature` or `-F`: Add the commit under the "Implemented Enhancements" section in the CHANGELOG.

If you don't provide any flags, the commit will be pushed to GitHub without modifying the CHANGELOG.

## Examples
Here's an example of using Github-publisher to create a new repository and push code to it:
```shell
gp https://github.com/<username>/<reponame>.git
```

Here's an example of using Github-publisher to publish new feature:
```shell
gp Added the ability to generate changelog -F
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [Github-publisher repository](https://github.com/Borecjeborec1/github-publisher).

## License
Github-publisher is released under the [MIT License](./LICENSE).