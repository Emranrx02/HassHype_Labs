import React from "react";

function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-card">
        <h2>🚀 Ready to Launch?</h2>
        <p>HashHype Labs is ready to build your dream Web3 project from the ground up.</p>
        <p className="cta-note">We are available 24/7 to assist you.</p>
        <p className="cta-note">Your success is our priority!</p>
        <p className="cta-note">Let's create something amazing together!</p>

        <a
          href="https://t.me/emranrx"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Launch with Us
        </a>
      </div>
    </section>
  );
}

export default CTA;