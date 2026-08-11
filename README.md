🚀 TrustHire AI

AI-powered Resume Analysis and Hiring Assistant built with FastAPI, JavaScript, SQLAlchemy, and Google AI.

TrustHire AI is an AI-powered recruitment platform designed to help candidates analyze and improve their resumes while providing recruiters with tools to evaluate candidates efficiently.

The platform combines resume parsing, ATS scoring, role-based skill matching, AI-generated cover letters, interview simulation, resume history, recruiter analytics, candidate evaluation, and hiring reports into one integrated application.

📌 Project Overview

Recruitment processes often require candidates to optimize their resumes for specific job roles while recruiters need to evaluate a large number of applicants efficiently.

TrustHire AI addresses both sides of this problem by providing an integrated platform that can:

Analyze resumes using AI

Extract and evaluate candidate skills

Calculate ATS compatibility scores

Match candidates against selected job roles

Identify strengths and missing skills

Generate personalized resume improvement insights

Generate AI-powered cover letters

Simulate technical interviews

Evaluate interview answers

Maintain resume history

Rank and compare candidates

Provide recruiter dashboards

Generate hiring reports



🌐 Live Demo

🚀 Try TrustHire AI live:

https://trusthire-ai-o8zz.onrender.com

The live application is deployed on Render and can be accessed directly from the link above.

✨ Features

👤 Candidate Features

🔐 User Authentication

User Registration

User Login

Email validation

Password hashing using bcrypt

Candidate account management

📄 Resume Management

Resume upload

PDF resume processing

Resume parsing

Resume history

Upload status tracking

User-specific resume records

🤖 AI Resume Analysis

The platform analyzes uploaded resumes and provides:

Resume score

ATS score

Job-role compatibility

Extracted skills

Matched skills

Missing skills

Strengths

Improvement recommendations

Hiring readiness

🎯 Role-Based Analysis

Candidates can select a target role such as:

Data Analyst

Data Scientist

AI Engineer

ML Engineer

Python Developer

Frontend Developer

Backend Developer

Full Stack Developer

The resume is then analyzed according to the selected role.

📝 AI Cover Letter Generator

Generate personalized cover letters based on:

Resume information

Selected role

Candidate skills

Experience

Resume analysis

🎤 AI Interview Simulator

The interview simulator provides:

Role-specific technical questions

Different difficulty levels

Interactive interview experience

Candidate answer submission

AI answer evaluation

Interview scoring

Interview results

📚 Resume History

Candidates can view previously uploaded resumes including:

Resume ID

Filename

Upload status

Upload date and time

📊 Candidate Results

Candidates can view:

Resume score

ATS score

Skill matching

Strengths

Missing skills

Improvement suggestions

Hiring readiness

Interview results

👨‍💼 Recruiter Features

📊 Recruiter Dashboard

Recruiters can evaluate candidates through a centralized dashboard.

Features include:

Candidate listing

Candidate ranking

Candidate search

Candidate filtering

ATS score comparison

Candidate evaluation

Role-based candidate analysis

👤 Candidate Details

Recruiters can view detailed candidate information including:

Candidate profile

Resume information

Skills

ATS score

Resume score

Job-role compatibility

Candidate evaluation

📋 Hiring Reports

The hiring report provides recruiter-oriented candidate insights including:

Candidate information

Resume score

ATS score

Skills

Missing skills

Job-role compatibility

Candidate evaluation

Hiring readiness

🧠 AI Capabilities

TrustHire AI uses AI to assist with:

Resume understanding

Resume information extraction

Skill extraction

Job-role matching

ATS evaluation

Resume improvement recommendations

Cover letter generation

Technical interview question generation

Interview answer evaluation

Candidate hiring insights

🛠️ Tech Stack

🎨 Frontend

Technology

Purpose

HTML5

Web page structure

CSS3

Styling and responsive UI

JavaScript

Frontend functionality and API communication

Chart.js

Data visualization and analytics

⚙️ Backend

Technology

Purpose

Python

Backend programming language

FastAPI

REST API and application backend

Uvicorn

ASGI server

Pydantic

Data validation and request schemas

🗄️ Database

Technology

Purpose

SQLAlchemy

ORM and database interaction

PostgreSQL

Production database

SQLite

Local development / compatible database configuration

🤖 AI

Technology

Purpose

Google AI / Gemini API

AI-powered resume analysis, cover letters, and interviews

Google Gen AI SDK

Communication with Google AI services

📄 Resume Processing

Library

Purpose

PDFPlumber

PDF text extraction

PyMuPDF

PDF processing

pypdfium2

PDF rendering and processing

python-docx

DOCX document processing

Pillow

Image processing

🔐 Authentication & Security

Technology

Purpose

bcrypt

Password hashing

Email Validator

Email validation

python-dotenv

Environment variable management

🌐 Deployment & Development

Technology

Purpose

Git

Version control

GitHub

Source code hosting

Render

Cloud deployment

Python Virtual Environment

Dependency isolation

🏗️ System Architecture

                         ┌──────────────────────┐
                         │      User Browser     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Frontend        │
                         │   HTML / CSS / JS    │
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
       │  Database   │       │  AI Engine  │       │   Resume    │
       │ SQLAlchemy  │       │  Google AI  │       │ Processing  │
       └─────────────┘       └─────────────┘       └─────────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Candidate / Recruiter│
                         │       Results        │
                         └──────────────────────┘

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
├── reports/
│   └── .gitkeep
│
├── screenshots/
│
├── uploads/
│   └── resumes/
│       └── .gitkeep
│
├── .env.example
├── .gitignore
├── project-structure.txt
├── requirements.txt
└── README.md

⚙️ Installation & Setup

1. Clone the Repository

git clone https://github.com/myashwanthkumar721/TrustHire-AI.git

2. Navigate into the Project

cd TrustHire-AI

3. Create a Virtual Environment

python -m venv venv

4. Activate the Virtual Environment

Windows

venv\Scripts\activate

Linux / macOS

source venv/bin/activate

5. Install Dependencies

pip install -r requirements.txt

6. Configure Environment Variables

Create a .env file in the project root.

Use .env.example as the template.

Example:

GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
DATABASE_URL=YOUR_DATABASE_URL

⚠️ Never commit your real .env file or API keys to GitHub.

7. Run the Application

uvicorn backend.app:app --reload

8. Open the Application

Open:

http://127.0.0.1:8000

FastAPI API documentation is also available at:

http://127.0.0.1:8000/docs

🔑 Environment Variables

The application uses environment variables for sensitive configuration.

Variable

Description

GOOGLE_API_KEY

API key used to access Google AI services

DATABASE_URL

Database connection URL

For security:

.env is ignored by Git

API keys must never be committed

.env.example contains placeholder values only

🧪 API Endpoints

The FastAPI backend provides API routes for major application functionality.

Authentication

POST /auth/register
POST /auth/login

Resume

POST /upload
GET /resumes/{user_id}

Resume Analysis

POST /analyze

Cover Letter

POST /cover-letter

Interview

POST /interview/generate
POST /interview/evaluate

Interactive API documentation:

http://127.0.0.1:8000/docs

📸 Screenshots

Add your project screenshots inside the screenshots/ folder and reference them here.

🏠 Home Page

![TrustHire AI Home](screenshots/home.png)

📄 Resume Upload

![Resume Upload](screenshots/resume-upload.png)

📊 Resume Analysis

![Resume Analysis](screenshots/resume-analysis.png)

🎯 ATS Score

![ATS Score](screenshots/ats-score.png)

📝 AI Cover Letter Generator

![AI Cover Letter](screenshots/cover-letter.png)

🎤 AI Interview Simulator

![AI Interview](screenshots/interview.png)

👨‍💼 Recruiter Dashboard

![Recruiter Dashboard](screenshots/recruiter-dashboard.png)

📋 Hiring Report

![Hiring Report](screenshots/hiring-report.png)

Replace the example screenshot filenames above with the exact filenames that exist in your screenshots/ folder.

🚀 Deployment

TrustHire AI is designed to support cloud deployment.

Typical deployment architecture:

GitHub
   │
   ▼
Cloud Hosting / Render
   │
   ├── FastAPI Backend
   │
   ├── Frontend
   │
   └── Environment Variables
             │
             ├── GOOGLE_API_KEY
             └── DATABASE_URL

For production deployment, configure all required environment variables in the hosting platform rather than committing secrets to the repository.

🔒 Security Practices

TrustHire AI follows basic security practices including:

Password hashing using bcrypt

Email validation

Environment variables for sensitive credentials

.env excluded from Git

API keys excluded from source control

Uploaded files excluded from Git

Database files excluded from Git

Virtual environment excluded from Git

🛣️ Future Improvements

Potential future enhancements include:

Advanced recruiter analytics

More detailed candidate comparison

Improved interview evaluation

Additional job roles

Job description matching

Advanced ATS optimization

Email notifications

Resume version comparison

Enhanced candidate recommendations

Production monitoring

More advanced authentication and authorization

Automated testing and CI/CD

🤝 Contributing

Contributions, issues, and feature requests are welcome.

To contribute:

Fork the repository

Create a feature branch

Make your changes

Test the application

Commit your changes

Push the branch

Open a Pull Request

👨‍💻 Author

Yashwanth Kumar M

GitHub:https://github.com/myashwanthkumar721

Project:https://github.com/myashwanthkumar721/TrustHire-AI

⭐ Support

If you found TrustHire AI useful, consider giving the repository a ⭐ on GitHub.

📄 License

This project is intended for educational, portfolio, and demonstration purposes.

⭐ If you like this project, don't forget to star the repository!