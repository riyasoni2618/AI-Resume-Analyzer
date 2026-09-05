function JobDescription({
  jobDescription,
  onChange,
}) {
  return (
    <div className="input-group">

      <label>
        Job Description
      </label>

      <textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="character-count">
        {jobDescription.length} characters
      </div>

    </div>
  );
}

export default JobDescription;