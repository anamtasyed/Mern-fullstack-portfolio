import "./pages.css";

function ServicesPage() {
  return (
    <main className="inner-page services-page">
      <div className="page-heading">
        <p className="section-label">What I do</p>
        <h1>Services</h1>
      </div>

      <div className="services-grid">
        <section className="service-card">
          <h2>AI & Machine Learning</h2>
          <p>Developing practical AI and machine learning solutions.</p>
        </section>

        <section className="service-card">
          <h2>Web Development</h2>
          <p>Creating simple, responsive websites using HTML, CSS, JavaScript, and React.</p>
        </section>

        <section className="service-card">
          <h2>Software Development</h2>
          <p>Using programming concepts to build organized and useful software solutions.</p>
        </section>
      </div>
    </main>
  )
}

export default ServicesPage;
