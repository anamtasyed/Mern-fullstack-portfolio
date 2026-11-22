import "./pages.css";

function Education() {
  return (
    <section className="education-page">
      <div className="education-heading">
        <p className="section-label">My background</p>

        <h1>Education</h1>

        <p>
          My education is helping me build a strong foundation in software
          engineering, programming, and artificial intelligence.
        </p>
      </div>

      <div className="education-card">
        <div className="education-icon">EA</div>

        <div className="education-content">
          <p className="education-year">Fall 2025 – 2028 (Expected)</p>

          <h2>Software Engineering – Artificial Intelligence</h2>

          <h3>Centennial College</h3>

          <p>
            I am currently studying Software Engineering – Artificial
            Intelligence at Centennial College. My studies focus on software
            development, programming, problem solving, and artificial
            intelligence.
          </p>

          <div className="education-details">
            <div>
              <strong>Program</strong>
              <span>Software Engineering – Artificial Intelligence</span>
            </div>

            <div>
              <strong>Institution</strong>
              <span>Centennial College</span>
            </div>

            <div>
              <strong>Program Dates</strong>
              <span>Fall 2025 – 2028 (Expected)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="education-card certificate-card">
        <div className="education-icon">FS</div>

        <div className="education-content">
          <p className="education-year">Certificate of Completion</p>

          <h2>The Complete Full-Stack Web Development Bootcamp</h2>

          <h3>Angela Yu</h3>
          <p>
            Developed practical skills in building complete web applications,
            from responsive interfaces to server-side functionality. Completed through Udemy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Education;