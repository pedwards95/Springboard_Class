# Broken App Issues

- No node_modules or package.json
- Catch was not defining the error, and so it could not be passed into next()
- Changed inline anon function to arrow function. Just a style difference.
- Added ExpressError class, and 2 endpoints to listen for errors and bad searches.
- Now checks if there are developers passed in the post request
- The app can now parse JSON and form bodys
- changed 'd' to 'name' for code clarity
- revamped the non-functional map function into an async anonomous IIF
- added catch for github choke




- added comments to explain