from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Import Routers
from backend.routes.upload import router as upload_router
from backend.routes.auth import router as auth_router
from backend.routes.resume import router as resume_router
from backend.routes.cover_letter import router as cover_letter_router
from backend.routes.interview import router as interview_router

# Create FastAPI App
app = FastAPI(
    title="TrustHire AI",
    description="AI Powered Hiring Assistant",
    version="1.0.0"
)

# Register Routers
app.include_router(upload_router)
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(cover_letter_router)
app.include_router(interview_router)

# Serve Frontend
app.mount(
    "/frontend",
    StaticFiles(directory="frontend"),
    name="frontend"
)

# Home Page
@app.get("/", include_in_schema=False)
async def home():
    return FileResponse("frontend/index.html")
