/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor')
var promisification = require('./promisification')

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // fetch gh profile from a text file.
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      return promisification.getGitHubProfileAsync(user)
    })
    .then((body) => {
      return fs.writeFile(writeFilePath, JSON.stringify(body), ()=>{})
    })
    .catch((err) => {
      console.log(err)
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
