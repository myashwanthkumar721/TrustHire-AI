from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.interview_generator import generate_interview
from backend.services.interview_evaluator import evaluate_interview
router = APIRouter(prefix="/interview", tags=["Interview"])


class InterviewRequest(BaseModel):
    candidate_data: dict


@router.post("/generate")
def generate(request: InterviewRequest):
    return generate_interview(request.candidate_data)

# ==========================================
# Evaluate Interview
# ==========================================

@router.post("/evaluate")
async def evaluate_candidate_interview(data: dict):

    role = data.get("role", "")

    questions = data.get("questions", [])

    answers = data.get("answers", [])

    result = evaluate_interview(

        role,

        questions,

        answers

    )

    return result