// ======================================
// TrustHire AI
// Resume History
// ======================================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const empty =
    document.getElementById("empty");

const resumeList =
    document.getElementById("resumeList");

const resumeCount =
    document.getElementById("resumeCount");


// ======================================
// Check Login
// ======================================

if (!currentUser) {

    alert("Please login to view resume history.");

    window.location.href =
        "/frontend/auth.html";

}


// ======================================
// Load Resume History
// ======================================

async function loadResumeHistory() {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/resumes/${currentUser.id}`
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.detail || "Unable to load resume history."
            );

        }

        loading.classList.add("hidden");

        resumeCount.textContent =
            data.total;


        // ======================================
        // No Resumes
        // ======================================

        if (data.total === 0) {

            empty.classList.remove("hidden");

            return;

        }


        // ======================================
        // Display Resumes
        // ======================================

        resumeList.innerHTML = "";

        data.resumes.forEach(resume => {

            const card =
                document.createElement("div");

            card.className =
                "resume-card";


            const uploadedDate =
                new Date(
                    resume.uploaded_at
                ).toLocaleString();


            card.innerHTML = `

                <div class="resume-info">

                    <div class="resume-icon">
                        📄
                    </div>

                    <div class="resume-details">

                        <h3>
                            ${resume.filename}
                        </h3>

                        <p>
                            Resume ID: ${resume.id}
                        </p>

                        <p>
                            Uploaded: ${uploadedDate}
                        </p>

                    </div>

                </div>

                <span class="status">
                    ${resume.status}
                </span>

            `;

            resumeList.appendChild(card);

        });

        resumeList.classList.remove("hidden");

    }
    catch (err) {

        console.error(err);

        loading.classList.add("hidden");

        error.textContent =
            err.message;

        error.classList.remove("hidden");

    }

}


// ======================================
// Navigation
// ======================================

document.getElementById(
    "dashboardBtn"
).onclick = () => {

    window.location.href =
        "/frontend/results.html";

};


document.getElementById(
    "uploadBtn"
).onclick = () => {

    window.location.href =
        "/frontend/upload.html";

};


// ======================================
// Start
// ======================================

loadResumeHistory();