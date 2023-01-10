// Run this example with `node examples/chaining.js`
// It will succeed most of the time, but fail occasionally to demonstrate error handling

var Promise = require('bluebird');
var db = Promise.promisifyAll(require('../lib/db'));

var addNewUserToDatabaseAsync = (user) => {
  // The outermost `return` lets us continue the chain
  // after an invocation of `addNewUserToDatabaseAsync`
  return db.findUserInDatabaseAsync(user)
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('User already exists!'); // Head straight to `catch`. Do not pass Go, do not collect $200
      } else {
        return user; // Return a syncronous value
      }
    })
    .then((newUser) => {
      return db.hashPasswordAsync(newUser); // Return a promise
    })
    .then((securedUser) => {
      return db.createAndSaveUserAsync(securedUser); // Return another promise
    });
};

addNewUserToDatabaseAsync({ name: 'Dan', password: 'chickennuggets' })
  .then((savedUser) => {
    console.log('All done!');
  })
  .catch((err) => {
    // Will catch any promise rejections or thrown errors in the chain!
    console.log('Oops, caught an error: ', err.message);
  });
