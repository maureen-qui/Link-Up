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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
