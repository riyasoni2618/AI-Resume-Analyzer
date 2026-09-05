from pydantic import BaseModel
from typing import List


class ExperienceAnalysis(BaseModel):
    years_of_experience: float
    required_years: float
    relevant_experience: bool
    summary: str


class EducationAnalysis(BaseModel):
    candidate_education: str
    required_education: str
    education_match: bool
    summary: str


class SkillsAnalysis(BaseModel):
    required_skills_found: List[str]
    required_skills_missing: List[str]
    preferred_skills_found: List[str]
    preferred_skills_missing: List[str]


class ResumeAnalysis(BaseModel):
    candidate_name: str
    matching_score: int

    skills_found: List[str]
    missing_skills: List[str]

    skills_analysis: SkillsAnalysis
    experience_analysis: ExperienceAnalysis
    education_analysis: EducationAnalysis

    strengths: List[str]
    suggestions: List[str]