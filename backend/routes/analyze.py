from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.role_database import ROLE_DATABASE

router = APIRouter()


class AnalyzeRequest(BaseModel):
    role: str
    candidate: dict


@router.post("/analyze")
def analyze_resume(data: AnalyzeRequest):

    role = data.role
    candidate = data.candidate

    resume_skills = [skill.lower() for skill in candidate.get("skills", [])]

    if role not in ROLE_DATABASE:
        return {"error": "Role not found"}

    role_data = ROLE_DATABASE[role]

    core = role_data["core"]
    good = role_data["good"]
    bonus = role_data["bonus"]

    matched_core = []
    matched_good = []
    matched_bonus = []

    missing_core = []

    score = 0
    total = len(core) * 8 + len(good) * 4 + len(bonus) * 2

    # ---------- CORE ----------
    for skill in core:
        if skill.lower() in resume_skills:
            matched_core.append(skill)
            score += 8
        else:
            missing_core.append(skill)

    # ---------- GOOD ----------
    for skill in good:
        if skill.lower() in resume_skills:
            matched_good.append(skill)
            score += 4

    # ---------- BONUS ----------
    for skill in bonus:
        if skill.lower() in resume_skills:
            matched_bonus.append(skill)
            score += 2

    resume_score = round((score / total) * 100)

    if resume_score >= 90:
        readiness = "⭐⭐⭐⭐⭐ Excellent"

    elif resume_score >= 75:
        readiness = "⭐⭐⭐⭐ Ready"

    elif resume_score >= 60:
        readiness = "⭐⭐⭐ Moderate"

    elif resume_score >= 45:
        readiness = "⭐⭐ Needs Improvement"

    else:
        readiness = "⭐ Beginner"

    if resume_score >= 90:
        recommendation = (
            "Excellent! Your resume strongly matches this role. "
            "Focus on interview preparation and advanced projects."
        )

    elif resume_score >= 75:
        recommendation = (
            "Very Good! Learn the remaining core skills and strengthen your portfolio."
        )

    elif resume_score >= 60:
        recommendation = (
            "You have a good foundation. Complete the remaining core skills and build real-world projects."
        )

    elif resume_score >= 45:
        recommendation = (
            "Focus on mastering the missing core skills before applying. Build at least 2 practical projects."
        )

    else:
        recommendation = (
            "Begin with the core skills listed below. After learning them, start building beginner-friendly projects."
        )

    roadmap = []

    step = 1

    for skill in missing_core:
        roadmap.append(f"Step {step}: Learn {skill}")
        step += 1

    interview_questions = role_data["questions"][:5]

    return {

    "candidate": candidate,

    "role": role,

    "resume_score": resume_score,

    "job_match": resume_score,

    "hiring_readiness": readiness,

    # MUST skills
    "matched_must": matched_core,
    "missing_must": missing_core,

    # GOOD skills
    "matched_good": matched_good,
    "missing_good": [skill for skill in good if skill not in matched_good],

    # BONUS skills
    "matched_bonus": matched_bonus,
    "missing_bonus": [skill for skill in bonus if skill not in matched_bonus],

    "recommendation": recommendation,

    "learning_roadmap": roadmap,

    "interview_questions": interview_questions

}