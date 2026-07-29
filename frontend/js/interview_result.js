// ======================================
// TrustHire AI Interview Result
// ======================================

// ======================================
// Load Data
// ======================================

const allCandidates =
    JSON.parse(localStorage.getItem("allCandidates")) || [];

const interview =
    JSON.parse(localStorage.getItem("interviewResult"));

const currentCandidate =
    JSON.parse(localStorage.getItem("candidate"));

const currentEmail =
    currentCandidate?.email;

const candidate =
    allCandidates.find(c => c.email === currentEmail)
    || currentCandidate;

// ======================================
// Validation
// ======================================

if (!candidate || !interview) {

    alert("Interview report not found.");

    window.location.href =
        "/frontend/interview.html";

}


// ======================================
// Candidate Information
// ======================================

document.getElementById("candidateName").textContent =
    candidate.name || "N/A";

document.getElementById("candidateRole").textContent =
    candidate.role || localStorage.getItem("selectedRole") || "N/A";

// ======================================
// Scores
// ======================================

const resumeScore =
    candidate.resume_score || 0;

const atsScore =
    candidate.ats_score || 0;

const interviewScore =
    interview.overall_score || 0;

// Resume

document.getElementById("resumeScore").textContent =
    resumeScore + "%";

// ATS

document.getElementById("atsScore").textContent =
    atsScore + "%";

// Interview (Top Card)

document.getElementById("interviewScore").textContent =
    interviewScore + "%";

// Interview (Bottom Card)

const finalInterviewCard =
    document.getElementById("finalInterviewScore");

if (finalInterviewCard) {

    finalInterviewCard.textContent =
        interviewScore + "%";

}

// ======================================
// Final Score
// ======================================

const finalScore = Math.round(

    resumeScore * 0.30 +

    atsScore * 0.30 +

    interviewScore * 0.40

);

document.getElementById("finalScore").textContent =
    finalScore + "%";

// ======================================
// Overall Rating
// ======================================

let rating = "";

if (finalScore >= 90)

    rating = "★★★★★";

else if (finalScore >= 80)

    rating = "★★★★☆";

else if (finalScore >= 70)

    rating = "★★★☆☆";

else if (finalScore >= 60)

    rating = "★★☆☆☆";

else

    rating = "★☆☆☆☆";

document.getElementById("overallRating").textContent =
    rating;

// ======================================
// Interview Statistics
// ======================================

document.getElementById("timeTaken").textContent =
    (interview.timeTaken || 0) + " min";

document.getElementById("questionsAnswered").textContent =

    `${interview.answered || 0} / ${interview.total_questions || 0}`;

// ======================================
// AI Scores
// ======================================

document.getElementById("technicalScore").textContent =
    (interview.technical || 0) + "%";

document.getElementById("communicationScore").textContent =
    (interview.communication || 0) + "%";

document.getElementById("problemScore").textContent =
    (interview.problem_solving || 0) + "%";

document.getElementById("confidenceScore").textContent =
    (interview.confidence || 0) + "%";

// ======================================
// Strengths
// ======================================

const strengthList =
    document.getElementById("strengthList");

strengthList.innerHTML = "";

(interview.strengths || []).forEach(item => {

    const li =
        document.createElement("li");

    li.textContent = "✅ " + item;

    strengthList.appendChild(li);

});

// ======================================
// Weaknesses
// ======================================

const weaknessList =
    document.getElementById("weaknessList");

weaknessList.innerHTML = "";

(interview.weaknesses || []).forEach(item => {

    const li =
        document.createElement("li");

    li.textContent = "❌ " + item;

    weaknessList.appendChild(li);

});

// ======================================
// Recommendation
// ======================================

document.getElementById("recommendation").textContent =

    interview.feedback ||

    "Candidate completed the interview successfully.";

// ======================================
// Decision
// ======================================

let decision = "";

if (finalScore >= 90)

    decision = "⭐ Hire Immediately";

else if (finalScore >= 80)

    decision = "✅ Shortlist";

else if (finalScore >= 70)

    decision = "🟡 Hold for Next Round";

else if (finalScore >= 60)

    decision = "⚠ Needs Improvement";

else

    decision = "❌ Reject";

document.getElementById("decision").textContent =
    decision;

// ======================================
// Save Final Report
// ======================================

const report = {

    candidate_name:
        candidate.name,

    role:
        candidate.role,

    resume_score:
        resumeScore,

    ats_score:
        atsScore,

    interview_score:
        interviewScore,

    technical:
        interview.technical,

    communication:
        interview.communication,

    problem_solving:
        interview.problem_solving,

    confidence:
        interview.confidence,

    completeness:
        interview.completeness,

    final_score:
        finalScore,

    rating:
        rating,

    recommendation:
        interview.feedback,

    decision:
        decision,

    strengths:
        interview.strengths,

    weaknesses:
        interview.weaknesses,

    time_taken:
        interview.timeTaken,

    answered:
        interview.answered,

    total_questions:
        interview.total_questions

};

localStorage.setItem(
    "interviewReport",
    JSON.stringify(report)
);

// ======================================
// Buttons
// ======================================

document.getElementById("downloadBtn").onclick = () => {

    alert("PDF Report Generator will be implemented in the next phase.");

};

document.getElementById("dashboardBtn").onclick = () => {

    window.location.href =
        "/frontend/recruiter.html";

};