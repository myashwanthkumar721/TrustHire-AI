from backend.services.learning_resources import LEARNING_RESOURCES


def generate_resume_suggestions(candidate, role_data):

    skills = [
        skill.lower()
        for skill in candidate.get("skills", [])
    ]

    resume_suggestions = []

    projects = []

    learning_resources = []

    next_steps = []

    role_name = role_data.get("role", "")

    role_resources = LEARNING_RESOURCES.get(
        role_name,
        {}
    )

    # -----------------------------
    # Missing Must-Have Skills
    # -----------------------------

    for skill in role_data["must_have"]:

        if skill.lower() not in skills:

            resume_suggestions.append(
                f"Add projects demonstrating your {skill} skills."
            )

            if skill in role_resources:

                learning_resources.append(
                    f"{skill}: {role_resources[skill]}"
                )

            else:

                learning_resources.append(
                    f"{skill}: Official Documentation"
                )

    # -----------------------------
    # Missing Good Skills
    # -----------------------------

    for skill in role_data["good_to_have"]:

        if skill.lower() not in skills:

            resume_suggestions.append(
                f"Mention experience with {skill}."
            )

            if skill in role_resources:

                learning_resources.append(
                    f"{skill}: {role_resources[skill]}"
                )

    # -----------------------------
    # Missing Bonus Skills
    # -----------------------------

    for skill in role_data["bonus"]:

        if skill.lower() not in skills:

            resume_suggestions.append(
                f"Learning {skill} will strengthen your resume."
            )

            if skill in role_resources:

                learning_resources.append(
                    f"{skill}: {role_resources[skill]}"
                )

    # -----------------------------
    # General Resume Tips
    # -----------------------------

    resume_suggestions.extend([

        "Include measurable achievements using numbers.",

        "Add GitHub repository links.",

        "Add deployed project links.",

        "Keep the resume to one page."

    ])

    # -----------------------------
    # Recommended Projects
    # -----------------------------

    if role_name == "Data Analyst":

        projects.extend([

            "Build a Sales Analytics Dashboard using Power BI.",

            "Create an HR Analytics Dashboard.",

            "Analyze an E-commerce Dataset using Python.",

            "Build a SQL Reporting Project."

        ])

    elif role_name == "Data Scientist":

        projects.extend([

            "Customer Churn Prediction.",

            "House Price Prediction.",

            "Sentiment Analysis using NLP.",

            "Fraud Detection System."

        ])

    elif role_name == "AI Engineer":

        projects.extend([

            "RAG Chatbot using LangChain.",

            "AI Resume Analyzer.",

            "Multi-Agent AI Assistant.",

            "Enterprise AI Knowledge Base."

        ])

    elif role_name == "Machine Learning Engineer":

        projects.extend([

            "Image Classification Model.",

            "Recommendation System.",

            "MLOps Deployment Pipeline.",

            "Predictive Analytics Platform."

        ])

    elif role_name == "Python Developer":

        projects.extend([

            "Library Management System.",

            "Expense Tracker API.",

            "Task Manager using FastAPI.",

            "Weather API Project."

        ])

    elif role_name == "Frontend Developer":

        projects.extend([

            "Netflix Clone.",

            "Portfolio Website.",

            "E-commerce Frontend.",

            "Admin Dashboard."

        ])

    elif role_name == "Backend Developer":

        projects.extend([

            "REST API using FastAPI.",

            "Authentication System using JWT.",

            "Blog Backend API.",

            "Inventory Management Backend."

        ])

    elif role_name == "Full Stack Developer":

        projects.extend([

            "Full Stack E-commerce Website.",

            "Social Media Platform.",

            "Job Portal.",

            "Hospital Management System."

        ])

    else:

        projects.extend([

            "Build an end-to-end portfolio project.",

            "Create a REST API application.",

            "Deploy one project online.",

            "Upload all projects to GitHub."

        ])

    # -----------------------------
    # Next Steps
    # -----------------------------

    next_steps.extend([

        "Complete the missing Must-Have skills.",

        "Build 2-3 real-world projects.",

        "Practice interview questions daily.",

        "Improve ATS score above 85%.",

        "Apply for internships."

    ])

    return {

        "resume_suggestions": resume_suggestions,

        "project_suggestions": projects,

        "learning_resources": learning_resources,

        "next_steps": next_steps

    }