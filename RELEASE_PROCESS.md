## Release Process

This is not yet a full automated process, so here are a few steps to get the thing properly released on github
and publish under npm registry.

1. npm run dist
2. npm run docs:lint (fix if errors)
3. npm run docs
4. Small tweaks on documentation page (quicklinks, versioning)
5. Update versioning in package.json
6. git commit -m "Release x.x.x"
7. Create release x.x.x in github
8. git pull (origin master)
9. Generate CHANGELOG.md (github_changelog_generator -u GITHUB_USERNAME)
10. git commit -m "Update CHANGELOG"
11. npm publish
