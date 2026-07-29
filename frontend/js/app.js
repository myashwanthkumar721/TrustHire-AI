// ======================================
// TrustHire AI
// Premium Dashboard
// ======================================

// Dashboard Values

let resume = 70;
let ats = 65;
let interview = 60;

const resumeCounter =
document.getElementById("resumeCounter");

const atsCounter =
document.getElementById("atsCounter");

const interviewCounter =
document.getElementById("interviewCounter");

// ======================================
// Dashboard Animation
// ======================================

function animateDashboard(){

    const dashboard =
    setInterval(()=>{

        if(resume<96){

            resume++;

            resumeCounter.textContent=
            resume+"%";

        }

        if(ats<94){

            ats++;

            atsCounter.textContent=
            ats+"%";

        }

        if(interview<91){

            interview++;

            interviewCounter.textContent=
            interview+"%";

        }

        if(
            resume>=96 &&
            ats>=94 &&
            interview>=91
        ){

            clearInterval(dashboard);

        }

    },40);

}

animateDashboard();

// ======================================
// Scroll Reveal
// ======================================

const reveal=document.querySelectorAll(".reveal");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{threshold:.2});

reveal.forEach(item=>observer.observe(item));

// ======================================
// Typing Effect
// ======================================

const heading=document.querySelector(".hero h1");

const text=heading.textContent;

heading.textContent="";

let index=0;

function type(){

if(index<text.length){

heading.textContent+=text.charAt(index);

index++;

setTimeout(type,70);

}

}

type();

// ======================================
// Live Clock
// ======================================

const clock=document.createElement("div");

clock.className="clock";

document.querySelector(".dashboard")
.appendChild(clock);

setInterval(()=>{

const now=new Date();

clock.innerHTML=
now.toLocaleTimeString();

},1000);

// ======================================
// AI Status
// ======================================

const status=document.createElement("div");

status.className="status";

status.innerHTML="🟢 AI Online";

document.querySelector(".dashboard")
.prepend(status);

// ======================================
// Back To Top
// ======================================

const topBtn=document.createElement("button");

topBtn.id="topBtn";

topBtn.innerHTML="⬆";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>300)

topBtn.classList.add("show");

else

topBtn.classList.remove("show");

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
// ======================================
// Mouse Glow
// ======================================

const glow =
document.querySelector(".mouseGlow");

document.addEventListener(

"mousemove",

e=>{

glow.style.left=
e.clientX+"px";

glow.style.top=
e.clientY+"px";

});
// ==============================
// Loader
// ==============================

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader=document.getElementById("loader");

loader.style.opacity="0";

loader.style.visibility="hidden";

},1200);

});