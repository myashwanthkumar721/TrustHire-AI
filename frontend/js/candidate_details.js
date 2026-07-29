// ======================================
// TrustHire AI
// Candidate Details
// ======================================

const candidate =
JSON.parse(localStorage.getItem("selectedCandidate"));

if (!candidate) {

    alert("Candidate not found.");

    window.location.href =
    "/frontend/recruiter.html";

}

// ======================================
// Candidate Information
// ======================================

document.getElementById("candidateName").textContent =
candidate.name || "N/A";

document.getElementById("candidateRole").textContent =
candidate.role || "N/A";

document.getElementById("resumeScore").textContent =
(candidate.resume_score || 0) + "%";

document.getElementById("atsScore").textContent =
(candidate.ats_score || 0) + "%";

document.getElementById("jobMatch").textContent =
(candidate.job_match || 0) + "%";

// ======================================
// Candidate Status
// ======================================

const statusSelect =
document.getElementById("candidateStatus");

statusSelect.value =
candidate.status || "New";

statusSelect.onchange = function () {

    candidate.status =
    statusSelect.value;

    updateCandidate();

};

// ======================================
// Contact Information
// ======================================

document.getElementById("email").textContent =
candidate.email || "N/A";

document.getElementById("phone").textContent =
candidate.phone || "N/A";

document.getElementById("linkedin").textContent =
candidate.linkedin || "N/A";

document.getElementById("github").textContent =
candidate.github || "N/A";

// ======================================
// Professional Information
// ======================================

document.getElementById("experience").textContent =
candidate.experience || "Fresher";

document.getElementById("education").textContent =
candidate.education || "N/A";

document.getElementById("projects").textContent =

Array.isArray(candidate.projects)

? candidate.projects.join(", ")

: (candidate.projects || "N/A");

document.getElementById("certifications").textContent =

Array.isArray(candidate.certifications)

? candidate.certifications.join(", ")

: (candidate.certifications || "None");

// ======================================
// Resume Summary
// ======================================

document.getElementById("resumeSummary").textContent =

candidate.summary ||

"This candidate has successfully completed the AI resume analysis. Review the overall scores, interview results and recruiter notes before making the hiring decision.";

// ======================================
// Helper Function
// ======================================

function fillList(id, data) {

    const list =
    document.getElementById(id);

    list.innerHTML = "";

    if (!data || data.length === 0) {

        list.innerHTML =
        "<li>None</li>";

        return;

    }

    data.forEach(item => {

        const li =
        document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

}

// ======================================
// Skills
// ======================================

fillList("skills", candidate.skills);

fillList("matchedMust",
candidate.matched_must);

fillList("missingMust",
candidate.missing_must);

fillList("matchedGood",
candidate.matched_good);

fillList("missingGood",
candidate.missing_good);

fillList("matchedBonus",
candidate.matched_bonus);

fillList("missingBonus",
candidate.missing_bonus);
// ======================================
// Recommendation
// ======================================

document.getElementById("recommendation").textContent =

candidate.recommendation ||

"Candidate can proceed to the next stage based on recruiter evaluation.";

// ======================================
// Recruiter Notes
// ======================================

const notesBox =
document.getElementById("notes");

notesBox.value =
candidate.notes || "";

document.getElementById("saveNotes").onclick = function () {

    candidate.notes =
    notesBox.value;

    updateCandidate();

    showToast("Notes Saved Successfully");

};

// ======================================
// Update Candidate
// ======================================

function updateCandidate() {

    let allCandidates =

    JSON.parse(

        localStorage.getItem("allCandidates")

    ) || [];

    const index =

        allCandidates.findIndex(c =>

        c.id === candidate.id

);

    if (index !== -1) {

        allCandidates[index] = candidate;

    }

    localStorage.setItem(

        "allCandidates",

        JSON.stringify(allCandidates)

    );

    localStorage.setItem(

        "selectedCandidate",

        JSON.stringify(candidate)

    );

}

// ======================================
// Shortlist Candidate
// ======================================

document.getElementById("shortlistBtn").onclick = function () {

    candidate.status = "Shortlisted";

    statusSelect.value = "Shortlisted";

    updateCandidate();

    showToast("✅ Candidate Shortlisted");

};

// ======================================
// Reject Candidate
// ======================================

document.getElementById("rejectBtn").onclick = function () {

    candidate.status = "Rejected";

    statusSelect.value = "Rejected";

    updateCandidate();

    showToast("❌ Candidate Rejected", "#dc2626");

};
// ======================================
// Download Candidate Report
// ======================================

document.getElementById("downloadReport").onclick = function () {

    if (!window.jspdf) {

        alert("jsPDF library is not loaded.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("TrustHire AI", 20, y);

    y += 10;

    pdf.setFontSize(16);
    pdf.text("Candidate Evaluation Report", 20, y);

    y += 15;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.text(`Name : ${candidate.name || "N/A"}`,20,y);
    y+=8;

    pdf.text(`Role : ${candidate.role || "N/A"}`,20,y);
    y+=8;

    pdf.text(`Resume Score : ${candidate.resume_score || 0}%`,20,y);
    y+=8;

    pdf.text(`ATS Score : ${candidate.ats_score || 0}%`,20,y);
    y+=8;

    pdf.text(`Job Match : ${candidate.job_match || 0}%`,20,y);
    y+=8;

    pdf.text(`Current Status : ${candidate.status || "New"}`,20,y);
    y+=12;

    pdf.setFont("helvetica","bold");
    pdf.text("Skills",20,y);

    y+=8;

    pdf.setFont("helvetica","normal");

    if(candidate.skills && candidate.skills.length){

        candidate.skills.forEach(skill=>{

            pdf.text("• "+skill,25,y);

            y+=7;

        });

    }

    else{

        pdf.text("No skills available",25,y);

        y+=7;

    }

    y+=8;

    pdf.setFont("helvetica","bold");
    pdf.text("AI Recommendation",20,y);

    y+=8;

    pdf.setFont("helvetica","normal");

    const recommendation = pdf.splitTextToSize(

        candidate.recommendation ||

        "No recommendation available.",

        170

    );

    pdf.text(recommendation,20,y);

    y += recommendation.length * 7 + 10;

    pdf.setFont("helvetica","bold");
    pdf.text("Recruiter Notes",20,y);

    y+=8;

    pdf.setFont("helvetica","normal");

    const notes = pdf.splitTextToSize(

        candidate.notes ||

        "No recruiter notes.",

        170

    );

    pdf.text(notes,20,y);

    pdf.save(

        `${(candidate.name || "Candidate").replace(/\s+/g,"_")}_TrustHire_Report.pdf`

    );

};
// ======================================
// Toast Notification
// ======================================

function showToast(message, color = "#16a34a") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}