import React from "react";

const services = [
  {
    title: "Community Management",
    description: "24/7 Telegram, Discord, and Twitter community moderation, engagement, and support."
  },
  {
    title: "Bot Development",
    description: "Custom bots for automation, analytics, airdrops, onboarding, and mini-app experiences."
  },
  {
    title: "Influencer Marketing",
    description: "Tap into KOL networks to drive awareness and trust for your project across Web3."
  },
  {
    title: "Content Creation",
    description: "Memes, videos, animations, branding kits — content designed for viral growth."
  },
  {
    title: "Launch & Hype Planning",
    description: "Pre-launch buzz, event scripting, coordinated social pushes — everything to ignite launch day."
  },
  {
    title: "Twitter & Telegram Growth",
    description: "Real user growth with activity charts, welcome flows, and chatter campaigns."
  },
  {
    title: "Web3 Branding",
    description: "We craft unique, memorable brand identities aligned with your mission and narrative."
  },
  {
    title: "Post-Launch Monitoring",
    description: "We help you iterate — community feedback, bug fixes, content updates, and more."
  }
];

function Services() {
  return (
    <section className="services-section" id="Services">
      <h2 className="services-title">What We Offer</h2>
      <div className="services-list">
        {services.map((item, index) => (
          <div className="service-item" key={index}>
            <div className="service-icon">{item.icon}</div>
            <div className="service-title">{item.title}</div>
            <div className="service-description">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;