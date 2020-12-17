# Release Process

Here are the steps to get the thing properly released on GitHub and published under the npm public registry. There's the need of some manual interventions throughout the release process.

## Requirements

- Make sure you're able to run `react-d3-graph` locally, follow the `Contributions` steps in the `README.md`.
- Install the [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator) gem locally. The distribution script will use it to automatically generate a changelog.
-

### Release steps

1.  Update versioning in `package.json` (don't forget the `package-lock.json`).
2.  `npm run dist:sandbox` - generates new sandbox assets.
3.  `npm run start` - server should keep running in the background as we're going to run
    cypress against it.
4.  `GITHUB_USERNAME=<your_user_name> VERSION_PREV=x.x.x VERSION_NEW=x.x.x npm run dist` (fill in the `VERSION_*` env vars properly to ensure we properly link documentation and changelogs during the build process)
5.  Replace current files in docs for the generated ones in gen-docs
6.  `git commit -am "Release x.x.x"`
7.  Create the release x.x.x in GitHub. Go to [releases](https://github.com/danielcaldas/react-d3-graph/releases) and click `"Draft a new release"`.
    1.  Pick a suitable title that highlights some of the most relevant changes.
    2.  Copy & paste the output of the new CHANGELOG into the release notes.
8.  Once you're done on GitHub, go back to you terminal and type `git pull origin master` to pull the latest tag.
9.  `npm publish` (see [npm-publish docs](https://docs.npmjs.com/cli/v6/commands/npm-publish) for more details).
