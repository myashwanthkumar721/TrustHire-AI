def generate_cover_letter(candidate, role, company):

    name = candidate.get("name", "Candidate")

    skills = ", ".join(candidate.get("skills", []))

    # ===============================
    # Role Specific Introduction
    # ===============================

    if role == "Data Analyst":

        intro = (
            f"I am excited to apply for the Data Analyst position at {company}. "
            "I enjoy transforming raw data into meaningful business insights."
        )

        body = (
            f"My experience with {skills} has helped me analyze datasets, build dashboards, "
            "and generate reports for data-driven decision making. "
            "I enjoy SQL querying, visualization, and solving analytical problems."
        )

    elif role == "Data Scientist":

        intro = (
            f"I am excited to apply for the Data Scientist position at {company}. "
            "I enjoy solving real-world business problems using data and machine learning."
        )

        body = (
            f"My experience with {skills} has enabled me to clean datasets, build predictive models, "
            "perform exploratory data analysis, and communicate insights effectively."
        )

    elif role == "AI Engineer":

        intro = (
            f"I am excited to apply for the AI Engineer position at {company}. "
            "Artificial Intelligence is one of my strongest interests."
        )

        body = (
            f"My experience with {skills} has helped me build AI-powered applications, "
            "integrate machine learning models, and develop intelligent software solutions."
        )

    elif role == "Machine Learning Engineer":

        intro = (
            f"I am excited to apply for the Machine Learning Engineer position at {company}. "
            "I enjoy developing scalable machine learning systems."
        )

        body = (
            f"My experience with {skills} includes building predictive models, "
            "feature engineering, model evaluation, and deploying machine learning solutions."
        )

    elif role == "Python Developer":

        intro = (
            f"I am excited to apply for the Python Developer position at {company}. "
            "Python has been my primary programming language throughout my projects."
        )

        body = (
            f"My experience with {skills} has enabled me to build backend systems, "
            "automation scripts, REST APIs, and scalable Python applications."
        )

    elif role == "Frontend Developer":

        intro = (
            f"I am excited to apply for the Frontend Developer position at {company}. "
            "I enjoy building beautiful and responsive user interfaces."
        )

        body = (
            f"My experience with {skills} has helped me develop responsive websites, "
            "interactive web applications, and user-friendly interfaces using modern frontend technologies."
        )

    elif role == "Backend Developer":

        intro = (
            f"I am excited to apply for the Backend Developer position at {company}. "
            "I enjoy building secure and scalable backend systems."
        )

        body = (
            f"My experience with {skills} includes developing REST APIs, "
            "database management, authentication systems, and backend architecture."
        )

    elif role == "Full Stack Developer":

        intro = (
            f"I am excited to apply for the Full Stack Developer position at {company}. "
            "I enjoy designing complete web applications from frontend to backend."
        )

        body = (
            f"My experience with {skills} has enabled me to build responsive websites, "
            "REST APIs, database-driven applications, and full-stack software solutions."
        )

    elif role == "Software Engineer":

        intro = (
            f"I am excited to apply for the Software Engineer position at {company}. "
            "I am passionate about designing reliable and scalable software systems."
        )

        body = (
            f"My experience with {skills} has allowed me to develop software solutions, "
            "solve complex programming challenges, and build efficient applications following best engineering practices."
        )

    else:

        intro = (
            f"I am excited to apply for the {role} position at {company}."
        )

        body = (
            f"My experience with {skills} has helped me build strong technical knowledge "
            "and practical software development skills."
        )

    # ===============================
    # Final Cover Letter
    # ===============================

    cover_letter = f"""
Dear Hiring Manager,

{intro}

{body}

Throughout my academic journey and personal projects, I have developed strong problem-solving skills, gained practical experience, and continuously improved my technical knowledge by learning modern technologies and building real-world applications.

I believe my passion for learning, dedication to writing quality software, and willingness to take on new challenges would allow me to contribute effectively to {company}.

I would be grateful for the opportunity to discuss how my skills and enthusiasm align with your team's goals.

Thank you for your time and consideration.

Sincerely,

{name}
"""

    return cover_letter