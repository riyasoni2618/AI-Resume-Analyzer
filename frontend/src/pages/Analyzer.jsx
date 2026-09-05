import { useState } from "react";
import "../App.css";

import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";
import AnalysisResult from "../components/AnalysisResult";

function Analyzer() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // -----------------------------
    // Resume validation
    // -----------------------------
    const validateAndSetFile = (file) => {
        setError("");

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please upload a PDF or Word document.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("File size should be less than 5MB.");
            return;
        }

        setResume(file);
    };

    // -----------------------------
    // File input
    // -----------------------------
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        validateAndSetFile(file);
    };

    // -----------------------------
    // Drag & Drop
    // -----------------------------
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        validateAndSetFile(file);
    };

    // -----------------------------
    // Reset analysis
    // -----------------------------
    const resetAnalysis = () => {
        setResume(null);
        setJobDescription("");
        setResult(null);
        setError("");
    };

    // -----------------------------
    // Analyze Resume
    // -----------------------------
    const analyzeResume = async () => {
        setError("");

        if (!resume) {
            setError("Please upload your resume.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("resume", resume);
            formData.append("job_description", jobDescription);

            const response = await fetch(
                "http://localhost:8000/analyze",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || errorData?.detail || `Server error (${response.status})`);
            }

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            setResult(data);
        } catch (err) {
            console.error("Resume analysis error:", err);

            if (err.message && (err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.name === "TypeError")) {
                setError("Unable to connect to backend server. Please make sure the backend server is running at http://localhost:8000.");
            } else {
                setError(err.message || "Something went wrong while analyzing the resume. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // Skills Match
    // -----------------------------
    const getSkillsMatch = () => {
        if (!result?.skills_analysis) return 0;

        const requiredFound =
            result.skills_analysis.required_skills_found?.length || 0;

        const requiredMissing =
            result.skills_analysis.required_skills_missing?.length || 0;

        const totalRequired = requiredFound + requiredMissing;

        if (totalRequired === 0) return 0;

        return Math.round(
            (requiredFound / totalRequired) * 100
        );
    };

    // -----------------------------
    // Experience Match
    // -----------------------------
    const getExperienceMatch = () => {
        if (!result?.experience_analysis) return 0;

        const candidateYears =
            result.experience_analysis.years_of_experience || 0;

        const requiredYears =
            result.experience_analysis.required_years || 0;

        if (requiredYears === 0) return 100;

        return Math.min(
            Math.round((candidateYears / requiredYears) * 100),
            100
        );
    };

    return (
        <div className="app" id="analyzer">

                {/* Header */}
                {!result && (
                    <header className="header">
                        <h1>ResumeAI</h1>

                        <p>
                            Analyze your resume against any job description
                            using AI-powered insights.
                        </p>
                    </header>
                )}

                {/* Input Section */}
                {!result && (
                    <div className="input-section">

                        {/* Resume Upload */}
                        <ResumeUpload
                            resume={resume}
                            onFileChange={handleFileChange}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            isDragging={isDragging}
                            onRemove={() => setResume(null)}
                        />

                        {/* Job Description */}
                        <JobDescription
                            jobDescription={jobDescription}
                            onChange={setJobDescription}
                        />

                        {/* Analyze Button */}
                        <AnalyzeButton
                            loading={loading}
                            onAnalyze={analyzeResume}
                        />

                        {/* Error */}
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                    </div>
                )}


                {/* Analysis Result */}
                {result && !loading && (
                    <AnalysisResult
                        result={result}
                        onReset={resetAnalysis}
                        getSkillsMatch={getSkillsMatch}
                        getExperienceMatch={getExperienceMatch}
                    />
                )}

            </div>
    );
}

export default Analyzer;