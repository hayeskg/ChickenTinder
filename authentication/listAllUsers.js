const admin = require("firebase-admin");

const userArr = [];

function listAllUsers(nextPageToken) {
  return admin.auth().listUsers(1000, nextPageToken)
    .then(function (listUsersResult) {
      return listUsersResult.users.forEach(function (userRecord) {
        let user = {
          uid: userRecord.uid,
          email: userRecord.email
        }
        userArr.push(user);
      });
    })
    .then(() => {
      return userArr;
    })
    .catch(function (error) {
      console.log('Error listing users:', error);
    });
}

module.exports = { listAllUsers };