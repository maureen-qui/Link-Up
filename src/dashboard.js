document.addEventListener("DOMContentLoaded", async function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBeO8YWDCrp0BDtMwuDZkSeIsHHhvibVao",
        authDomain: "linkearnings-c3889.firebaseapp.com",
        projectId: "linkearnings-c3889",
        storageBucket: "linkearnings-c3889.appspot.com",
        messagingSenderId: "869537146462",
        appId: "1:869537146462:web:fb8242d918fe1764ebf6cf"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userRef = db.collection('users').doc(user.uid);
                const doc = await userRef.get();

                if (doc.exists) {
                    const referralLink = doc.data().referralLink;
                    document.getElementById('referralLink').textContent = referralLink;
                } else {
                    console.log('No such document!');
                    alert('User data not found. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
                alert('Error fetching user data. Please try again later.');
            }
        } else {
            console.log('User is not logged in.');
            window.location.href = 'login.html';
        }
    });
});
