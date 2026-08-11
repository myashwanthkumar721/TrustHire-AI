# 🚀 TrustHire AI

> AI-powered Resume Analysis and Hiring Assistant built with FastAPI, JavaScript, SQLAlchemy, and Google AI.

TrustHire AI is an AI-powered recruitment platform designed to help candidates analyze and improve their resumes while providing recruiters with tools to evaluate candidates efficiently.

The platform combines resume parsing, ATS scoring, role-based skill matching, AI-generated cover letters, interview simulation, resume history, recruiter analytics, candidate evaluation, and hiring reports into one integrated application.

---

## 📌 Overview

TrustHire AI helps solve two sides of the recruitment process.

### For Candidates

- Analyze resume quality
- Identify missing skills
- Improve ATS compatibility
- Prepare for technical interviews
- Generate personalized cover letters
- Track previously uploaded resumes

### For Recruiters

- Evaluate candidates efficiently
- Compare resumes
- Rank candidates
- Search and filter candidates
- Review candidate details
- Generate hiring reports

---

# ✨ Features

## 👤 Candidate Features

### 🔐 User Authentication

- User Registration
- User Login
- Email validation
- Password hashing using bcrypt
- Candidate account management

### 📄 Resume Management

- Resume upload
- PDF resume processing
- Resume parsing
- Resume history
- Upload status tracking
- User-specific resume records

### 🤖 AI Resume Analysis

The platform analyzes uploaded resumes and provides:

- Resume score
- ATS score
- Job-role compatibility
- Extracted skills
- Matched skills
- Missing skills
- Strengths
- Improvement recommendations
- Hiring readiness

### 🎯 Role-Based Analysis

Candidates can select a target role such as:

- Data Analyst
- Data Scientist
- AI Engineer
- ML Engineer
- Python Developer
- Frontend Developer
- Backend Developer
- Full Stack Developer

The resume is analyzed according to the selected role.

### 📝 AI Cover Letter Generator

Generate personalized cover letters based on:

- Resume information
- Selected role
- Candidate skills
- Experience
- Resume analysis

### 🎤 AI Interview Simulator

The interview simulator provides:

- Role-specific technical questions
- Different difficulty levels
- Interactive interview experience
- Candidate answer submission
- AI answer evaluation
- Interview scoring
- Interview results

### 📚 Resume History

Candidates can view previously uploaded resumes including:

- Resume ID
- Filename
- Upload status
- Upload date and time

### 📊 Candidate Results

Candidates can view:

- Resume score
- ATS score
- Skill matching
- Strengths
- Missing skills
- Improvement suggestions
- Hiring readiness
- Interview results

---

# 👨‍💼 Recruiter Features

## 📊 Recruiter Dashboard

Recruiters can evaluate candidates through a centralized dashboard.

Features include:

- Candidate listing
- Candidate ranking
- Candidate search
- Candidate filtering
- ATS score comparison
- Candidate evaluation
- Role-based candidate analysis

## 👤 Candidate Details

Recruiters can view detailed candidate information including:

- Candidate profile
- Resume information
- Skills
- ATS score
- Resume score
- Job-role compatibility
- Candidate evaluation

## 📋 Hiring Reports

The hiring report provides recruiter-oriented candidate insights including:

- Candidate information
- Resume score
- ATS score
- Skills
- Missing skills
- Job-role compatibility
- Candidate evaluation
- Hiring readiness

---

# 🧠 AI Capabilities

TrustHire AI uses AI to assist with:

- Resume understanding
- Resume information extraction
- Skill extraction
- Job-role matching
- ATS evaluation
- Resume improvement recommendations
- Cover letter generation
- Technical interview question generation
- Interview answer evaluation
- Candidate hiring insights

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and responsive UI |
| JavaScript | Frontend functionality and API communication |
| Chart.js | Data visualization and analytics |

## ⚙️ Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | REST API and application backend |
| Uvicorn | ASGI server |
| Pydantic | Data validation and request schemas |

## 🗄️ Database

| Technology | Purpose |
|---|---|
| SQLAlchemy | ORM and database interaction |
| PostgreSQL | Production database |
| SQLite | Local development / compatible database configuration |

## 🤖 AI

| Technology | Purpose |
|---|---|
| Google AI / Gemini API | AI-powered resume analysis, cover letters and interviews |
| Google Gen AI SDK | Communication with Google AI services |

## 📄 Resume Processing

| Library | Purpose |
|---|---|
| PDFPlumber | PDF text extraction |
| PyMuPDF | PDF processing |
| pypdfium2 | PDF rendering and processing |
| python-docx | DOCX document processing |
| Pillow | Image processing |

## 🔐 Authentication & Security

| Technology | Purpose |
|---|---|
| bcrypt | Password hashing |
| Email validation | Email validation |
| python-dotenv | Environment variable management |

## 🌐 Deployment & Development

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code hosting |
| Render | Cloud deployment |
| Python Virtual Environment | Dependency isolation |

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      User Browser    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Frontend        │
                         │    HTML / CSS / JS   │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      FastAPI         │
                         │      Backend         │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │  Database   │       │  Google AI  │       │   Resume    │
       │ SQLAlchemy  │       │  / Gemini   │       │ Processing  │
       └─────────────┘       └─────────────┘       └─────────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Candidate / Recruiter│
                         │       Results        │
                         └──────────────────────┘

📂 Project Structure

TrustHire-AI/
│
├── backend/
│   ├── database/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.py
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── *.html
│
├── uploads/
│   └── resumes/
│
├── reports/
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md

🔄 Application Workflow
                    ┌─────────────────────┐
                    │     TrustHire AI    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
          Candidate Flow                Recruiter Flow
                │                             │
        Register / Login              Recruiter Dashboard
                │                             │
          Upload Resume                Candidate Ranking
                │                             │
          Select Job Role              Candidate Details
                │                             │
          AI Resume Analysis            Hiring Report
                │
        ┌───────┼────────┐
        │       │        │
      ATS    Skills   Insights
      Score  Matching
        │
        ├───────────────┐
        │               │
   Cover Letter    Interview
                       │
                Answer Evaluation
                       │
                 Interview Result

⚙️ Installation & Setup

Clone the Repository
git clone https://github.com/myashwanthkumar721/TrustHire-AI.git

Navigate to the Project
cd TrustHire-AI

Create a Virtual Environment
python -m venv venv

Activate the Virtual Environment
venv\Scripts\activate

Linux / macOS
source venv/bin/activate

Install Dependencies
pip install -r requirements.txt

Configure Environment Variables
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
DATABASE_URL=YOUR_DATABASE_URL

Run the Application
uvicorn backend.app:app --reload

Open the Application
http://127.0.0.1:8000

API Documentation
http://127.0.0.1:8000/docs

📸 Screenshots

🏠 Home Page

🔐 Login / Registration

📄 Resume Upload

📊 Resume Analysis

🎯 ATS Score & Skill Matching

📝 AI Cover Letter Generator

🎤 AI Interview Simulator

📚 Resume History

👨‍💼 Recruiter Dashboard

👤 Candidate Details

📑 Hiring Report

🚀 Deployment

TrustHire AI can be deployed using cloud platforms such as Render.

The production frontend communicates with the backend using relative API routes, allowing the application to work in both local development and production environments.

🤝 Contributing

Contributions, issues, and feature requests are welcome.

To contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test the application
5. Commit your changes
6. Push the branch
7. Create a Pull Request

👨‍💻 Author

Yashwanth Kumar M

GitHub:

https://github.com/myashwanthkumar721

⭐ Support

If you found TrustHire AI useful, consider giving the repository a ⭐ on GitHub.

📄 License

This project is intended for educational, portfolio, and demonstration purposes.

