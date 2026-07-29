// ======================================
// TrustHire AI
// AI Hiring Report
// ======================================

// ================================
// Load Candidate Data
// ================================

const candidate =
JSON.parse(localStorage.getItem("selectedCandidate")) || {};

const interview =
JSON.parse(localStorage.getItem("interviewResult")) || {};

const recruiterNotes =
localStorage.getItem("recruiterNotes") || "";

// ================================
// Candidate Information
// ================================

document.getElementById("candidateName").textContent =
candidate.name || "Unknown Candidate";

document.getElementById("candidateRole").textContent =
candidate.role || "Not Available";

document.getElementById("candidateEmail").textContent =
candidate.email || "-";

document.getElementById("candidatePhone").textContent =
candidate.phone || "-";

// ================================
// Scores
// ================================

const resumeScore =
Number(candidate.resume_score || 0);

const atsScore =
Number(candidate.ats_score || 0);

const interviewScore =
Number(interview.score || 0);

// ================================
// Overall Score
// ================================

const overallScore = Math.round(

(resumeScore + atsScore + interviewScore) / 3

);

document.getElementById("resumeScore").textContent =
resumeScore + "%";

document.getElementById("atsScore").textContent =
atsScore + "%";

document.getElementById("interviewScore").textContent =
interviewScore + "%";

document.getElementById("overallScore").textContent =
overallScore + "%";

// ================================
// Recruiter Notes
// ================================

document.getElementById("recruiterNotes").value =
recruiterNotes;
// ======================================
// AI Hiring Decision
// ======================================

let decision = "";
let recommendation = "";

if (overallScore >= 85) {

    decision = "HIRE";

    recommendation =
    "The candidate demonstrates excellent technical ability, ATS compatibility, and interview performance. Recommended for immediate hiring.";

}
else if (overallScore >= 70) {

    decision = "HOLD";

    recommendation =
    "The candidate has good potential but requires additional evaluation or another interview before making a final decision.";

}
else {

    decision = "REJECT";

    recommendation =
    "The candidate currently does not meet the required hiring criteria. Skill improvement is recommended before reapplying.";

}

document.getElementById("decisionBadge").textContent =
decision;

document.getElementById("decisionText").textContent =
recommendation;

document.getElementById("finalVerdict").textContent =
decision;

document.getElementById("verdictMessage").textContent =
recommendation;

document.getElementById("recommendation").textContent =
recommendation;

// ======================================
// Executive Summary
// ======================================

document.getElementById("readiness").textContent =
candidate.hiring_readiness || decision;

document.getElementById("rating").textContent =
interview.rating || "★★★★☆";

document.getElementById("status").textContent =
candidate.status || "Pending";

document.getElementById("generatedDate").textContent =
new Date().toLocaleDateString();

// ======================================
// Strengths
// ======================================

const strengths =
candidate.strengths || [];

const strengthList =
document.getElementById("strengths");

strengths.forEach(skill => {

    const li = document.createElement("li");

    li.textContent = skill;

    strengthList.appendChild(li);

});

// ======================================
// Weaknesses
// ======================================

const weaknesses =
candidate.weaknesses || [];

const weaknessList =
document.getElementById("weaknesses");

weaknesses.forEach(skill => {

    const li = document.createElement("li");

    li.textContent = skill;

    weaknessList.appendChild(li);

});

// ======================================
// Skills
// ======================================

const skills =
candidate.skills || [];

const skillContainer =
document.getElementById("skillsContainer");

skills.forEach(skill => {

    const span =
    document.createElement("span");

    span.textContent = skill;

    skillContainer.appendChild(span);

});
// ======================================
// Save Recruiter Notes
// ======================================

const notesBox =
document.getElementById("recruiterNotes");

const saveBtn =
document.getElementById("saveNotes");

if(saveBtn){

    saveBtn.addEventListener("click",()=>{

        localStorage.setItem(

            "recruiterNotes",

            notesBox.value

        );

        alert("Recruiter notes saved successfully.");

    });

}

// ======================================
// Decision Badge Color
// ======================================

const badge =
document.getElementById("decisionBadge");

const verdict =
document.getElementById("finalVerdict");

if(decision==="HIRE"){

    badge.style.background="#16a34a";

    verdict.style.background="#16a34a";

}
else if(decision==="HOLD"){

    badge.style.background="#f59e0b";

    verdict.style.background="#f59e0b";

}
else{

    badge.style.background="#ef4444";

    verdict.style.background="#ef4444";

}

// ======================================
// Download Report
// ======================================

const downloadBtn =
document.getElementById("downloadReport");

if(downloadBtn){

    downloadBtn.addEventListener("click",()=>{

        window.print();

    });

}

// ======================================
// Back To Dashboard
// ======================================

const dashboardBtn =
document.getElementById("dashboardBtn");

if(dashboardBtn){

    dashboardBtn.addEventListener("click",()=>{

        window.location.href=
        "/frontend/recruiter.html";

    });

}

// ======================================
// Animation
// ======================================

document.querySelectorAll(".score-card")
.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(20px)";

    setTimeout(()=>{

        card.style.transition=".5s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },index*150);

});

// ======================================
// Report Generated Time
// ======================================

const generatedTime =
document.getElementById("generatedTime");

if(generatedTime){

    generatedTime.textContent =
    new Date().toLocaleString();

}

// ======================================
// Phase 9 Completed
// ======================================

console.log("TrustHire AI Hiring Report Loaded Successfully");