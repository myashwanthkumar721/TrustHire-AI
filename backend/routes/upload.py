from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os

from backend.database.connection import get_db
from backend.database.models import User, Resume

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
async def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Form(...),
    db: Session = Depends(get_db)
):

    # Check user exists
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Save resume file
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract resume text
    text = extract_text_from_pdf(file_path)

    # Extract candidate information
    resume_data = extract_resume_info(text)

    # Save resume in database
    resume = Resume(
        user_id=user.id,
        filename=file.filename,
        file_path=file_path,
        status="uploaded",
        parsed_text=text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": file.filename,
        "user_id": user.id,
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

# -----------------------------
# Resume History
# -----------------------------

@router.get("/resumes/{user_id}")
async def get_resume_history(
    user_id: int,
    db: Session = Depends(get_db)
):

    # Check user exists
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.uploaded_at.desc())
        .all()
    )

    return {
        "user_id": user_id,
        "total": len(resumes),
        "resumes": [
            {
                "id": resume.id,
                "filename": resume.filename,
                "status": resume.status,
                "uploaded_at": resume.uploaded_at.isoformat()
                if resume.uploaded_at
                else None
            }
            for resume in resumes
        ]
    }