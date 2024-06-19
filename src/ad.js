// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeO8YWDCrp0BDtMwuDZkSeIsHHhvibVao",
    authDomain: "linkearnings-c3889.firebaseapp.com",
    projectId: "linkearnings-c3889",
    storageBucket: "linkearnings-c3889.appspot.com",
    messagingSenderId: "869537146462",
    appId: "1:869537146462:web:fb8242d918fe1764ebf6cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get ad ID from URL
const params = new URLSearchParams(window.location.search);
const adId = params.get('id');

// Get HTML elements
const adTitle = document.getElementById('ad-title');
const adLink = document.getElementById('ad-link');

// Fetch and display ad
db.collection('ads').doc(adId).get().then(doc => {
    if (doc.exists) {
        adTitle.textContent = doc.data().title;
        adLink.innerHTML = `<a href="${doc.data().link}" target="_blank">${doc.data().link}</a>`;
    } else {
        adTitle.textContent = 'Ad not found';
        adLink.textContent = '';
    }
}).catch(error => {
    adTitle.textContent = 'Error loading ad';
    adLink.textContent = '';
    console.error("Error fetching ad: ", error);
});
