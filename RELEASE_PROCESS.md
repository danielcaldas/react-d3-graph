## Release Process

This is not yet a full automated process, so here are a few steps to get the thing properly released on github and publish under npm registry.

### Setup (serve a local version to run tests against it)

1.  npm run dist:sandbox
2.  npm run start (server should keep running in the background as we're going to run
    cypress against it)

### Release steps

1.  Update versioning in package.json
2.  npm run dist
3.  npm run docs
4.  Small tweaks on documentation page (quicklinks)
5.  Replace current files in docs for the generated ones in gen-docs
6.  Generate CHANGELOG.md
    ```bash
        github_changelog_generator since-tag=<PREVIOUS_RELEASED_VERSION> -u GITHUB_USERNAME
    ```
7.  git commit -m "Release x.x.x"
8.  Create release x.x.x in github
9.  git pull (origin master)
10. npm publish
