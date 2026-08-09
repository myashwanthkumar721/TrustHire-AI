const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const switchBtn = document.getElementById("switchBtn");
const switchText = document.getElementById("switchText");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");

const message = document.getElementById("message");

let loginMode = true;

function showMessage(text) {
    message.textContent = text;
}

switchBtn.addEventListener("click", () => {

    loginMode = !loginMode;

    message.textContent = "";

    if (loginMode) {

        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");

        authTitle.textContent = "Welcome Back";
        authSubtitle.textContent =
            "Login to continue to your AI hiring dashboard.";

        switchText.textContent =
            "Don't have an account?";

        switchBtn.textContent = "Register";

    } else {

        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");

        authTitle.textContent = "Create Account";
        authSubtitle.textContent =
            "Create your TrustHire AI candidate account.";

        switchText.textContent =
            "Already have an account?";

        switchBtn.textContent = "Login";
    }

});


// ==============================
// LOGIN
// ==============================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Login failed."
            );
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user)
        );

        showMessage("Login successful.");

        setTimeout(() => {
            window.location.href =
                "/frontend/upload.html";
        }, 500);

    } catch (error) {

        console.error(error);

        showMessage(error.message);

    }

});


// ==============================
// REGISTER
// ==============================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Registration failed."
            );
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user)
        );

        showMessage("Registration successful.");

        setTimeout(() => {
            window.location.href =
                "/frontend/upload.html";
        }, 500);

    } catch (error) {

        console.error(error);

        showMessage(error.message);

    }

});
