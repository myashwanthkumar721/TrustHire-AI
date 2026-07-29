from backend.services.role_database import ROLE_DATABASE
from backend.services.resume_suggestions import generate_resume_suggestions


def analyze_resume(candidate, role):

    role_data = ROLE_DATABASE.get(role)

    if not role_data:
        return {
            "error": "Role not found"
        }

    resume_skills = {
        skill.lower()
        for skill in candidate.get("skills", [])
    }

    must_have = role_data["must_have"]
    good_to_have = role_data["good_to_have"]
    bonus = role_data["bonus"]

    matched_must = []
    missing_must = []

    matched_good = []
    missing_good = []

    matched_bonus = []
    missing_bonus = []

    # -----------------------------
    # Must Have Skills
    # -----------------------------

    for skill in must_have:

        if skill.lower() in resume_skills:
            matched_must.append(skill)
        else:
            missing_must.append(skill)

    # -----------------------------
    # Good To Have Skills
    # -----------------------------

    for skill in good_to_have:

        if skill.lower() in resume_skills:
            matched_good.append(skill)
        else:
            missing_good.append(skill)

    # -----------------------------
    # Bonus Skills
    # -----------------------------

    for skill in bonus:

        if skill.lower() in resume_skills:
            matched_bonus.append(skill)
        else:
            missing_bonus.append(skill)

    # -----------------------------
    # Weighted Resume Score
    # -----------------------------

    must_score = (
        len(matched_must) / len(must_have)
    ) * 70

    good_score = (
        len(matched_good) / len(good_to_have)
    ) * 20

    bonus_score = (
        len(matched_bonus) / len(bonus)
    ) * 10

    resume_score = int(
        must_score +
        good_score +
        bonus_score
    )

    job_match = resume_score

    # -----------------------------
    # Hiring Readiness
    # -----------------------------

    if resume_score >= 90:

        readiness = "★★★★★ Excellent"

    elif resume_score >= 80:

        readiness = "★★★★☆ Interview Ready"

    elif resume_score >= 65:

        readiness = "★★★☆☆ Good Progress"

    elif resume_score >= 50:

        readiness = "★★☆☆☆ Needs Improvement"

    else:

        readiness = "★☆☆☆☆ Beginner"

    # -----------------------------
    # AI Recommendation
    # -----------------------------

    if resume_score >= 90:

        recommendation = (
            "Outstanding profile! You possess almost all the essential skills for this role. Focus on advanced projects, certifications, and interview preparation."
        )

    elif resume_score >= 80:

        recommendation = (
            "Strong profile. Complete a few Good-to-Have and Bonus skills to become highly competitive for top companies."
        )

    elif resume_score >= 65:

        recommendation = (
            "Good foundation. Strengthen the remaining Must-Have skills and build 2-3 projects to improve your chances."
        )

    elif resume_score >= 50:

        recommendation = (
            "You have started well, but several important skills are still missing. Focus on the Must-Have skills before applying."
        )

    else:

        recommendation = (
            "Begin by learning the core technologies required for this role. Once the fundamentals are complete, move on to projects and interview preparation."
        )

    # -----------------------------
    # Resume Suggestions
    # -----------------------------

    role_data_for_suggestions = {

        "role": role,

        "must_have": must_have,

        "good_to_have": good_to_have,

        "bonus": bonus

    }

    suggestions = generate_resume_suggestions(
        candidate,
        role_data_for_suggestions
    )

    # -----------------------------
    # Return Analysis
    # -----------------------------

    return {

        "candidate": candidate,

        "role": role,

        "resume_score": resume_score,

        "job_match": job_match,

        "hiring_readiness": readiness,

        # Must Have Skills
        "matched_must": matched_must,
        "missing_must": missing_must,

        # Good Skills
        "matched_good": matched_good,
        "missing_good": missing_good,

        # Bonus Skills
        "matched_bonus": matched_bonus,
        "missing_bonus": missing_bonus,

        # AI Recommendation
        "recommendation": recommendation,

        # Interview Questions
        "interview_questions": role_data["interview_questions"],

        # Resume Suggestions
        "resume_suggestions": suggestions["resume_suggestions"],

        # Project Suggestions
        "project_suggestions": suggestions["project_suggestions"],

        # Learning Resources
        "learning_resources": suggestions["learning_resources"],

        # Next Steps
        "next_steps": suggestions["next_steps"]

    }