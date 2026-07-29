// ===========================================
// TrustHire AI
// Recruiter Dashboard
// ===========================================

// ===========================================
// Load Candidates
// ===========================================

let candidates =
JSON.parse(localStorage.getItem("allCandidates")) || [];

// ===========================================
// Demo Data (Only if no candidates exist)
// ===========================================

if(candidates.length === 0){

    candidates=[

        {

            id:"1",

            name:"John Doe",

            role:"Data Analyst",

            resume_score:92,

            ats_score:90,

            job_match:94,

            hiring_readiness:"⭐⭐⭐⭐⭐ Excellent",

            status:"Shortlisted"

        },

        {

            id:"2",

            name:"Sarah Smith",

            role:"AI Engineer",

            resume_score:88,

            ats_score:86,

            job_match:89,

            hiring_readiness:"⭐⭐⭐⭐ Ready",

            status:"New"

        },

        {

            id:"3",

            name:"David Wilson",

            role:"Python Developer",

            resume_score:81,

            ats_score:84,

            job_match:83,

            hiring_readiness:"⭐⭐⭐ Moderate",

            status:"New"

        }

    ];

}

// ===========================================
// DOM Elements
// ===========================================

const candidateTable =
document.getElementById("candidateTable");

const searchCandidate =
document.getElementById("searchCandidate");

const roleFilter =
document.getElementById("roleFilter");

const sortBy =
document.getElementById("sortBy");

// ===========================================
// Load Roles
// ===========================================

function loadRoles(){

    roleFilter.innerHTML =

    `<option value="All">
        All Roles
    </option>`;

    const roles =

    [...new Set(candidates.map(c=>c.role))];

    roles.forEach(role=>{

        const option =
        document.createElement("option");

        option.value = role;

        option.textContent = role;

        roleFilter.appendChild(option);

    });

}

// ===========================================
// Render Candidate Table
// ===========================================

function renderCandidates(data){

    candidateTable.innerHTML="";

    if(data.length===0){

        candidateTable.innerHTML =

        `<tr>

            <td colspan="8" class="empty-state">

                <h3>📄 No Candidates Found</h3>

                <p>
                Upload and analyze resumes to see candidates here.
                </p>

            </td>

        </tr>`;

        return;

    }

    data.forEach((candidate,index)=>{

        const row =
        document.createElement("tr");

        row.innerHTML =

        `

        <td>${index+1}</td>

        <td>${candidate.name}</td>

        <td>${candidate.role}</td>

        <td>${candidate.resume_score}%</td>

        <td>${candidate.ats_score}%</td>

        <td>${candidate.job_match}%</td>

        <td>${getStatusBadge(candidate.hiring_readiness)}</td>

        <td>

            <button
            onclick="viewCandidate('${candidate.id}')">

            View

            </button>

            <button
            class="deleteBtn"
            onclick="deleteCandidate('${candidate.id}')">

            Delete

            </button>

        </td>

        `;

        candidateTable.appendChild(row);

    });

}

// ===========================================
// View Candidate
// ===========================================

function viewCandidate(id){

    const selected =
    candidates.find(c => c.id == id);

    if(!selected){

        alert("Candidate not found");

        return;

    }

    localStorage.setItem(
        "selectedCandidate",
        JSON.stringify(selected)
    );

    window.location.href =
    "/frontend/candidate_details.html";

}

// ===========================================
// Search / Filter / Sorting
// ===========================================

searchCandidate.addEventListener(

    "input",

    filterCandidates

);

roleFilter.addEventListener(

    "change",

    filterCandidates

);

sortBy.addEventListener(

    "change",

    filterCandidates

);

// ===========================================
// Filter Candidates
// ===========================================

function filterCandidates(){

    let filtered = [...candidates];

    const keyword =

    searchCandidate.value.toLowerCase();

    filtered =

    filtered.filter(candidate=>

        candidate.name
        .toLowerCase()
        .includes(keyword)

    );

    if(roleFilter.value!=="All"){

        filtered =

        filtered.filter(candidate=>

            candidate.role===roleFilter.value

        );

    }

    if(sortBy.value==="resume"){

        filtered.sort(

            (a,b)=>

            b.resume_score-a.resume_score

        );

    }

    else if(sortBy.value==="ats"){

        filtered.sort(

            (a,b)=>

            b.ats_score-a.ats_score

        );

    }

    else if(sortBy.value==="match"){

        filtered.sort(

            (a,b)=>

            b.job_match-a.job_match

        );

    }

    renderCandidates(filtered);

}

// ===========================================
// Candidate Comparison
// ===========================================

const compareOne =
document.getElementById("compareOne");

const compareTwo =
document.getElementById("compareTwo");

function loadCompareDropdowns(){

    compareOne.innerHTML =
    '<option value="">Select Candidate</option>';

    compareTwo.innerHTML =
    '<option value="">Select Candidate</option>';

    candidates.forEach(candidate=>{

        compareOne.innerHTML +=

        `<option value="${candidate.id}">
        ${candidate.name} (${candidate.role})
        </option>`;

        compareTwo.innerHTML +=

        `<option value="${candidate.id}">
        ${candidate.name} (${candidate.role})
        </option>`;

    });

}

document.getElementById("compareBtn").onclick=function(){

    const c1 =
    candidates.find(c=>c.id===compareOne.value);

    const c2 =
    candidates.find(c=>c.id===compareTwo.value);

    if(!c1 || !c2){

        alert("Please select two candidates.");

        return;

    }

    if(c1.id===c2.id){

        alert("Please select two different candidates.");

        return;

    }

    let score1=0;
    let score2=0;

    const resumeWinner=

    c1.resume_score>c2.resume_score

    ? (score1++,c1.name)

    : c1.resume_score<c2.resume_score

    ? (score2++,c2.name)

    : "Tie";

    const atsWinner=

    c1.ats_score>c2.ats_score

    ? (score1++,c1.name)

    : c1.ats_score<c2.ats_score

    ? (score2++,c2.name)

    : "Tie";

    const matchWinner=

    c1.job_match>c2.job_match

    ? (score1++,c1.name)

    : c1.job_match<c2.job_match

    ? (score2++,c2.name)

    : "Tie";

    const overallWinner=

    score1>score2

    ? c1.name

    : score2>score1

    ? c2.name

    : "Tie";

    document.getElementById("comparisonResult").innerHTML=

    `

    <h3 style="margin-bottom:20px;">

    🏆 Candidate Comparison

    </h3>

    <table class="compareTable">

    <tr>

    <th>Criteria</th>

    <th>${c1.name}</th>

    <th>${c2.name}</th>

    <th>Winner</th>

    </tr>

    <tr>

    <td>Role</td>

    <td>${c1.role}</td>

    <td>${c2.role}</td>

    <td>-</td>

    </tr>

    <tr>

    <td>Resume Score</td>

    <td>${c1.resume_score}%</td>

    <td>${c2.resume_score}%</td>

    <td>${resumeWinner}</td>

    </tr>

    <tr>

    <td>ATS Score</td>

    <td>${c1.ats_score}%</td>

    <td>${c2.ats_score}%</td>

    <td>${atsWinner}</td>

    </tr>

    <tr>

    <td>Job Match</td>

    <td>${c1.job_match}%</td>

    <td>${c2.job_match}%</td>

    <td>${matchWinner}</td>

    </tr>

    <tr>

    <td>Status</td>

    <td>${c1.status || "New"}</td>

    <td>${c2.status || "New"}</td>

    <td>-</td>

    </tr>

    </table>

    <div class="overallWinner">

    🏆 Overall Better Candidate :

    <b>${overallWinner}</b>

    </div>

    `;

};
// ===========================================
// Delete Candidate
// ===========================================

function deleteCandidate(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this candidate?"
    );

    if(!confirmDelete){
        return;
    }

    candidates = candidates.filter(candidate =>
        candidate.id !== id
    );

    localStorage.setItem(
        "allCandidates",
        JSON.stringify(candidates)
    );

    roleFilter.innerHTML = "";

    loadRoles();

    filterCandidates();

    loadStatistics();

    loadResumeChart();

    loadRoleChart();

    loadCompareDropdowns();

    showToast("🗑 Candidate Deleted", "#dc2626");

}

// ===========================================
// Dashboard Statistics
// ===========================================

function loadStatistics(){

    const total =
    candidates.length;

    const shortlisted =
    candidates.filter(candidate=>

        candidate.status==="Shortlisted"

    ).length;

    const rejected =
    candidates.filter(candidate=>

        candidate.status==="Rejected"

    ).length;

    let averageATS = 0;

    if(total>0){

        averageATS = Math.round(

            candidates.reduce(

                (sum,candidate)=>

                sum+(candidate.ats_score||0),

                0

            )/total

        );

    }

    document.getElementById(
        "totalCandidates"
    ).textContent = total;

    document.getElementById(
        "shortlistedCount"
    ).textContent = shortlisted;

    document.getElementById(
        "rejectedCount"
    ).textContent = rejected;

    document.getElementById(
        "averageATS"
    ).textContent = averageATS + "%";

}

// ===========================================
// Resume Score Chart
// ===========================================

let resumeChart;

function loadResumeChart(){

    const names =
    candidates.map(c=>c.name);

    const scores =
    candidates.map(c=>c.resume_score);

    if(resumeChart){

        resumeChart.destroy();

    }

    resumeChart = new Chart(

        document.getElementById(
            "resumeChart"
        ),

        {

            type:"bar",

            data:{

                labels:names,

                datasets:[{

                    label:"Resume Score",

                    data:scores,

                    backgroundColor:"#2563eb"

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    y:{

                        beginAtZero:true,

                        max:100

                    }

                }

            }

        }

    );

}

// ===========================================
// Role Distribution Chart
// ===========================================

let roleChart;

function loadRoleChart(){

    const roleCounts = {};

    candidates.forEach(candidate=>{

        roleCounts[candidate.role] =

        (roleCounts[candidate.role] || 0)+1;

    });

    if(roleChart){

        roleChart.destroy();

    }

    roleChart = new Chart(

        document.getElementById(
            "roleChart"
        ),

        {

            type:"pie",

            data:{

                labels:Object.keys(roleCounts),

                datasets:[{

                    data:Object.values(roleCounts)

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"top"

                    }

                }

            }

        }

    );

}

// ===========================================
// Status Badge
// ===========================================

function getStatusBadge(status){

    if(!status){

        return
        "<span class='status-badge new'>New</span>";

    }

    if(status.includes("Excellent")){

        return
        "<span class='status-badge excellent'>Excellent</span>";

    }

    if(status.includes("Ready")){

        return
        "<span class='status-badge ready'>Ready</span>";

    }

    if(status.includes("Moderate")){

        return
        "<span class='status-badge moderate'>Moderate</span>";

    }

    if(status.includes("Needs")){

        return
        "<span class='status-badge warning'>Needs Improvement</span>";

    }

    return
    "<span class='status-badge beginner'>Beginner</span>";

}

// ===========================================
// Toast Notification
// ===========================================

function showToast(

    message,

    color="#16a34a"

){

    const toast =

    document.getElementById("toast");

    if(!toast){

        return;

    }

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// ===========================================
// Dashboard Initialization
// ===========================================

loadRoles();

renderCandidates(candidates);

loadStatistics();

loadResumeChart();

loadRoleChart();

loadCompareDropdowns();