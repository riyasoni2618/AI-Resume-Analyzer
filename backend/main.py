from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

import tempfile
import os

from pdf_reader import extract_text_from_pdf
from analyzer import analyze_resume


app = FastAPI()


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-resume-analyzer-azure-seven.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "ResumeAI API is running"
    }


# -----------------------------
# Analyze Resume
# -----------------------------
@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    if resume.content_type != "application/pdf":
        return {
            "error": "Only PDF files are allowed."
        }

    if not job_description.strip():
        return {
            "error": "Job description cannot be empty."
        }

    # Save uploaded PDF temporarily
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:
        temp_file.write(await resume.read())
        temp_path = temp_file.name

    try:
        # Extract text from PDF
        resume_text = extract_text_from_pdf(temp_path)

        if not resume_text or not resume_text.strip():
            return {
                "error": "Could not extract text from the PDF. Please ensure the resume contains selectable text (not scanned images)."
            }

        # Analyze using Gemini
        result = analyze_resume(
            resume_text,
            job_description
        )

        return result

    except Exception as e:
        print(f"Error analyzing resume: {e}")
        return {
            "error": f"Failed to analyze resume: {str(e)}"
        }

    finally:
        # Delete temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)