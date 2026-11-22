import {Link} from "react-router-dom";

function Home() {
    const skills = [
        "Python",
        "C#",
        "JavaScript",
        "TypeScript",
        "React",
        "SQL",
        "Machine Learning",
        "Git & GitHub"
    ];
    return (
        <main className="home-page">
            <section className="hero">
                <div className="hero-content">
                  <img
                    src="/public.tsx/Logo.png"
                    alt="Syeda Anamta Aziz logo"
                    className="hero-logo-image"
                  />
                  <p className="hero-eyebrow">WELCOME TO MY PORTFOLIO</p>
                  <h1>Hi, I'm <span>Syeda Anamta!</span></h1>
                  <p className="hero-description">
                     Software Engineering Technology — Artificial Intelligence student at Centennial College,
                     focused on software development, machine learning, and modern web technologies.
                  </p>
                  <div className="hero-buttons">
                     <Link to="/about" className="primary-button">About Me</Link>
                     <Link to="/projects"className="secondary-button">View My Projects</Link>
                  </div>
                </div>  
                <div className="hero-details">
                  <div className="goals">
                    <strong>My Goals</strong>
                    <p>Build a strong foundation in software development and artificial intelligence through practical projects.</p>
                    <p>Continue growing as a developer, gain professional experience, and contribute to useful technology solutions.</p>
                    <p>Strengthen problem-solving skills and prepare for future opportunities in software engineering and AI.</p>
                  </div>
                  <div className="hero-card">
                    <h3>Syeda Anamta Aziz</h3>
                    <p className="hero-card-subtitle">Software Engineering & AI</p>
                    <div className="hero-divider"></div>
                    <h4>AI <span>&#8226;</span> Software <span>&#8226;</span> Full-Stack Development</h4>
                    <p>Building technology with curiosity, creativity, and purpose.</p>
                    <div className="hero-tags">
                      <span>AI</span>
                      <span>Software</span>
                      <span>Web Development</span>
                    </div>
                  </div>
                </div>
            </section>

            <section className="home-technologies">
                <h2>Technologies & Tools</h2>

                <p>Continuously learning and developing my technical skills.</p>
                <div className="technology-tags">
                    {skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                    ) )}
                </div>
            </section>
        </main>
    );
}

export default Home;