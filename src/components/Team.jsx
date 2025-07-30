import React from "react";

function Team() {
  return (
    <section className="team-section" id="Team">
      <h2 className="section-title">Meet The Core Team</h2>

      <div className="team-grid">
        {/* === Emran === */}
        <div className="team-member">
          <img src="/assets/emran.jpg" alt="Emran Haque" className="team-img" />
          <h4>Emran Haque</h4>
          <p>Founder & CEO</p>
          <p>Fiverr Level 2 Seller</p>
          <div className="team-socials">
            <a href="https://t.me/emranrx" target="_blank" rel="noreferrer">
              <img src="/assets/telegramlogo.jpg" alt="Telegram Logo" />
            </a>
            <a href="https://linkedin.com/in/emranrx" target="_blank" rel="noreferrer">
              <img src="/assets/linkedin.jpg" alt="LinkedIn Logo" />
            </a>
          </div>
        </div>

        {/* === Mehedi === */}
        <div className="team-member">
          <img src="/assets/mehedi.jpg" alt="Mehedi Hasan" className="team-img" />
          <h4>Mehedi Hasan</h4>
          <p>Community Manager & Telegram Bot Expert</p>
          <p>Fiverr Level 2 Seller</p>
          <div className="team-socials">
            <a href="https://t.me/Mehedi_Rx" target="_blank" rel="noreferrer">
              <img src="/assets/telegramlogo.jpg" alt="Telegram Logo" />
            </a>
          </div>
        </div>

        {/* === Antor === */}
        <div className="team-member">
          <img src="/assets/antor.jpg" alt="Antor" className="team-img" />
          <h4>Antor</h4>
          <p>Community & Business Developer</p>
          <p>Fiverr Pro Seller</p>
          <div className="team-socials">
            <a href="https://t.me/antor_x" target="_blank" rel="noreferrer">
              <img src="/assets/telegramlogo.jpg" alt="Telegram Logo" />
            </a>
          </div>
        </div>

        {/* === MD Neyamatullah === */}
        <div className="team-member">
          <img src="/assets/Neyamat.jpg" alt="MD Neyamatullah" className="team-img" />
          <h4>MD Neyamatullah</h4>
          <p>Community Manager </p>
          <p>Fiverr Level 2 Seller</p>
          <div className="team-socials">
            <a href="https://t.me/Mtanvir338" target="_blank" rel="noreferrer">
              <img src="/assets/telegramlogo.jpg" alt="Telegram Logo" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;