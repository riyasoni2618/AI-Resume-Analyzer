function AnalyzeButton({
  loading,
  onAnalyze,
}) {
  return (
    <>
      <button
        className="analyze-btn"
        onClick={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Analyzing Resume...
          </>
        ) : (
          "Analyze Resume"
        )}
      </button>

      {loading && (
        <div className="analysis-status">
          <p>🔍 Reading your resume...</p>
          <p>🧠 Comparing your skills...</p>
          <p>✨ Preparing recommendations...</p>
        </div>
      )}
    </>
  );
}

export default AnalyzeButton;