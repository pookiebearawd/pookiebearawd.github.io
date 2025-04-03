document.getElementById("signinForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value;
    
    // Retrieve stored credentials.
    // Note: In a real application, credentials should be securely handled and never stored in plain text.
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser && storedUser.email === emailInput && storedUser.password === passwordInput) {
        // Successful sign-in
        localStorage.setItem("isLoggedIn", "true"); // Store login status as true
        window.location.href = "index.html"; // Replace with your target page.
    } else {
        // If credentials don't match, show an error message.
        document.getElementById("errorMessage").classList.remove("hidden");
    }
});

const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const signInButton = document.getElementById("signupBtn");

function toggleButton() {
    if (emailField.value.trim() !== "" && passwordField.value.trim() !== "") {
        signInButton.removeAttribute("disabled");
    } else {
        signInButton.setAttribute("disabled", "true");
    }
}

emailField.addEventListener("input", toggleButton);
passwordField.addEventListener("input", toggleButton);
