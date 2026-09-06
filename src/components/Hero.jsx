import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1>
          <span>WEB 3.0</span> Your Dream Project <br /> Build with us
        </h1>
        <p>
          Powered by <strong>Emran’s Team</strong>, we don’t just manage — we build, grow, and maintain 
          Web3 communities that thrive. <br />
          From viral strategies to rock-solid support, <strong>your mission becomes ours</strong>.
        </p>
        <a href="https://t.me/emranrx" target="_blank" rel="noopener noreferrer">
          <button className="schedule-btn">Connect with HashHype Labs Team</button>
        </a>

        <a
          href="https://www.trustpilot.com/review/hashhypelabs.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read HashHype Labs reviews on Trustpilot"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: 'fit-content',
            maxWidth: 'calc(100% - 24px)',
            margin: '24px auto 0',
            padding: '11px 17px',
            borderRadius: '999px',
            border: '1px solid rgba(0, 255, 174, 0.28)',
            background: 'rgba(5, 16, 13, 0.68)',
            color: '#fff',
            textDecoration: 'none',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.22)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            fontSize: '0.85rem',
            lineHeight: 1.25,
            flexWrap: 'wrap',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-grid',
              placeItems: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#00b67a',
              color: '#fff',
              fontSize: '16px',
              flexShrink: 0,
            }}
          >
            ★
          </span>
          <span style={{ color: '#cbd6d1' }}>Trusted by clients.</span>
          <strong style={{ color: '#fff' }}>Reviewed on Trustpilot</strong>
          <span style={{ color: '#00ffae', fontWeight: 700 }}>View reviews ↗</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;