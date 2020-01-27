## Deployment

1. Create a PR with your changes. After it is approved, merge to develop.
2. Create a new release branch with a version number.
3. Update config.xml, composer.json, package.json and magento.js with your new version number.
4. Run the build with `npm run production`
5. Update the CHANGELOG.md with the version number and a description of your changes.
6. Finish the release and push to Master. Your new version will automatically be picked up by composer.