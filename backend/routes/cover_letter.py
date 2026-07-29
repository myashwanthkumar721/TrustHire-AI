from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.cover_letter_generator import generate_cover_letter

router = APIRouter()


class CoverLetterRequest(BaseModel):

    candidate: dict

    role: str

    company: str = "Your Company"


@router.post("/cover-letter")
def generate(data: CoverLetterRequest):

    letter = generate_cover_letter(
    data.candidate,
    data.role,
    data.company
)

    return {

        "cover_letter": letter

    }