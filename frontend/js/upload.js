const analyzeBtn = document.getElementById("analyzeBtn");
const resumeInput = document.getElementById("resumeFile");

analyzeBtn.addEventListener("click", async () => {

    // ==============================
    // Check Login
    // ==============================

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {

        alert("Please login before uploading a resume.");

        window.location.href =
            "/frontend/auth.html";

        return;
    }

    // ==============================
    // Check Resume
    // ==============================

    if (resumeInput.files.length === 0) {

        alert("Please select a resume.");

        return;
    }

    // ==============================
    // Prepare Upload
    // ==============================

    const formData = new FormData();

    formData.append(
        "file",
        resumeInput.files[0]
    );

    formData.append(
        "user_id",
        currentUser.id
    );

    try {

        const response = await fetch(
            "/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.detail || "Upload failed."
            );

        }

        // ==============================
        // Current Candidate
        // ==============================

        localStorage.setItem(
            "candidate",
            JSON.stringify(data.resume)
        );

        // Save uploaded resume ID
        localStorage.setItem(
            "currentResumeId",
            data.resume_id
        );

        // ==============================
        // Clear Previous Analysis
        // ==============================

        localStorage.removeItem("analysis");
        localStorage.removeItem("interviewResult");
        localStorage.removeItem("selectedCandidate");

        // ==============================
        // Continue
        // ==============================

        window.location.href =
            "/frontend/results.html";

    }
    catch (error) {

        console.error(error);

        alert(
            error.message ||
            "Upload failed."
        );

    }

});
