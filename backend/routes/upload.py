from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import tempfile

from backend.database.connection import get_db
from backend.database.models import User, Resume

from backend.services.extractor import extract_resume_info
from backend.services.parser import extract_text_from_pdf
from backend.services.role_matcher import analyze_resume
from backend.services.ats_analyzer import analyze_ats

router = APIRouter()


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Form(...),
    db: Session = Depends(get_db)
):
    # -----------------------------
    # Validate user
    # -----------------------------
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # -----------------------------
    # Validate file
    # -----------------------------
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was provided."
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # -----------------------------
    # Read uploaded PDF into memory
    # -----------------------------
    try:
        file_bytes = await file.read()

        if not file_bytes:
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is empty."
            )

        # Existing parser expects a path, so temporarily write
        # only for local compatibility if required.
        #
        # On Vercel, /tmp is the writable temporary filesystem.
        with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
        ) as temp_file:
          temp_file.write(file_bytes)
          temp_path = temp_file.name
        # -----------------------------
        # Extract PDF text
        # -----------------------------
        text = extract_text_from_pdf(temp_path)

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to process the uploaded PDF: {str(exc)}"
        )

    finally:
        # Remove temporary file if it was created.
        try:
            if "temp_path" in locals() and os.path.exists(temp_path):
                os.remove(temp_path)
        except Exception:
            pass

    # -----------------------------
    # Extract resume information
    # -----------------------------
    try:
        resume_data = extract_resume_info(text)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to extract resume information: {str(exc)}"
        )

    # -----------------------------
    # Save resume metadata + text
    # -----------------------------
    try:
        logical_file_path = os.path.join(
            "uploads",
            "resumes",
            os.path.basename(file.filename)
        )

        resume = Resume(
            user_id=user.id,
            filename=os.path.basename(file.filename),
            file_path=logical_file_path,
            status="uploaded",
            parsed_text=text
        )

        db.add(resume)
        db.commit()
        db.refresh(resume)

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Unable to save resume information: {str(exc)}"
        )

    # -----------------------------
    # Return response
    # -----------------------------
    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": os.path.basename(file.filename),
        "user_id": user.id,
        "resume": resume_data
    }


@router.post("/analyze")
async def analyze(data: dict):
    role = data.get("role")
    candidate = data.get("resume") or data.get("candidate")

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


@router.get("/resumes/{user_id}")
async def get_resume_history(
    user_id: int,
    db: Session = Depends(get_db)
):
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
                "uploaded_at": (
                    resume.uploaded_at.isoformat()
                    if resume.uploaded_at
                    else None
                )
            }
            for resume in resumes
        ]
    }