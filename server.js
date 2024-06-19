const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const serviceAccount = require(path.join(__dirname, 'config/service-account-file.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://linkearnings-c3889.firebaseio.com'
});

const db = admin.firestore();

app.post('/register', async (req, res) => {
  const { username, email } = req.body;

  try {
    const userRef = await db.collection('users').add({
      username: username,
      email: email,
      referrals: [],
      rewardPoints: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const referralLink = `${req.protocol}://${req.get('host')}/referral/${userRef.id}`;
    await userRef.update({ referralLink: referralLink });

    res.status(201).json({ referralLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/referral/:id', async (req, res) => {
  const userRef = db.collection('users').doc(req.params.id);
  const doc = await userRef.get();

  if (!doc.exists) {
    res.status(404).send('Referral not found');
  } else {
    res.send(`Welcome! You were referred by ${doc.data().username}`);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
