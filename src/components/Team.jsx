import React from "react";

function Team() {
  return (
    <section className="team-section" id="Team">
      <h2 className="section-title">Meet The Core Team</h2>
      <div className="team-grid">
        <div className="team-member">
          <h4>Emran Haque</h4>
          <p>Founder</p>
        </div>
        <div className="team-member">
          <h4>Mehedi Hasan</h4>
          <p>Community Manager</p>
        </div>
        <div className="team-member">
          <h4>Rakib</h4>
          <p>Bot Developer</p>
        </div>
      </div>
    </section>
  );
}

export default Team;