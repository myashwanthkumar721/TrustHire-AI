# ==========================================
# TrustHire AI
# AI Interview Evaluator
# ==========================================

def evaluate_interview(role, questions, answers):

    total_questions = len(questions)

    answered = 0

    technical = 0
    communication = 0
    problem_solving = 0
    confidence = 0
    completeness = 0

    strengths = []
    weaknesses = []

    # ----------------------------------
    # Evaluate Every Answer
    # ----------------------------------

    for question, answer in zip(questions, answers):

        answer = answer.strip()

        if answer:

            answered += 1

            length = len(answer.split())

            # -----------------------------
            # Technical Accuracy
            # -----------------------------

            if length >= 40:

                technical += 10

            elif length >= 20:

                technical += 8

            elif length >= 10:

                technical += 6

            else:

                technical += 3

            # -----------------------------
            # Communication
            # -----------------------------

            if "." in answer:

                communication += 10

            else:

                communication += 6

            # -----------------------------
            # Problem Solving
            # -----------------------------

            keywords = [

                "because",
                "therefore",
                "solution",
                "approach",
                "algorithm",
                "step",
                "method"

            ]

            if any(

                word in answer.lower()

                for word in keywords

            ):

                problem_solving += 10

            else:

                problem_solving += 6

            # -----------------------------
            # Confidence
            # -----------------------------

            confidence += 8

            # -----------------------------
            # Completeness
            # -----------------------------

            completeness += 10

        else:

            weaknesses.append(

                f"Question left unanswered: {question.get('question','')}"

            )

    # ----------------------------------
    # Normalize Scores
    # ----------------------------------

    if answered > 0:

        technical = round(technical / answered)

        communication = round(communication / answered)

        problem_solving = round(problem_solving / answered)

        confidence = round(confidence / answered)

        completeness = round(completeness / answered)

    else:

        technical = 0
        communication = 0
        problem_solving = 0
        confidence = 0
        completeness = 0

    # ----------------------------------
    # Overall Score
    # ----------------------------------

    overall_score = round(

        technical * 0.40 +

        problem_solving * 0.20 +

        communication * 0.15 +

        confidence * 0.15 +

        completeness * 0.10

    ) * 10

    overall_score = min(overall_score, 100)

    # ----------------------------------
    # Strengths
    # ----------------------------------

    if technical >= 8:

        strengths.append("Strong technical understanding")

    if communication >= 8:

        strengths.append("Good communication skills")

    if problem_solving >= 8:

        strengths.append("Logical problem solving")

    if confidence >= 8:

        strengths.append("Confident responses")

    if completeness >= 8:

        strengths.append("Answered questions completely")

    # ----------------------------------
    # Weaknesses
    # ----------------------------------

    if technical < 7:

        weaknesses.append("Improve technical explanations")

    if communication < 7:

        weaknesses.append("Improve communication")

    if problem_solving < 7:

        weaknesses.append("Explain problem-solving approach better")

    if completeness < 7:

        weaknesses.append("Provide more detailed answers")

    # ----------------------------------
    # AI Feedback
    # ----------------------------------

    if overall_score >= 90:

        feedback = (
            "Outstanding interview performance. "
            "Candidate demonstrated excellent technical knowledge, "
            "clear communication, and strong problem-solving ability."
        )

    elif overall_score >= 80:

        feedback = (
            "Very good interview performance. "
            "Candidate is recommended for the next round."
        )

    elif overall_score >= 70:

        feedback = (
            "Good performance. "
            "Some technical areas require improvement."
        )

    elif overall_score >= 60:

        feedback = (
            "Average performance. "
            "Candidate should strengthen technical concepts."
        )

    else:

        feedback = (
            "Interview performance is below expectations. "
            "Candidate requires significant improvement."
        )

    # ----------------------------------
    # Return Result
    # ----------------------------------

    return {

        "overall_score": overall_score,

        "technical": technical * 10,

        "communication": communication * 10,

        "problem_solving": problem_solving * 10,

        "confidence": confidence * 10,

        "completeness": completeness * 10,

        "answered": answered,

        "total_questions": total_questions,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "feedback": feedback

    }