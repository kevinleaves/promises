/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, result) => {
      if (err) {
        reject(err)
      } else {
        result = result.split('\n')
        resolve(result[0])
      }
    })
  })
  .then((firstLine) => {
    return firstLine
  })
  .catch((err) => {
    console.log(err)
    return err
  })

};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response) => {
      if (err) {
        reject(err)
      } else {
        console.log(response.statusCode, 'response')
        resolve(response.statusCode)
      }
    })
  })
  .then((statusCode) => {
    return statusCode
  })
  .catch((err) => {
    console.log(err)
    return err
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
