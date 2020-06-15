const admin = require("firebase-admin");
const serviceAccount = require("./chicken-tinder-53c1c-firebase-adminsdk-xrnh9-3e28c04d33.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chicken-tinder-53c1c.firebaseio.com",
});

export default GOOGLE_APPLICATION_CREDENTIALS =
  "./chicken-tinder-53c1c-firebase-adminsdk-xrnh9-3e28c04d33.json";
