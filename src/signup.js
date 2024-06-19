document.addEventListener("DOMContentLoaded", function() {
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Validate and handle the sign-up form submission
    window.validateSignUpForm = async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                referrals: [],
                rewardPoints: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('Sign-up successful. You are now signed in.');
            window.location.href = 'login.html'; // Redirect to login page after signup
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
});
