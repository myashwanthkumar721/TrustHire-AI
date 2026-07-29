import re

# List of skills
SKILLS = [
    "Python", "Java", "C", "C++", "JavaScript",
    "HTML", "CSS", "React", "React JS",
    "Node.js", "Express.js", "SQL", "MySQL",
    "MongoDB", "Power BI", "Machine Learning",
    "Git", "GitHub", "FastAPI", "Docker", "AWS"
]


def extract_resume_info(text):

    data = {}

    # -----------------------
    # Name
    # -----------------------
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    data["name"] = lines[0] if lines else "Not Found"

    # -----------------------
    # Email
    # -----------------------
    email = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    data["email"] = email.group() if email else "Not Found"

    # -----------------------
    # Phone
    # -----------------------
    phone = re.search(r'(\+91[- ]?)?[6-9]\d{9}', text)
    data["phone"] = phone.group() if phone else "Not Found"

    # -----------------------
    # LinkedIn
    # -----------------------
    linkedin = re.search(
        r'(https?://)?(www\.)?linkedin\.com/[^\s|]+',
        text
    )

    if linkedin:

        url = linkedin.group()

        if not url.startswith("http"):
            url = "https://" + url

        data["linkedin"] = url

    else:

        data["linkedin"] = "Not Found"

    # -----------------------
    # GitHub
    # -----------------------
    github = re.search(
        r'(https?://)?(www\.)?github\.com/[^\s|]+',
        text
    )

    if github:

        url = github.group()

        if not url.startswith("http"):
            url = "https://" + url

        data["github"] = url

    else:

        data["github"] = "Not Found"

    # -----------------------
    # Skills
    # -----------------------
    found_skills = []

    for skill in SKILLS:

        pattern = r'\b' + re.escape(skill) + r'\b'

        if re.search(pattern, text, re.IGNORECASE):

            found_skills.append(skill)

    data["skills"] = sorted(list(set(found_skills)))

    # ==================================================
    # NEW FEATURE : PROJECT EXTRACTION
    # ==================================================

    projects = []

    project_keywords = [

        "Expense Tracker",

        "Portfolio Website",

        "NXT Watch",

        "Amazon Sales Analytics",

        "TrustHire AI",

        "AI Resume Analyzer",

        "Chat Application",

        "Weather App",

        "E-Commerce Website",

        "Library Management System"

    ]

    for project in project_keywords:

        if re.search(re.escape(project), text, re.IGNORECASE):

            projects.append(project)

    data["projects"] = projects

    return data