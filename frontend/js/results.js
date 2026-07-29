// ======================================
// TrustHire AI
// Resume Details
// ======================================

const candidate =
JSON.parse(localStorage.getItem("candidate"));

if (!candidate) {

    alert("No candidate data found.");

    window.location.href =
    "/frontend/upload.html";

}

// ======================================
// Candidate Information
// ======================================

document.getElementById("name").textContent =
candidate.name || "N/A";

document.getElementById("email").textContent =
candidate.email || "N/A";

document.getElementById("phone").textContent =
candidate.phone || "N/A";

document.getElementById("linkedin").textContent =
candidate.linkedin || "N/A";

document.getElementById("github").textContent =
candidate.github || "N/A";

// ======================================
// Skills
// ======================================

const skillsList =
document.getElementById("skills");

skillsList.innerHTML = "";

(candidate.skills || []).forEach(skill => {

    const li =
    document.createElement("li");

    li.textContent = skill;

    skillsList.appendChild(li);

});

// ======================================
// Continue
// ======================================

document.getElementById("analysisBtn").onclick = () => {

    window.location.href =
    "/frontend/role.html";

};