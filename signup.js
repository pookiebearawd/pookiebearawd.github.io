// Global flag to track if IGN has been confirmed
let ignConfirmed = false;

// Toggle show/hide for password fields using FontAwesome icons
document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (input.type === "password") {
            input.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            input.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    });
});

// Email validation on blur
const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", function () {
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.classList.remove("hidden");
    } else {
        emailError.classList.add("hidden");
    }
    checkFormValidity();
});

// Password strength evaluation and criteria
const passwordInput = document.getElementById("password");
const passwordStrengthText = document.getElementById("passwordStrength");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthFill = document.getElementById("passwordStrengthFill");
const criteriaLength = document.getElementById("criteria-length");
const criteriaUppercase = document.getElementById("criteria-uppercase");
const criteriaLowercase = document.getElementById("criteria-lowercase");
const criteriaNumber = document.getElementById("criteria-number");
const criteriaSpecial = document.getElementById("criteria-special");
const passwordCriteria = document.getElementById("passwordCriteria");

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;

    // Toggle visibility based on password content
    if (password) {
        passwordStrengthText.classList.remove("hidden");
        passwordStrengthBar.classList.remove("hidden");
        passwordCriteria.classList.remove("hidden");
    } else {
        passwordStrengthText.classList.add("hidden");
        passwordStrengthBar.classList.add("hidden");
        passwordCriteria.classList.add("hidden");
    }

    let strength = 0;

    if (password.length >= 8) {
        criteriaLength.classList.replace("text-red-500", "text-green-500");
        strength++;
    } else {
        criteriaLength.classList.replace("text-green-500", "text-red-500");
    }

    if (/[A-Z]/.test(password)) {
        criteriaUppercase.classList.replace("text-red-500", "text-green-500");
        strength++;
    } else {
        criteriaUppercase.classList.replace("text-green-500", "text-red-500");
    }

    if (/[a-z]/.test(password)) {
        criteriaLowercase.classList.replace("text-red-500", "text-green-500");
        strength++;
    } else {
        criteriaLowercase.classList.replace("text-green-500", "text-red-500");
    }

    if (/[0-9]/.test(password)) {
        criteriaNumber.classList.replace("text-red-500", "text-green-500");
        strength++;
    } else {
        criteriaNumber.classList.replace("text-green-500", "text-red-500");
    }

    if (/[\W_]/.test(password)) {
        criteriaSpecial.classList.replace("text-red-500", "text-green-500");
        strength++;
    } else {
        criteriaSpecial.classList.replace("text-green-500", "text-red-500");
    }

    // Update strength text and bar with smooth animation
    let strengthLabel = "";
    if (strength <= 2) {
        strengthLabel = "Weak";
        passwordStrengthFill.classList.remove("bg-yellow-500", "bg-green-500");
        passwordStrengthFill.classList.add("bg-red-500");
    } else if (strength === 3 || strength === 4) {
        strengthLabel = "Moderate";
        passwordStrengthFill.classList.remove("bg-red-500", "bg-green-500");
        passwordStrengthFill.classList.add("bg-yellow-500");
    } else if (strength === 5) {
        strengthLabel = "Strong";
        passwordStrengthFill.classList.remove("bg-red-500", "bg-yellow-500");
        passwordStrengthFill.classList.add("bg-green-500");
    }
    passwordStrengthText.textContent = password ? `Strength: ${strengthLabel}` : "";

    // Set the fill width as a percentage of strength out of 5
    passwordStrengthFill.style.width = strength * 20 + "%";

    checkFormValidity();
});

// Confirm password validation on blur
const confirmPasswordInput = document.getElementById("confirmPassword");
confirmPasswordInput.addEventListener("blur", function () {
    const confirmError = document.getElementById("confirmPasswordError");
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmError.classList.remove("hidden");
    } else {
        confirmError.classList.add("hidden");
    }
    checkFormValidity();
});

// A hash function to compute a numeric hash from a string (using djb2 algorithm)
function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return Math.abs(hash);
}

// Generate a 12-digit in-game player ID from the IGN
function generatePlayerIDFromIGN(ign) {
    const hash = hashString(ign);
    const number = hash % 1000000000000;
    const numberString = String(number).padStart(12, "0");
    return (
        numberString.slice(0, 4) +
        " " +
        numberString.slice(4, 8) +
        " " +
        numberString.slice(8, 12)
    );
}

// IGN confirmation to generate player ID
const ignInput = document.getElementById("ign");
document.getElementById("confirmIGN").addEventListener("click", function () {
    const ignError = document.getElementById("ignError");
    const ignValue = ignInput.value.trim();
    const playerIDInput = document.getElementById("playerID");

    ignError.classList.add("hidden");
    if (ignValue === "") {
        ignError.textContent = "Please enter your in-game name.";
        ignError.classList.remove("hidden");
        ignConfirmed = false;
        playerIDInput.value = "XXXX XXXX XXXX";
        playerIDInput.classList.add("text-gray-400");
    } else {
        playerIDInput.value = generatePlayerIDFromIGN(ignValue);
        playerIDInput.classList.remove("text-gray-400");
        playerIDInput.classList.add("text-black");
        ignConfirmed = true;
    }
    checkFormValidity();
});

// If user edits the IGN after confirmation, mark as unconfirmed and reset the player ID field
ignInput.addEventListener("input", function () {
    ignConfirmed = false;
    const playerIDInput = document.getElementById("playerID");
    playerIDInput.value = "XXXX XXXX XXXX";
    playerIDInput.classList.remove("text-black");
    playerIDInput.classList.add("text-gray-400");
    checkFormValidity();
});

// Function to check if all conditions are met and enable the Sign Up button
function checkFormValidity() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const passwordVal = passwordInput.value;
    const passwordValid =
        passwordVal.length >= 8 &&
        /[A-Z]/.test(passwordVal) &&
        /[a-z]/.test(passwordVal) &&
        /[0-9]/.test(passwordVal) &&
        /[\W_]/.test(passwordVal);
    const confirmPasswordValid = passwordVal === confirmPasswordInput.value;
    const ignValid = ignInput.value.trim() !== "" && ignConfirmed;

    const allValid = emailValid && passwordValid && confirmPasswordValid && ignValid;
    document.getElementById("signupBtn").disabled = !allValid;
}

// Re-check validity on input events
emailInput.addEventListener("input", checkFormValidity);
passwordInput.addEventListener("input", checkFormValidity);
confirmPasswordInput.addEventListener("input", checkFormValidity);

// Handle form submission: save user credentials and redirect to sign in page
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Create a constant UserProfile containing email, in-game name, and player ID.
    const UserProfile = {
        email: emailInput.value.trim(),
        ingameName: ignInput.value.trim(),
        id: document.getElementById("playerID").value,
    };

    // Store user credentials (for demo purposes, credentials are stored in localStorage)
    const userData = {
        email: emailInput.value.trim(),
        password: passwordInput.value,
    };

    // For demonstration, store both objects in localStorage
    localStorage.setItem("userProfile", JSON.stringify(UserProfile));
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect the user to the Sign In page
    window.location.href = "signin.html";
});
