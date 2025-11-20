import React from "react";

const aboutItems = [
  {
    title: "One-Stop Web3 Launchpad",
    description:
      "From idea to launch — we handle everything: branding, marketing, bots, token creation, and community setup.",
  },
  {
    title: "Active & Verified Team",
    description:
      "Our 24/7 globally distributed team ensures real engagement, real time support, and non-stop activity across channels.",
  },
  {
    title: "Real Growth & Community Support",
    description:
      "We don’t do fake numbers. We help you build long-term hype through real people, chatter teams, impressions & conversions.",
  },
  {
    title: "Custom Strategy for Every Project",
    description:
      "Every project is unique. We build tailored strategies that match your specific roadmap, audience, and budget.",
  },
  {
    title: "Beyond Launch: Ongoing Support",
    description:
      "Long-term partners — we monitor community sentiment, fix issues, optimize bots, and provide strategic feedback even post-launch.",
  },
];

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container" data-aos="fade-up">
        <h2 className="about-title">Why Choose HashHype Labs?</h2>
        <p className="about-subtitle">
          We’re not just marketers — we’re your long-term Web3 partners 💡
        </p>
        <div className="about-cards">
          {aboutItems.map((item, index) => (
            <div
              className="about-card"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
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