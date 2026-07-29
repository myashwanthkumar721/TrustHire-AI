const analyzeBtn = document.getElementById("analyzeBtn");
const resumeInput = document.getElementById("resumeFile");

analyzeBtn.addEventListener("click", async () => {

    if (resumeInput.files.length === 0) {
        alert("Please select a resume.");
        return;
    }

    const formData = new FormData();
    formData.append("file", resumeInput.files[0]);

    try {

        const response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Upload failed.");
        }

        const data = await response.json();

        // Current Candidate
        localStorage.setItem(
            "candidate",
            JSON.stringify(data.resume)
        );

        // Clear previous analysis
        localStorage.removeItem("analysis");
        localStorage.removeItem("interviewResult");
        localStorage.removeItem("selectedCandidate");

        window.location.href = "/frontend/results.html";

    }
    catch (error) {

        console.error(error);
        alert("Upload failed.");

    }

});