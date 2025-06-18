const admin = require('firebase-admin');
const serviceAccount = require('../smart-feedback-system-81ec2-firebase-adminsdk-fbsvc-f5c46e1cff.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
module.exports = { admin, db };