const admin = require("firebase-admin");
const serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chicken-tinder-53c1c.firebaseio.com",
});

module.exports = {
  GOOGLE_APPLICATION_CREDENTIALS:
    "./config.json"
}
