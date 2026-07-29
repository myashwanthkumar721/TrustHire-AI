from fastapi import APIRouter, UploadFile, File
import shutil
import os

from backend.services.extractor import extract_resume_info
from backend.services.parser import extract_text_from_pdf
from backend.services.role_matcher import analyze_resume
from backend.services.ats_analyzer import analyze_ats
from backend.services.resume_suggestions import generate_resume_suggestions

router = APIRouter()

UPLOAD_FOLDER = "uploads/resumes"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Upload Resume
# -----------------------------
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    resume_data = extract_resume_info(text)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "resume": resume_data
    }


# -----------------------------
# Analyze Resume
# -----------------------------
@router.post("/analyze")
async def analyze(data: dict):

    role = data.get("role")

    # Accept BOTH frontend and Swagger formats
    candidate = (
        data.get("resume")
        or data.get("candidate")
    )

    if role is None:
        return {
            "error": "Role is missing."
        }

    if candidate is None:
        return {
            "error": "Resume/Candidate data is missing."
        }

    result = analyze_resume(candidate, role)
    ats = analyze_ats(candidate, role)
    result["ats"] = ats

    return result