const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserRecord = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("blah").doc(user.uid).set({
    name: user.displayName,
    email: user.email,
    created_at: Date.now(),
    // any other data you want to initialize
  });
});
