// import { useState } from "react";
// function AnalysisResult({
//     result,
//     onReset,
//     getSkillsMatch,
//     getExperienceMatch,
// }) {
//     if (!result) {
//         return null;
//     }

//     return (
//         <div className="card">

//             {/* RESULT HEADER */}

//             <div className="result-header">

//                 <div>
//                     <h2>
//                         {result.candidate_name}
//                     </h2>

//                     <p>
//                         Resume Analysis
//                     </p>
//                 </div>

//                 {/* OVERALL SCORE */}

//                 {/* <div className="score-box">

//           <div className="score">
//             {result.matching_score}%
//           </div>

//           <span>
//             Match Score
//           </span>

//           <div className="score-bar">
//             <div
//               className="score-fill"
//               style={{
//                 width: `${result.matching_score}%`,
//               }}
//             ></div>
//           </div>

//           <p className="score-message">
//             {result.matching_score >= 80
//               ? "Strong match for this role."
//               : result.matching_score >= 60
//                 ? "Good match, but some skills are missing."
//                 : "Significant skill gaps found."
//             }
//           </p>

//         </div> */}
//                 <div className="score-box">

//                     <div
//                         className="score-circle"
//                         style={{
//                             "--score": `${result.matching_score}%`,
//                         }}
//                     >
//                         <div className="score-circle-inner">
//                             <span className="score">
//                                 {result.matching_score}%
//                             </span>
//                         </div>
//                     </div>

//                     <span className="score-label">
//                         Match Score
//                     </span>

//                     <p className="score-message">
//                         {result.matching_score >= 80
//                             ? "Strong match for this role."
//                             : result.matching_score >= 60
//                                 ? "Good match, but some skills are missing."
//                                 : "Significant skill gaps found."
//                         }
//                     </p>

//                 </div>

//             </div>


//             {/* INSIGHTS */}

//             <div className="insights-grid">

//                 {/* SKILLS MATCH */}

//                 <div className="insight-card">

//                     <h4>
//                         Skills Match
//                     </h4>

//                     <p className="insight-value">
//                         {getSkillsMatch()}%
//                     </p>

//                     <div className="insight-progress">

//                         <div
//                             className="insight-progress-fill"
//                             style={{
//                                 width: `${getSkillsMatch()}%`,
//                             }}
//                         ></div>

//                     </div>

//                     <span>
//                         {result.skills_analysis
//                             ? `${result.skills_analysis.required_skills_found?.length || 0} of ${(result.skills_analysis.required_skills_found?.length || 0) +
//                             (result.skills_analysis.required_skills_missing?.length || 0)
//                             } required skills`
//                             : "No skill data available"
//                         }
//                     </span>

//                 </div>


//                 {/* EXPERIENCE */}

//                 <div className="insight-card">

//                     <h4>
//                         Experience
//                     </h4>

//                     <p className="insight-value">

//                         {result.experience_analysis
//                             ?.years_of_experience ?? 0}

//                         {" / "}

//                         {result.experience_analysis
//                             ?.required_years ?? 0}

//                         {" yrs"}

//                     </p>

//                     <div className="insight-progress">

//                         <div
//                             className="insight-progress-fill"
//                             style={{
//                                 width: `${getExperienceMatch()}%`,
//                             }}
//                         ></div>

//                     </div>

//                     <span>

//                         {result.experience_analysis
//                             ?.relevant_experience
//                             ? "✓ Relevant experience"
//                             : "⚠ Experience gap"
//                         }

//                     </span>

//                 </div>


//                 {/* EDUCATION */}

//                 <div className="insight-card">

//                     <h4>
//                         Education
//                     </h4>

//                     <p className="insight-value">

//                         {result.education_analysis
//                             ?.education_match
//                             ? "✓"
//                             : "⚠"
//                         }

//                     </p>

//                     <span className="education-status">

//                         {result.education_analysis
//                             ?.education_match
//                             ? "Requirement met"
//                             : "Requirement not met"
//                         }

//                     </span>

//                 </div>

//             </div>


//             {/* SKILLS FOUND */}

//             <div className="section">

//                 <h3>
//                     Skills Found
//                 </h3>

//                 {(result.skills_found || []).length > 0 ? (

//                     <div className="skills">

//                         {result.skills_found.map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>

//                 ) : (

//                     <p className="empty-message">
//                         No matching skills found.
//                     </p>

//                 )}

//             </div>


//             {/* MISSING SKILLS */}

//             <div className="section">

//                 <h3>
//                     Missing Skills
//                 </h3>

//                 {(result.missing_skills || []).length > 0 ? (

//                     <div className="skills">

//                         {result.missing_skills.map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill missing"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>

//                 ) : (

//                     <p className="empty-message">
//                         No major skill gaps found 🎉
//                     </p>

//                 )}

//             </div>


//             {/* DETAILED SKILLS ANALYSIS */}

//             {result.skills_analysis && (

//                 <div className="section">

//                     <h3>
//                         Detailed Skills Analysis
//                     </h3>


//                     <h4>
//                         Required Skills Found
//                     </h4>

//                     <div className="skills">

//                         {(
//                             result.skills_analysis
//                                 .required_skills_found || []
//                         ).map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>


//                     <h4>
//                         Required Skills Missing
//                     </h4>

//                     <div className="skills">

//                         {(
//                             result.skills_analysis
//                                 .required_skills_missing || []
//                         ).map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill missing"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>


//                     <h4>
//                         Preferred Skills Found
//                     </h4>

//                     <div className="skills">

//                         {(
//                             result.skills_analysis
//                                 .preferred_skills_found || []
//                         ).map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>


//                     <h4>
//                         Preferred Skills Missing
//                     </h4>

//                     <div className="skills">

//                         {(
//                             result.skills_analysis
//                                 .preferred_skills_missing || []
//                         ).map(
//                             (skill, index) => (

//                                 <span
//                                     className="skill missing"
//                                     key={index}
//                                 >
//                                     {skill}
//                                 </span>

//                             )
//                         )}

//                     </div>

//                 </div>

//             )}


//             {/* EXPERIENCE ANALYSIS */}

//             <div className="section">

//                 <h3>
//                     Experience Analysis
//                 </h3>

//                 <p>

//                     <strong>
//                         Candidate Experience:
//                     </strong>{" "}

//                     {result.experience_analysis
//                         ?.years_of_experience ?? 0}

//                     {" "}years

//                 </p>

//                 <p>

//                     <strong>
//                         Required Experience:
//                     </strong>{" "}

//                     {result.experience_analysis
//                         ?.required_years ?? 0}

//                     {" "}years

//                 </p>

//                 <p>

//                     <strong>
//                         Relevant:
//                     </strong>{" "}

//                     {result.experience_analysis
//                         ?.relevant_experience
//                         ? "Yes"
//                         : "No"
//                     }

//                 </p>

//                 <p>
//                     {result.experience_analysis?.summary}
//                 </p>

//             </div>


//             {/* EDUCATION ANALYSIS */}

//             {result.education_analysis && (

//                 <div className="section">

//                     <h3>
//                         Education Analysis
//                     </h3>

//                     <p>

//                         <strong>
//                             Candidate Education:
//                         </strong>{" "}

//                         {result.education_analysis
//                             .candidate_education}

//                     </p>

//                     <p>

//                         <strong>
//                             Required Education:
//                         </strong>{" "}

//                         {result.education_analysis
//                             .required_education}

//                     </p>

//                     <p>

//                         <strong>
//                             Education Match:
//                         </strong>{" "}

//                         {result.education_analysis
//                             .education_match
//                             ? "Yes"
//                             : "No"
//                         }

//                     </p>

//                     <p>
//                         {result.education_analysis.summary}
//                     </p>

//                 </div>

//             )}


//             {/* STRENGTHS */}

//             <div className="section">

//                 <h3>
//                     Strengths
//                 </h3>

//                 <ul className="list">

//                     {(result.strengths || []).map(
//                         (strength, index) => (

//                             <li key={index}>
//                                 {strength}
//                             </li>

//                         )
//                     )}

//                 </ul>

//             </div>


//             {/* SUGGESTIONS */}

//             <div className="section">

//                 <h3>
//                     Suggestions
//                 </h3>

//                 <ul className="list">

//                     {(result.suggestions || []).map(
//                         (suggestion, index) => (

//                             <li key={index}>
//                                 {suggestion}
//                             </li>

//                         )
//                     )}

//                 </ul>

//             </div>


//             {/* RESET */}

//             <div className="reset-container">

//                 <button
//                     className="reset-btn"
//                     onClick={onReset}
//                 >
//                     Analyze Another Resume
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default AnalysisResult;
import { useState } from "react";

function AnalysisResult({
  result,
  onReset,
  getSkillsMatch,
  getExperienceMatch,
}) {
  const [openSection, setOpenSection] = useState("skills");

  const toggleSection = (section) => {
    setOpenSection(
      openSection === section ? "" : section
    );
  };

  return (
    <div className="card">

      {/* ==========================================
          RESULT HEADER
      ========================================== */}

      <div className="result-header">

        <div>
          <h2>
            {result.candidate_name}
          </h2>

          <p>
            Resume Analysis
          </p>
        </div>


        {/* OVERALL SCORE */}

        <div className="score-box">

          <div
            className="score-circle"
            style={{
              "--score": `${result.matching_score}%`,
            }}
          >
            <div className="score-circle-inner">

              <span className="score">
                {result.matching_score}%
              </span>

            </div>
          </div>

          <span className="score-label">
            Match Score
          </span>

          <p className="score-message">

            {result.matching_score >= 80
              ? "Strong match for this role."
              : result.matching_score >= 60
                ? "Good match, but some skills are missing."
                : "Significant skill gaps found."
            }

          </p>

        </div>

      </div>


      {/* ==========================================
          INSIGHTS
      ========================================== */}

      <div className="insights-grid">

        {/* SKILLS */}

        <div className="insight-card">

          <h4>
            Skills Match
          </h4>

          <p className="insight-value">
            {getSkillsMatch()}%
          </p>

          <div className="insight-progress">

            <div
              className="insight-progress-fill"
              style={{
                width: `${getSkillsMatch()}%`,
              }}
            ></div>

          </div>

          <span>

            {result.skills_analysis
              ? `${result.skills_analysis.required_skills_found?.length || 0}
              of ${(result.skills_analysis.required_skills_found?.length || 0) +
                (result.skills_analysis.required_skills_missing?.length || 0)}
              required skills`
              : "No skill data available"
            }

          </span>

        </div>


        {/* EXPERIENCE */}

        <div className="insight-card">

          <h4>
            Experience
          </h4>

          <p className="insight-value">

            {result.experience_analysis
              ?.years_of_experience ?? 0}

            {" / "}

            {result.experience_analysis
              ?.required_years ?? 0}

            {" yrs"}

          </p>

          <div className="insight-progress">

            <div
              className="insight-progress-fill"
              style={{
                width: `${getExperienceMatch()}%`,
              }}
            ></div>

          </div>

          <span>

            {result.experience_analysis
              ?.relevant_experience
              ? "✓ Relevant experience"
              : "⚠ Experience gap"
            }

          </span>

        </div>


        {/* EDUCATION */}

        <div className="insight-card">

          <h4>
            Education
          </h4>

          <p className="insight-value">

            {result.education_analysis
              ?.education_match
              ? "✓"
              : "⚠"
            }

          </p>

          <span className="education-status">

            {result.education_analysis
              ?.education_match
              ? "Requirement met"
              : "Requirement not met"
            }

          </span>

        </div>

      </div>


      {/* ==========================================
          SKILLS FOUND
      ========================================== */}

      <div className="section">

        <div
          className="section-header"
          onClick={() => toggleSection("found")}
        >

          <h3>
            Skills Found
          </h3>

          <span className="section-arrow">
            {openSection === "found" ? "−" : "+"}
          </span>

        </div>


        {openSection === "found" && (

          <div className="section-content">

            {(result.skills_found || []).length > 0 ? (

              <div className="skills">

                {result.skills_found.map(
                  (skill, index) => (

                    <span
                      className="skill"
                      key={index}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="empty-message">
                No matching skills found.
              </p>

            )}

          </div>

        )}

      </div>


      {/* ==========================================
          MISSING SKILLS
      ========================================== */}

      <div className="section">

        <div
          className="section-header"
          onClick={() => toggleSection("missing")}
        >

          <h3>
            Missing Skills
          </h3>

          <span className="section-arrow">
            {openSection === "missing" ? "−" : "+"}
          </span>

        </div>


        {openSection === "missing" && (

          <div className="section-content">

            {(result.missing_skills || []).length > 0 ? (

              <div className="skills">

                {result.missing_skills.map(
                  (skill, index) => (

                    <span
                      className="skill missing"
                      key={index}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="empty-message">
                No major skill gaps found 🎉
              </p>

            )}

          </div>

        )}

      </div>


      {/* ==========================================
          DETAILED SKILLS ANALYSIS
      ========================================== */}

      {result.skills_analysis && (

        <div className="section">

          <div
            className="section-header"
            onClick={() => toggleSection("skills")}
          >

            <h3>
              Detailed Skills Analysis
            </h3>

            <span className="section-arrow">
              {openSection === "skills" ? "−" : "+"}
            </span>

          </div>


          {openSection === "skills" && (

            <div className="section-content">

              {/* REQUIRED FOUND */}

              <h4>
                Required Skills Found
              </h4>

              <div className="skills">

                {(
                  result.skills_analysis
                    .required_skills_found || []
                ).length > 0 ? (

                  result.skills_analysis
                    .required_skills_found.map(
                      (skill, index) => (

                        <span
                          className="skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                ) : (

                  <p className="empty-message">
                    No required skills found.
                  </p>

                )}

              </div>


              {/* REQUIRED MISSING */}

              <h4>
                Required Skills Missing
              </h4>

              <div className="skills">

                {(
                  result.skills_analysis
                    .required_skills_missing || []
                ).length > 0 ? (

                  result.skills_analysis
                    .required_skills_missing.map(
                      (skill, index) => (

                        <span
                          className="skill missing"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                ) : (

                  <p className="empty-message">
                    No required skills missing 🎉
                  </p>

                )}

              </div>


              {/* PREFERRED FOUND */}

              <h4>
                Preferred Skills Found
              </h4>

              <div className="skills">

                {(
                  result.skills_analysis
                    .preferred_skills_found || []
                ).length > 0 ? (

                  result.skills_analysis
                    .preferred_skills_found.map(
                      (skill, index) => (

                        <span
                          className="skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                ) : (

                  <p className="empty-message">
                    No preferred skills found.
                  </p>

                )}

              </div>


              {/* PREFERRED MISSING */}

              <h4>
                Preferred Skills Missing
              </h4>

              <div className="skills">

                {(
                  result.skills_analysis
                    .preferred_skills_missing || []
                ).length > 0 ? (

                  result.skills_analysis
                    .preferred_skills_missing.map(
                      (skill, index) => (

                        <span
                          className="skill missing"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                ) : (

                  <p className="empty-message">
                    No preferred skills missing 🎉
                  </p>

                )}

              </div>

            </div>

          )}

        </div>

      )}


      {/* ==========================================
          EXPERIENCE ANALYSIS
      ========================================== */}

      <div className="section">

        <div
          className="section-header"
          onClick={() => toggleSection("experience")}
        >

          <h3>
            Experience Analysis
          </h3>

          <span className="section-arrow">
            {openSection === "experience" ? "−" : "+"}
          </span>

        </div>


        {openSection === "experience" && (

          <div className="section-content">

            <p>

              <strong>
                Candidate Experience:
              </strong>{" "}

              {result.experience_analysis
                ?.years_of_experience ?? 0}

              {" "}years

            </p>


            <p>

              <strong>
                Required Experience:
              </strong>{" "}

              {result.experience_analysis
                ?.required_years ?? 0}

              {" "}years

            </p>


            <p>

              <strong>
                Relevant:
              </strong>{" "}

              {result.experience_analysis
                ?.relevant_experience
                ? "Yes"
                : "No"
              }

            </p>


            <p>
              {result.experience_analysis?.summary}
            </p>

          </div>

        )}

      </div>


      {/* ==========================================
          EDUCATION ANALYSIS
      ========================================== */}

      {result.education_analysis && (

        <div className="section">

          <div
            className="section-header"
            onClick={() => toggleSection("education")}
          >

            <h3>
              Education Analysis
            </h3>

            <span className="section-arrow">
              {openSection === "education" ? "−" : "+"}
            </span>

          </div>


          {openSection === "education" && (

            <div className="section-content">

              <p>

                <strong>
                  Candidate Education:
                </strong>{" "}

                {result.education_analysis
                  .candidate_education}

              </p>


              <p>

                <strong>
                  Required Education:
                </strong>{" "}

                {result.education_analysis
                  .required_education}

              </p>


              <p>

                <strong>
                  Education Match:
                </strong>{" "}

                {result.education_analysis
                  .education_match
                  ? "Yes"
                  : "No"
                }

              </p>


              <p>
                {result.education_analysis.summary}
              </p>

            </div>

          )}

        </div>

      )}


      {/* ==========================================
          STRENGTHS
      ========================================== */}

      <div className="section">

        <div
          className="section-header"
          onClick={() => toggleSection("strengths")}
        >

          <h3>
            Strengths
          </h3>

          <span className="section-arrow">
            {openSection === "strengths" ? "−" : "+"}
          </span>

        </div>


        {openSection === "strengths" && (

          <div className="section-content">

            {(result.strengths || []).length > 0 ? (

              <ul className="list">

                {result.strengths.map(
                  (strength, index) => (

                    <li key={index}>
                      {strength}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p className="empty-message">
                No strengths available.
              </p>

            )}

          </div>

        )}

      </div>


      {/* ==========================================
          SUGGESTIONS
      ========================================== */}

      <div className="section">

        <div
          className="section-header"
          onClick={() => toggleSection("suggestions")}
        >

          <h3>
            Suggestions
          </h3>

          <span className="section-arrow">
            {openSection === "suggestions" ? "−" : "+"}
          </span>

        </div>


        {openSection === "suggestions" && (

          <div className="section-content">

            {(result.suggestions || []).length > 0 ? (

              <ul className="list">

                {result.suggestions.map(
                  (suggestion, index) => (

                    <li key={index}>
                      {suggestion}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p className="empty-message">
                No suggestions available.
              </p>

            )}

          </div>

        )}

      </div>


      {/* ==========================================
          RESET
      ========================================== */}

      <div className="reset-container">

        <button
          className="reset-btn"
          onClick={onReset}
        >
          Analyze Another Resume
        </button>

      </div>

    </div>
  );
}

export default AnalysisResult;