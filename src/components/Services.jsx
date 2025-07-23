import React from 'react';

function Services() {
  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">

        <div className="service-card">
          <div className="service-icon">💬</div>
          <h3 className="service-title">Telegram Community Setup</h3>
          <p className="service-description">Group creation, bot integration, and full moderation.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🤖</div>
          <h3 className="service-title">Custom Telegram Bot Development</h3>
          <p className="service-description">Tailored bots for engagement, airdrop, orders, and more.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🛡️</div>
          <h3 className="service-title">Discord Server Setup</h3>
          <p className="service-description">Secure and fully managed Web3-ready Discord server.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">📨</div>
          <h3 className="service-title">Meme DM Strategy</h3>
          <p className="service-description">Hype-driven meme messaging for viral impact.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🚀</div>
          <h3 className="service-title">Growth Strategy</h3>
          <p className="service-description">Custom growth plans designed for your project's success.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">📈</div>
          <h3 className="service-title">Project Planning & Token Launch</h3>
          <p className="service-description">End-to-end guidance for a successful token launch.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🤝</div>
          <h3 className="service-title">KOL & Influencer Collaboration</h3>
          <p className="service-description">Connect your project with top crypto KOLs.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🎁</div>
          <h3 className="service-title">Campaign & Giveaway Execution</h3>
          <p className="service-description">Boost engagement with seamless airdrop & giveaway plans.</p>
        </div>

      </div>
    </section>
  );
}

export default Services;