const continueBtn = document.getElementById("continueBtn");
const roleSelect = document.getElementById("role");

continueBtn.addEventListener("click", async () => {

    const candidate = JSON.parse(
        localStorage.getItem("candidate")
    );

    if (!candidate) {

        alert("Candidate data not found.");

        window.location.href =
        "/frontend/upload.html";

        return;

    }

    const selectedRole = roleSelect.value;

    localStorage.setItem(
        "selectedRole",
        selectedRole
    );

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/analyze",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    role: selectedRole,

                    resume: candidate

                })

            }
        );

        if (!response.ok) {

            throw new Error("Analysis failed.");

        }

        const analysis =
        await response.json();

        localStorage.setItem(

            "analysis",

            JSON.stringify(analysis)

        );

        window.location.href =
        "/frontend/analysis.html";

    }

    catch(error){

        console.error(error);

        alert("Unable to analyze resume.");

    }

});