document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const alreadyAccountBtn = document.getElementById("already-account");
    const noValuesMsg = document.getElementById("no-values-msg");

    // Add listener for "Already have an account?" button independently
    if (alreadyAccountBtn) {
        alreadyAccountBtn.addEventListener("click", function () {
            const fname = localStorage.getItem("fname");
            const lname = localStorage.getItem("lname");
            const email = localStorage.getItem("email");
            const sex = localStorage.getItem("sex");
            const reason = localStorage.getItem("reason");

            if (fname && lname && email && sex && reason) {
                window.location.href = "proj_profile_lastname.html";
            } else {
                noValuesMsg.style.display = "block";
            }
        });
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Reset error messages
            document.querySelectorAll(".error").forEach(el => el.textContent = "");

            let valid = true;

            const fname = document.getElementById("first-name").value.trim();
            const lname = document.getElementById("last-name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const reason = document.getElementById("reason").value.trim();
            const sex = document.querySelector('input[name="sex"]:checked');

            if (!fname) {
                document.getElementById("errorfname").textContent = "required";
                valid = false;
            }

            if (!lname) {
                document.getElementById("errorlname").textContent = "required";
                valid = false;
            }

            if (!email) {
                document.getElementById("erroremail").textContent = "required";
                valid = false;
            }

            if (!password) {
                document.getElementById("errorpassword").textContent = "required";
                valid = false;
            }

            if (!reason) {
                document.getElementById("errorreason").textContent = "required";
                valid = false;
            }

            if (!sex) {
                document.getElementById("errorsex").textContent = "required";
                valid = false;
            }

            if (valid) {
                localStorage.setItem("fname", fname);
                localStorage.setItem("lname", lname);
                localStorage.setItem("email", email);
                localStorage.setItem("sex", sex.value);
                localStorage.setItem("reason", reason);

                window.location.href = "proj_profile_lastname.html";
            }
        });
    }

    // Load profile page data
    const pfname = document.getElementById("profilefname");
    if (pfname) {
        document.getElementById("profilefname").textContent = localStorage.getItem("fname");
        document.getElementById("profilelname").textContent = localStorage.getItem("lname");
        document.getElementById("profileemail").textContent = localStorage.getItem("email");
        document.getElementById("profilesex").textContent = localStorage.getItem("sex");
        document.getElementById("profilereason").textContent = localStorage.getItem("reason");

        const goHomeBtn = document.getElementById("go-home");
        if (goHomeBtn) {
            goHomeBtn.addEventListener("click", function () {
                const fname = localStorage.getItem("fname") || "there";
                alert(`Welcome, ${fname}!`);
                window.location.href = "home.html";
            });
        }
    }

    // Populate name on homepage
    const userNameSpan = document.getElementById("user-name");
    const fname = localStorage.getItem("fname");
    if (userNameSpan && fname) {
        userNameSpan.textContent = fname;
    }
});
