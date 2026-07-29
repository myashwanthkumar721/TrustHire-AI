const analysis =
JSON.parse(localStorage.getItem("analysis"));

let coverLetter =
localStorage.getItem("coverLetter");

document.getElementById("coverLetter").textContent =
coverLetter;

// --------------------
// Copy
// --------------------

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(
        coverLetter
    );

    alert("Copied!");

};

// --------------------
// Download
// --------------------

document.getElementById("downloadBtn").onclick = () => {

    const blob = new Blob(

        [coverLetter],

        { type: "text/plain" }

    );

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download = "CoverLetter.txt";

    a.click();

};

// --------------------
// Regenerate
// --------------------

document.getElementById("regenerateBtn").onclick =
async () => {

    const company =
    document.getElementById("companyName").value.trim();

    const response =
    await fetch(

        "http://127.0.0.1:8000/cover-letter",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                candidate:analysis.candidate,

                role:analysis.role,

                company:company || "Your Company"

            })

        }

    );

    const result =
    await response.json();

    coverLetter =
    result.cover_letter;

    localStorage.setItem(

        "coverLetter",

        coverLetter

    );

    document.getElementById("coverLetter").textContent =
    coverLetter;

};