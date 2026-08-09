from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.database.models import User, Resume

router = APIRouter(prefix="/resumes", tags=["Resume History"])


@router.get("/{user_id}")
def get_resume_history(
    user_id: int,
    db: Session = Depends(get_db)
):
    # Check user exists
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Get user's resumes
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
                "uploaded_at": resume.uploaded_at
            }
            for resume in resumes
        ]
    }