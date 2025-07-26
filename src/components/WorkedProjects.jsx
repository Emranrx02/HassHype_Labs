import React from "react";

const logos = [
  "/assets/project1.jpg",
  "/assets/project2.jpg",
  "/assets/project3.jpg",
  "/assets/project4.jpg",
  "/assets/project5.jpg",
  "/assets/project6.jpg",
];

const WorkedProjects = () => {
  return (
    <section className="worked-projects">
      <h2 className="worked-title"> Projects We've Worked On</h2>
      <p className="worked-description">
        We have collaborated with a diverse range of clients, delivering innovative solutions that drive success. Here are some of the projects we've proudly contributed to:
      </p>

      <div className="double-slider">
        {/* LEFT TO RIGHT */}
        <div className="slider-row row-left">
          {[...logos, ...logos, ...logos].map((src, idx) => (
            <img key={`left-${idx}`} src={src} alt={`Logo ${idx + 1}`} />
          ))}
        </div>

        {/* RIGHT TO LEFT */}
        <div className="slider-row row-right">
          {[...logos, ...logos, ...logos].map((src, idx) => (
            <img key={`right-${idx}`} src={src} alt={`Logo ${idx + 1}`} />
          ))}
        </div>
      </div>

      <div className="worked-cta">
        <a
          href="https://t.me/emranrx"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Build with Us
        </a>
      </div>
    </section>
  );
};

export default WorkedProjects;