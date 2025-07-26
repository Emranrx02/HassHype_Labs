import React from 'react';

function Benefits() {
  return (
    <section className="benefits-section" id ="Benefits">
      <h2>Key Benefits of Working With Us</h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <div className="benefit-icon">🚀</div>
          <div className="benefit-title">End-to-End Project Launch</div>
          <div className="benefit-description">
            From ideation to execution — we handle token creation, branding, marketing, and community.
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">🤝</div>
          <div className="benefit-title">Trusted by Founders</div>
          <div className="benefit-description">
            We've worked with dozens of crypto founders to successfully launch their projects across Web3.
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">🌐</div>
          <div className="benefit-title">Global Reach</div>
          <div className="benefit-description">
            We tap into international crypto communities to give your project massive exposure.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;