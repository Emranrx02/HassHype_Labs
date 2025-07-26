import React from "react";

function Team() {
  return (
    <section className="team-section" id="Team">
      <h2 className="section-title">Meet The Core Team</h2>

      <div className="team-grid">
        {/* Emran */}
        <div className="team-member">
          <img src="/assets/emran.jpg" alt="Emran Haque" className="team-img" />
          <h4>Emran Haque</h4>
          <p>Founder & CEO</p>
          <p>Fiverr Level 2 Seller</p>
          <div className="team-socials">
            <a href="https://t.me/emranrx" target="_blank" rel="noreferrer">
              <img src="/assets/telegram-icon.svg" alt="Telegram" />
            </a>
            <a href="https://linkedin.com/in/emranhaque" target="_blank" rel="noreferrer">
              <img src="/assets/linkedin-icon.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Mehedi */}
        <div className="team-member">
          <img src="/assets/mehedi.jpg" alt="Mehedi Hasan" className="team-img" />
          <h4>Mehedi Hasan</h4>
          <p>Community manager & Telegram bot expert</p>
          <p className="team-role">Fiverr Level 2 Seller</p>
          <div className="team-socials">
            <a href="https://t.me/mehediusername" target="_blank" rel="noreferrer">
              <img src="/assets/telegram-icon.svg" alt="Telegram" />
            </a>
          </div>
        </div>

        {/* Antor */}
        <div className="team-member">
          <img src="/assets/antor.jpg" alt="Antor" className="team-img" />
          <h4>Antor</h4>
          <p>Community & Business Developer</p>
          <p className="team-role">Fiverr Pro Seller</p>
          <div className="team-socials">
            <a href="https://linkedin.com/in/antor" target="_blank" rel="noreferrer">
              <img src="/assets/linkedin-icon.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;