## Release Process

This is not yet a full automated process, so here are a few steps to get the thing properly released on github and publish under npm registry.

### Setup (serve a local version to run tests against it)

1.  npm run dist:sandbox
2.  npm run start

### Release steps

1.  Update versioning in package.json
1.  npm run dist
1.  npm run docs
1.  Small tweaks on documentation page (quicklinks)
1.  Replace current files in docs for the generated ones in gen-docs
1.  Generate CHANGELOG.md (github_changelog_generator -u GITHUB_USERNAME)
1.  git commit -m "Release x.x.x"
1.  Create release x.x.x in github
1.  git pull (origin master)
1.  npm publish
