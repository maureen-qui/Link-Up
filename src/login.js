document.addEventListener("DOMContentLoaded", function() {
    const auth = firebase.auth();

    // Validate and handle the login form submission
    window.validateLoginForm = async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            alert('Login successful.');
            // Redirect to the dashboard page after successful login
            window.location.href = 'dashboard.html';
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert('No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };
});
