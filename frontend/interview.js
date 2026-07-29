// ======================================
// TrustHire AI
// AI Interview Simulator
// ======================================

// ======================================
// Global Variables
// ======================================

let questions = [];
let answers = [];

let currentQuestion = 0;
let totalQuestions = 0;

let timerInterval = null;
let timeLeft = 30 * 60; // 30 Minutes

// ======================================
// DOM Elements
// ======================================

const loadingScreen = document.getElementById("loadingScreen");
const interviewContainer = document.getElementById("interviewContainer");

const candidateName = document.getElementById("candidateName");
const candidateRole = document.getElementById("candidateRole");

const timer = document.getElementById("timer");

const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");

const questionType = document.getElementById("questionType");
const difficulty = document.getElementById("difficulty");

const questionText = document.getElementById("questionText");
const answerBox = document.getElementById("answerBox");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// ======================================
// Window Load
// ======================================

window.onload = async function () {

    try {

        await generateInterview();

        startTimer();

    }

    catch (error) {

        console.error(error);

        alert("Unable to generate interview.");

        window.location.href =
            "/frontend/analysis.html";

    }

};

// ======================================
// Generate Interview
// ======================================

async function generateInterview() {

    loadingScreen.classList.remove("hidden");
    interviewContainer.classList.add("hidden");

    const candidate =
        JSON.parse(localStorage.getItem("candidate"));

    const analysis =
        JSON.parse(localStorage.getItem("analysis"));

    const role =
        localStorage.getItem("selectedRole");

    if (!candidate || !analysis || !role) {

        alert("Candidate information missing.");

        window.location.href =
            "/frontend/upload.html";

        return;

    }

    candidateName.textContent =
        candidate.name || "Candidate";

    candidateRole.textContent =
        role;

    const payload = {

        candidate_data: {

            candidate_name:
                candidate.name,

            target_role:
                role,

            skills:
                candidate.skills || [],

            projects:
                candidate.projects || [],

            education:
                candidate.education || "N/A",

            experience:
                candidate.experience || "Fresher",

            ats_score:
                analysis.ats?.ats_score || 0,

            matched_skills: [

                ...(analysis.matched_must || []),

                ...(analysis.matched_good || []),

                ...(analysis.matched_bonus || [])

            ],

            missing_skills: [

                ...(analysis.missing_must || []),

                ...(analysis.missing_good || []),

                ...(analysis.missing_bonus || [])

            ]

        }

    };

    const response =
        await fetch("/interview/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)

        });

    if (!response.ok) {

        throw new Error("Interview generation failed.");

    }

    const result =
        await response.json();

    questions =
        result.questions || [];

    totalQuestions =
        questions.length;

    if (totalQuestions === 0) {

        throw new Error(
            "No interview questions received."
        );

    }

    answers =
        new Array(totalQuestions).fill("");

    loadingScreen.classList.add("hidden");
    interviewContainer.classList.remove("hidden");

    renderQuestion();

}

// ======================================
// Render Question
// ======================================

function renderQuestion() {

    const q =
        questions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${totalQuestions}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / totalQuestions) * 100}%`;

    questionType.textContent =
        q.type || "Technical";

    difficulty.textContent =
        q.difficulty || "Medium";

    questionText.textContent =
        q.question || "";

    answerBox.value =
        answers[currentQuestion];

    updateButtons();

}
// ======================================
// Timer
// ======================================

function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            submitInterview();

            return;

        }

        timeLeft--;

    }, 1000);

}

// ======================================
// Save Current Answer
// ======================================

function saveCurrentAnswer() {

    answers[currentQuestion] =
        answerBox.value.trim();

}

// ======================================
// Previous Button
// ======================================

prevBtn.addEventListener("click", () => {

    saveCurrentAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

});

// ======================================
// Next Button
// ======================================

nextBtn.addEventListener("click", () => {

    saveCurrentAnswer();

    if (currentQuestion < totalQuestions - 1) {

        currentQuestion++;

        renderQuestion();

    }

});

// ======================================
// Update Navigation Buttons
// ======================================

function updateButtons() {

    prevBtn.disabled =
        currentQuestion === 0;

    if (currentQuestion === totalQuestions - 1) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    }

    else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }

}

// ======================================
// Auto Save While Typing
// ======================================

answerBox.addEventListener("input", () => {

    answers[currentQuestion] =
        answerBox.value;

});

// ======================================
// Keyboard Navigation
// ======================================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {

        if (!prevBtn.disabled) {

            prevBtn.click();

        }

    }

    if (event.key === "ArrowRight") {

        if (!nextBtn.classList.contains("hidden")) {

            nextBtn.click();

        }

    }

});

// ======================================
// Prevent Closing Interview
// ======================================

window.onbeforeunload = function () {

    return "Your interview is still in progress.";

};
// ======================================
// Submit Button
// ======================================

submitBtn.addEventListener("click", async () => {

    saveCurrentAnswer();

    await submitInterview();

});

// ======================================
// Submit Interview
// ======================================

async function submitInterview() {

    clearInterval(timerInterval);

    saveCurrentAnswer();

    window.onbeforeunload = null;

    try {

        const candidate =
            JSON.parse(localStorage.getItem("candidate"));

        const role =
            localStorage.getItem("selectedRole");

        const response =
            await fetch("/interview/evaluate", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    role: role,

                    questions: questions,

                    answers: answers

                })

            });

        if (!response.ok) {

            throw new Error(
                "Interview evaluation failed."
            );

        }

        const interviewResult =
            await response.json();

        // -------------------------
        // Time Taken
        // -------------------------

        interviewResult.timeTaken =
            Math.round((30 * 60 - timeLeft) / 60);

        // -------------------------
        // Final Score
        // -------------------------

        const resumeScore =
            candidate.resume_score || 0;

        const atsScore =
            candidate.ats_score || 0;

        const interviewScore =
            interviewResult.overall_score || 0;

        candidate.interview =
            interviewResult;

        candidate.interview_score =
            interviewScore;

        candidate.final_score =
            Math.round(

                resumeScore * 0.30 +

                atsScore * 0.30 +

                interviewScore * 0.40

            );

        candidate.role = role;

        // -------------------------
        // Save Candidate
        // -------------------------

        localStorage.setItem(

            "candidate",

            JSON.stringify(candidate)

        );

        localStorage.setItem(

            "selectedCandidate",

            JSON.stringify(candidate)

        );

        // -------------------------
        // Update Recruiter Database
        // -------------------------

        let recruiterCandidates =
            JSON.parse(
                localStorage.getItem("allCandidates")
            ) || [];

        const candidateIndex =
            recruiterCandidates.findIndex(

                item => item.id === candidate.id

            );

        if (candidateIndex >= 0) {

            recruiterCandidates[candidateIndex] =
                candidate;

        }

        else {

            recruiterCandidates.push(candidate);

        }

        localStorage.setItem(

            "allCandidates",

            JSON.stringify(recruiterCandidates)

        );

        // -------------------------
        // Save Interview Result
        // -------------------------

        localStorage.setItem(

            "interviewResult",

            JSON.stringify(interviewResult)

        );

        // -------------------------
        // Redirect
        // -------------------------

        window.location.href =
            "/frontend/interview_result.html";

    }

    catch (error) {

        console.error(error);

        alert(
            "Interview submission failed."
        );

    }

}
// ======================================
// Helper Functions
// ======================================

function resetInterviewState() {

    questions = [];
    answers = [];

    currentQuestion = 0;
    totalQuestions = 0;

    clearInterval(timerInterval);

    timerInterval = null;
    timeLeft = 30 * 60;

}

function disableInterviewControls() {

    prevBtn.disabled = true;
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    answerBox.disabled = true;

}

// ======================================
// Finish Interview
// ======================================

function finishInterview() {

    disableInterviewControls();

    resetInterviewState();

}

// ======================================
// Cleanup Before Leaving Page
// ======================================

window.addEventListener("pagehide", () => {

    clearInterval(timerInterval);

});

// ======================================
// Emergency Recovery
// ======================================

window.addEventListener("error", (event) => {

    console.error("Interview JS Error:", event.error);

});

// ======================================
// TrustHire AI Interview Script Loaded
// ======================================

console.log("TrustHire AI Interview Loaded Successfully");