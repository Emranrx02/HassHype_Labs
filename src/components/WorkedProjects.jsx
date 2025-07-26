// WorkedProjects.jsx
import React from "react";

const WorkedProjects = () => {
  return (
    <section className="worked-projects">
      <div className="worked-container">
        <div className="worked-logos">
          <div className="logo-strip">
            <img src="/assets/project1.jpg" alt="Project 1" />
            <img src="/assets/project2.jpg" alt="Project 2" />
            <img src="/assets/project3.jpg" alt="Project 3" />
            <img src="/assets/project4.jpg" alt="Project 4" />
            <img src="/assets/project5.jpg" alt="Project 5" />
            <img src="/assets/project6.jpg" alt="Project 6" />
            {/* Add more logos */}
          </div>
        </div>

        <div className="worked-description">
          <h2>Projects We've Worked On</h2>
          <p>From DeFi to NFTs and launchpads — our team has delivered growth, engagement, and success for diverse Web3 projects.</p>
          <a href="https://t.me/HashHype" target="_blank" className="cta-button">Build with Us</a>
        </div>
      </div>
    </section>
  );
};

export default WorkedProjects;