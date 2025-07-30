import React from "react";

const aboutItems = [
  {
    title: "One-Stop Web3 Launchpad",
    description: "From idea to launch — we handle everything: branding, marketing, bots, and community.",
  },
  {
    title: "Active & Verified Team",
    description: "Our 24/7 globally distributed team keeps your community buzzing with real engagement.",
  },
  {
    title: "Real Growth & Community Support",
    description: "We don’t do fake numbers. We bring real users, real impressions, and sustainable engagement.",
  },
  {
    title: "Custom Strategy For Every Project",
    description: "Every project is unique. We build tailored strategies that match your goals and audience.",
  },
  {
    title: "Beyond Launch: Ongoing Support",
    description: "Long-term partners — we monitor feedback, fix bugs, update bots, and keep your hype alive.",
  },
];

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container" data-aos="fade-up">
        <h2 className="about-title">Why Choose HashHype Labs?</h2>
        <div className="about-cards">
          {aboutItems.map((item, index) => (
            <div className="about-card" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <h4 className="about-card-title">{item.title}</h4>
              <p className="about-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;