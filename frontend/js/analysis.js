const analysis =
JSON.parse(localStorage.getItem("analysis"));

if (!analysis) {

    alert("Analysis not found.");

    window.location.href =
    "/frontend/upload.html";

}
// =============================
// START AI INTERVIEW
// =============================

document.getElementById("startInterview").onclick = () => {

    const candidateData = {

        id:
            analysis.candidate.email ||
            Date.now().toString(),

        name:
            analysis.candidate.name || "",

        email:
            analysis.candidate.email || "",

        phone:
            analysis.candidate.phone || "",

        linkedin:
            analysis.candidate.linkedin || "",

        github:
            analysis.candidate.github || "",

        role:
            analysis.role,

        skills:
            analysis.candidate.skills || [],

        experience:
            analysis.candidate.experience || "Fresher",

        education:
            analysis.candidate.education || "N/A",

        projects:
            analysis.candidate.projects || [],

        certifications:
            analysis.candidate.certifications || [],

        summary:
            analysis.candidate.summary || "",

        resume_score:
            analysis.resume_score || 0,

        ats_score:
            analysis.ats?.ats_score || 0,

        job_match:
            analysis.job_match || 0,

        hiring_readiness:
            analysis.hiring_readiness || "",

        matched_must:
            analysis.matched_must || [],

        missing_must:
            analysis.missing_must || [],

        matched_good:
            analysis.matched_good || [],

        missing_good:
            analysis.missing_good || [],

        matched_bonus:
            analysis.matched_bonus || [],

        missing_bonus:
            analysis.missing_bonus || [],

        recommendation:
            analysis.recommendation || "",

        interview: null,

        interview_score: 0,

        final_score: 0,

        status: "New",

        notes: ""

    };

    let allCandidates =
    JSON.parse(
        localStorage.getItem("allCandidates")
    ) || [];

    const index =
    allCandidates.findIndex(

        c => c.email === candidateData.email

    );

    if(index !== -1){

        allCandidates[index] = {

            ...allCandidates[index],

            ...candidateData

        };

    }

    else{

        allCandidates.push(candidateData);

    }

    localStorage.setItem(

        "allCandidates",

        JSON.stringify(allCandidates)

    );

    localStorage.setItem(

        "candidate",

        JSON.stringify(candidateData)

    );

    localStorage.setItem(

        "selectedCandidate",

        JSON.stringify(candidateData)

    );

    localStorage.setItem(

        "selectedRole",

        candidateData.role

    );

    window.location.href =
    "/frontend/interview.html";

};

const candidate = analysis.candidate;
const role = analysis.role;

document.getElementById("candidateName").textContent =
candidate.name;

document.getElementById("role").textContent =
role;

document.getElementById("score").textContent =
analysis.resume_score + "/100";

document.getElementById("match").textContent =
analysis.job_match + "%";

document.getElementById("readiness").textContent =
analysis.hiring_readiness;

const matchedSkills =
analysis.matched_must.length +
analysis.matched_good.length +
analysis.matched_bonus.length;

const missingSkills =
analysis.missing_must.length +
analysis.missing_good.length +
analysis.missing_bonus.length;

const chartElement = document.getElementById("skillsChart");

if(chartElement){

const ctx = chartElement.getContext("2d");

new Chart(ctx,{

type:"doughnut",

data:{

labels:[
"Matched Skills",
"Missing Skills"
],

datasets:[{

data:[
matchedSkills,
missingSkills
],

backgroundColor:[
"#22c55e",
"#ef4444"
]

}]

},

options:{
responsive:true
}

});

}

const mustPercent =
Math.round(
analysis.matched_must.length /
(
analysis.matched_must.length +
analysis.missing_must.length
) * 100
);

const goodPercent =
Math.round(
analysis.matched_good.length /
(
analysis.matched_good.length +
analysis.missing_good.length
) * 100
);

const bonusPercent =
Math.round(
analysis.matched_bonus.length /
(
analysis.matched_bonus.length +
analysis.missing_bonus.length
) * 100
);

document.getElementById("mustPercent").textContent =
mustPercent + "%";

document.getElementById("goodPercent").textContent =
goodPercent + "%";

document.getElementById("bonusPercent").textContent =
bonusPercent + "%";

document.getElementById("mustBar").style.width =
mustPercent + "%";

document.getElementById("goodBar").style.width =
goodPercent + "%";

document.getElementById("bonusBar").style.width =
bonusPercent + "%";

document.getElementById("recommendation").textContent =
analysis.recommendation;

// =============================
// MUST HAVE SKILLS
// =============================

const mustSkills = document.getElementById("mustSkills");

mustSkills.innerHTML = "";

analysis.matched_must.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "✅ " + skill;
    mustSkills.appendChild(li);

});

analysis.missing_must.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "❌ " + skill;
    mustSkills.appendChild(li);

});


// =============================
// GOOD SKILLS
// =============================

const goodMatched = document.getElementById("goodMatched");
const goodMissing = document.getElementById("goodMissing");

goodMatched.innerHTML = "";
goodMissing.innerHTML = "";

analysis.matched_good.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "✅ " + skill;
    goodMatched.appendChild(li);

});

analysis.missing_good.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "❌ " + skill;
    goodMissing.appendChild(li);

});


// =============================
// BONUS SKILLS
// =============================

const bonusMatched = document.getElementById("bonusMatched");
const bonusMissing = document.getElementById("bonusMissing");

bonusMatched.innerHTML = "";
bonusMissing.innerHTML = "";

analysis.matched_bonus.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "✅ " + skill;
    bonusMatched.appendChild(li);

});

analysis.missing_bonus.forEach(skill => {

    const li = document.createElement("li");
    li.innerHTML = "❌ " + skill;
    bonusMissing.appendChild(li);

});


// =============================
// ROADMAP
// =============================

const roadmap = document.getElementById("roadmap");

roadmap.innerHTML = "";

if (analysis.missing_must.length === 0) {

    const li = document.createElement("li");
    li.innerHTML = "🎉 You already have all the required skills!";
    roadmap.appendChild(li);

} else {

    analysis.missing_must.forEach((skill,index)=>{

        const li=document.createElement("li");

        li.innerHTML =
        "Week " + (index+1) + " : Learn " + skill;

        roadmap.appendChild(li);

    });

}

analysis.missing_good.forEach((skill,index)=>{

    const li=document.createElement("li");

    li.innerHTML =
    "Week " +
    (analysis.missing_must.length+index+1) +
    " : Learn " + skill;

    roadmap.appendChild(li);

});


// =============================
// INTERVIEW QUESTIONS
// =============================

const questions = document.getElementById("questions");

questions.innerHTML = "";

analysis.interview_questions.forEach(question=>{

    const li=document.createElement("li");

    li.textContent = question;

    questions.appendChild(li);

});

// =========================
// ATS ANALYSIS
// =========================

document.getElementById("atsScore").textContent =
analysis.ats.ats_score + "/100";

const found =
document.getElementById("keywordsFound");

analysis.ats.keywords_found.forEach(skill=>{

    const li=document.createElement("li");

    li.innerHTML="✅ "+skill;

    found.appendChild(li);

});

const missing =
document.getElementById("keywordsMissing");

analysis.ats.keywords_missing.forEach(skill=>{

    const li=document.createElement("li");

    li.innerHTML="❌ "+skill;

    missing.appendChild(li);

});

const resumeSuggestions =
document.getElementById("resumeSuggestions");

analysis.resume_suggestions.forEach(item => {

    const li = document.createElement("li");

    li.textContent = item;

    resumeSuggestions.appendChild(li);

});

const projectSuggestions =
document.getElementById("projectSuggestions");

analysis.project_suggestions.forEach(item => {

    const li = document.createElement("li");

    li.textContent = item;

    projectSuggestions.appendChild(li);

});

const learningResources =
document.getElementById("learningResources");

analysis.learning_resources.forEach(item => {

    const li = document.createElement("li");

    li.textContent = item;

    learningResources.appendChild(li);

});

const nextSteps =
document.getElementById("nextSteps");

analysis.next_steps.forEach(item => {

    const li = document.createElement("li");

    li.textContent = item;

    nextSteps.appendChild(li);

}); 

document.getElementById("generateCoverLetter").onclick =
async () => {

    const response =
    await fetch(
        "/cover-letter",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                candidate:analysis.candidate,

                role:analysis.role

            })

        }
    );

    const result =
    await response.json();

    localStorage.setItem(
        "coverLetter",
        result.cover_letter
    );

    window.location.href =
    "/frontend/cover_letter.html";

};
