from backend.services.role_database import ROLE_DATABASE


def analyze_ats(candidate, role):

    role_data = ROLE_DATABASE.get(role)

    if not role_data:
        return {"error": "Role not found"}

    skills = [
        skill.lower()
        for skill in candidate.get("skills", [])
    ]

    keywords = (
        role_data["must_have"]
        + role_data["good_to_have"]
        + role_data["bonus"]
    )

    found = []
    missing = []

    for keyword in keywords:

        if keyword.lower() in skills:
            found.append(keyword)

        else:
            missing.append(keyword)

    ats_score = int(
        len(found) /
        len(keywords)
        * 100
    )

    return {

        "ats_score": ats_score,

        "keywords_found": found,

        "keywords_missing": missing

    }