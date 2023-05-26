const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserRecord = functions.auth.user().onCreate((user) => {
  return 0;
  // any other data you want to initialize
});
