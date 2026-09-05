function ResumeUpload({
  resume,
  isDragging,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
}) {
  return (
    <div className="input-group">

      <label>Upload Resume</label>

      <div
        className={
          isDragging
            ? "drop-zone dragging"
            : "drop-zone"
        }
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >

        <div className="upload-icon">
          📄
        </div>

        <h3>
          Drag & Drop your Resume
        </h3>

        <p>
          or click to browse
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
        />

        <small>
          PDF • Max 5 MB
        </small>

      </div>

      {resume && (
        <div className="selected-file">

          <div className="file-info">

            <span className="file-icon">
              📄
            </span>

            <div>
              <strong>
                {resume.name}
              </strong>

              <small>
                PDF •{" "}
                {(resume.size / (1024 * 1024)).toFixed(2)}
                {" "}MB
              </small>
            </div>

          </div>

          <button
            type="button"
            className="remove-file"
            onClick={onRemove}
          >
            ✕
          </button>

        </div>
      )}

    </div>
  );
}

export default ResumeUpload;