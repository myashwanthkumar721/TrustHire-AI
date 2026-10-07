TrustHire AI
AI-Powered Resume Analysis and Hiring Assistant
TrustHire AI is an AI-powered recruitment assistant that helps candidates analyze resumes, evaluate job fit, improve ATS compatibility, generate cover letters, and practice interviews.
🚀 Live Application
Production: https://trust-hire-ai-six.vercel.app
GitHub: https://github.com/myashwanthkumar721/TrustHire-AI
✨ Features
- User registration and login
- Resume PDF upload and text extraction
- Resume information extraction
- AI-powered resume and job-role matching
- ATS score and keyword analysis
- Missing skills and keyword identification
- Hiring-readiness assessment
- Resume improvement suggestions
- Project improvement suggestions
- Learning-resource recommendations
- AI-generated cover letters
- AI-generated interview questions
- Interview answer evaluation
- Resume upload/history management
- PostgreSQL-backed persistent data storage
🧠 AI Capabilities
TrustHire AI uses Google AI models through the Gemini API to provide:
- Resume analysis
- Job-role matching
- ATS analysis
- Cover-letter generation
- Interview-question generation
- Interview-answer evaluation
🛠️ Tech Stack
Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- PyMuPDF
- bcrypt
Frontend
- HTML
- CSS
- JavaScript
- Chart.js
AI
- Google Gemini API / supported Google AI model endpoint
Database
- Neon PostgreSQL
Deployment
- Vercel
Development Tools
- Git
- GitHub
- VS Code
- Python virtual environment
🏗️ Architecture
User
  │
  ▼
TrustHire AI Frontend
  │
  ▼
Vercel
  │
  ▼
FastAPI Backend
  ├── Authentication
  ├── Resume Upload & Parsing
  ├── Resume Analysis
  ├── ATS Analysis
  ├── Cover Letter Generation
  └── Interview System
        │
        ├── Google AI API
        │
        └── Neon PostgreSQL
📂 Main Project Structure
TrustHire-AI/
├── api.py
├── backend/
│   ├── app.py
│   ├── database/
│   ├── routes/
│   └── services/
├── frontend/
│   ├── css/
│   ├── js/
│   └── *.html
├── uploads/
├── requirements.txt
├── pyproject.toml
├── .gitignore
└── README.md
🔌 Main API Endpoints
Method	Endpoint	Purpose
POST	/auth/register	Register a user
POST	/auth/login	Authenticate a user
POST	/upload	Upload and parse a PDF resume
POST	/analyze	Analyze resume and job-role match
GET	/resumes/{user_id}	Retrieve resume history
POST	/cover-letter	Generate an AI cover letter
POST	/interview/generate	Generate interview questions
POST	/interview/evaluate	Evaluate interview answers
GET	/openapi.json	FastAPI OpenAPI specification


⚙️ Local Setup
1. Clone the repository
git clone https://github.com/myashwanthkumar721/TrustHire-AI.git
cd TrustHire-AI
2. Create a virtual environment
Windows PowerShell:
python -m venv venv
.env\Scripts\Activate.ps1
3. Install dependencies
pip install -r requirements.txt
4. Configure environment variables
Create a .env file:
GOOGLE_API_KEY=your_google_ai_api_key
DATABASE_URL=your_neon_postgresql_connection_string
Never commit .env or expose API keys/passwords publicly.
5. Run locally
Use the project's FastAPI application with Uvicorn according to the configured entry point.
Example:
uvicorn backend.app:app --reload
Then open the local application in the browser.
☁️ Production Deployment
TrustHire AI is deployed using Vercel with Neon PostgreSQL.
Production configuration
- Platform: Vercel
- Database: Neon PostgreSQL
- AI provider: Google AI API
- Backend framework: FastAPI
- Production branch: main
Vercel configuration
The project uses:
[project]
name = "trust-hire-ai"
version = "1.0.0"
requires-python = ">=3.12"

[tool.vercel]
entrypoint = "api:app"
The Vercel entry point is:
from backend.app import app
📤 Resume Upload on Vercel
Vercel serverless functions do not provide persistent writable application storage.
TrustHire AI therefore:
1. Reads the uploaded PDF into memory.
2. Temporarily writes it to /tmp for PDF parsing.
3. Extracts the resume text.
4. Removes the temporary file.
5. Stores the parsed resume information/text in Neon PostgreSQL.
This keeps resume processing compatible with Vercel's serverless environment.
🔐 Environment Variables
The application requires:
GOOGLE_API_KEY
DATABASE_URL
These variables are configured in Vercel for the required deployment environments.
Do not place real secret values in this README or GitHub.
🧪 Production Validation
The final production deployment was tested successfully for:
- Homepage loading
- Neon database connectivity
- Resume history retrieval
- Resume PDF upload
- PDF text extraction
- Resume analysis
- ATS analysis
- Cover-letter generation
- Interview-question generation
- Interview evaluation endpoint
- Authentication endpoints
The production resume history confirmed that data created through the deployed application is persisted in Neon PostgreSQL.
📌 Important Deployment Notes
Database migration
TrustHire AI was migrated from the previous Supabase PostgreSQL setup to Neon PostgreSQL.
The production database contains the required:
- users table
- resumes table
- resume/user relationship
- required indexes and foreign-key configuration
File storage
Uploaded PDF files are not treated as permanently stored files on Vercel. Resume content needed by the application is stored in the database after parsing.
Git workflow
The production deployment is connected to the GitHub main branch.
Before considering a deployment complete:
git status
git push origin main
The expected final state is:
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
🎯 Future Improvements
Potential future enhancements:
- Persistent cloud object storage for original resume PDFs
- More advanced resume version management
- Better interview-session state management
- Additional AI providers/models
- Role-specific ATS benchmarking
- Recruiter dashboard
- Candidate comparison
- Job-description parsing
- Email notifications
- Production monitoring and analytics
👨‍💻 Author
Yashwanth Kumar Madugonde
B.Tech CSE – Data Science
CMR Institute of Technology, Hyderabad
GitHub: https://github.com/myashwanthkumar721
📄 License
Add the project's chosen license here before publishing a formal open-source release.