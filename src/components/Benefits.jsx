import React from 'react';

function Benefits() {
  return (
    <section className="benefits-section" id="Benefits">
      <h2 className="benefits-title">Key Benefits of Working With Us</h2>
      <p className="benefits-subtitle">From launch to long-term growth — we’re your Web3 dream team 💼</p>

      <div className="benefits-list">
        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
                <path d="M12 8v4l2 2" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">End-to-End Launch</div>
          <div className="benefit-description">
            From token creation to full marketing & branding — we handle everything for your Web3 launch.
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3" />
                <path d="M5 20c1-3 6-4 7-4s6 1 7 4" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">Trusted by Founders</div>
          <div className="benefit-description">
            Dozens of project founders rely on us to grow real communities and get results that matter.
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2l2 6-2 2-2-2 2-6z" />
                <path d="M4 20l6-6" />
                <path d="M20 4l-6 6" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">Long-Term Maintenance</div>
          <div className="benefit-description">
            We stay with your project for the long run — fixing bugs, improving features, and keeping the hype alive.
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">Community Support</div>
          <div className="benefit-description">
            24/7 Telegram & Discord engagement, moderation, and events to fuel growth and retention.
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16v4a1 1 0 0 1-1 1h-4" />
                <path d="M3 8V4a1 1 0 0 1 1-1h4" />
                <path d="M14 10l-4 4" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">Bug Fixes & Updates</div>
          <div className="benefit-description">
            We fix critical issues fast and help optimize your dApp or website — even post-launch.
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M2 12h20" />
                <path d="M12 2v20" />
              </g>
            </svg>
          </div>
          <div className="benefit-title highlight">Global Reach</div>
          <div className="benefit-description">
            Access to massive worldwide crypto audiences through our partner KOLs and chatter teams.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;