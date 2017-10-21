## Release Process

This is not yet a full automated process, so here are a few steps to get the thing properly released on github
and publish under npm registry.

1. npm run dist
2. npm run docs:lint (fix if errors)
3. npm run docs
4. Small tweaks on documentation page (quicklinks)
5. Replace current docs folder with gen-docs
6. Update versioning in package.json
7. git commit -m "Release x.x.x"
8. Create release x.x.x in github
9. git pull (origin master)
10. Generate CHANGELOG.md (github_changelog_generator -u GITHUB_USERNAME)
11. git commit -m "Update CHANGELOG"
12. npm publish
