import os

from dotenv import load_dotenv
from google import genai

from models import ResumeAnalysis


load_dotenv()


client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


def analyze_resume(resume: str, job_description: str):

    prompt = f"""
You are an expert technical recruiter and resume evaluator.

Your task is to analyze the candidate's resume against the
provided job description.

====================
RESUME
====================

{resume}


====================
JOB DESCRIPTION
====================

{job_description}


====================
ANALYSIS INSTRUCTIONS
====================

1. CANDIDATE NAME

Extract the candidate's name from the resume.

If the name cannot be found, use:
"Unknown"


2. SKILLS ANALYSIS

Identify the skills mentioned in the job description.

Separate them into:

- Required skills
- Preferred skills

Then compare them with the skills actually present in
the resume.

For required skills:

- Put matching skills in required_skills_found.
- Put required skills not found in the resume in
  required_skills_missing.

For preferred skills:

- Put matching skills in preferred_skills_found.
- Put preferred skills not found in the resume in
  preferred_skills_missing.

Do NOT assume that a skill exists if it is not clearly
mentioned or strongly demonstrated in the resume.


3. GENERAL SKILLS

skills_found should contain the important technical and
professional skills actually found in the resume.

missing_skills should contain the important job-related
skills that are missing from the resume.

Do not invent skills.


4. EXPERIENCE ANALYSIS

Determine:

- How many years of experience the candidate has.
- How many years of experience the job requires.
- Whether the candidate's experience is relevant.
- A short explanation of the experience match.

If the job description does not specify an experience
requirement, use 0 for required_years.

If the resume does not clearly specify experience,
use 0 for years_of_experience.

Do not invent experience.


5. EDUCATION ANALYSIS

Determine:

- Candidate's education.
- Education required by the job description.
- Whether the candidate meets the education requirement.
- A short explanation.

If the job description does not specify an education
requirement, use:

required_education = "Not specified"

If education is not found in the resume, clearly state that.


6. STRENGTHS

Identify the strongest aspects of the candidate's resume
for this particular job.

Focus on relevant:

- Skills
- Experience
- Projects
- Education
- Achievements


7. SUGGESTIONS

Give practical suggestions that could improve the
candidate's suitability for this job.

Suggestions should be specific and actionable.

Examples:

- Add experience with AWS if genuinely available.
- Highlight React projects more clearly.
- Add measurable achievements.
- Improve the visibility of relevant experience.

Do not suggest falsely claiming a skill or experience.


====================
MATCHING SCORE
====================

Calculate a score from 0 to 100.

Use these approximate weights:

Skills match: 50%
Relevant experience: 30%
Education/qualifications: 10%
Other job requirements: 10%

The score must reflect the actual match between the
resume and job description.

A candidate should NOT receive a high score simply because
they have some matching skills.

Consider:

- Required skills
- Preferred skills
- Experience level
- Relevant experience
- Education
- Other explicit requirements


====================
IMPORTANT RULES
====================

- Use ONLY information present in the resume and job description.
- Never invent skills.
- Never invent experience.
- Never invent education.
- Never invent certifications.
- Be objective.
- Treat required skills as more important than preferred skills.
- Keep the analysis concise but useful.
- Return all fields required by the ResumeAnalysis schema.
"""


    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": ResumeAnalysis
        }
    )


    return response.parsed