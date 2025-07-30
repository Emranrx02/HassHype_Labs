import React, { useState } from "react";

const reviews = [
  {
    name: "Denver",
    role: "Business Developer, Undeads Metaverse",
    duration: "2 Months",
    project: "Undeads Metaverse",
    founder: "Denver",
    telegram: "https://t.me/undeadsmetaverse",
    website: "https://undeads.com",
    text: "We had a great experience working with HASHHYPELABS! Their chatter team delivered exactly the kind of organic and active engagement we were hoping for. Clean, professional, and on point.",
    image: "/assets/undeads.jpg",
    stars: 5,
  },
  {
    name: "KOKO",
    role: "Project CEO, Trinity Labs",
    duration: "3 Weeks",
    project: "Trinity Labs",
    founder: "KOKO",
    telegram: "https://t.me/trinitylabs",
    website: "https://triai.fun",
    text: "Emran and his team at HASHHYPELABS are phenomenal! They helped us build a robust community and their support has been invaluable. Highly recommend!",
    image: "/assets/project7.jpg",
    stars: 5,
  },
  {
    name: "LF LABS",
    role: "Founder of FS LABS",
    duration: "1.5 Months",
    project: "FS LABS",
    founder: "LF LABS",
    telegram: "https://t.me/fslabs",
    website: "https://fslabs.com",
    text: "Working with HASHHYPELABS was a game-changer. Their team understood our needs and delivered results that exceeded our expectations.",
    image: "/assets/project3.jpg",
    stars: 5,
  },
  {
  name: "Sean Jong",
  role: "CEO of K-Tune",
  duration: "3 Years",
  project: "K-Tune Music Platform",
  founder: "N/A",
  telegram: "https://t.me/officiallyktune",
  website: "https://www.k-tune.io",
  text: "HashHypeLabs managed the K-Tune community with dedication. They created engaging content, responded to user queries in real-time, and ensured everything ran smoothly. Their presence brought real activity and visibility to our project.",
  image: "/assets/project6.jpg",
  stars: 5,
},
  {
  name: "Vinotech",
  role: "Community & Growth Partner",
  duration: "3 Years",
  project: "Vinotech ",
  founder: "N/A",
  telegram: "https://t.me/vinotechportal",
  website: "https://vinotech.io",
  text: "Our partnership with HashHypeLabs helped us expand our community and brand identity significantly. Their team delivered solid Twitter marketing, community growth strategies, and handled Telegram moderation flawlessly.",
  image: "/assets/project5.jpg",
  stars: 5,
},
{
  name: "Toni Caradonna",
  role: "Community Manager",
  duration: "6 Months",
  project: "OFD (Decentralized Oracle-backed Stablecoin)",
  founder: "Toni Caradonna",
  telegram: "https://t.me/oraclefreedollar",
  website: "https://oraclefreedollar.io",
  text: "The OFD team worked closely with HashHypeLabs for their Telegram and Twitter presence. Their structured content plan, engagement strategy, and chatter team helped us maintain a professional brand image in front of investors and users.",
  image: "/assets/project4.jpg",
  stars: 5,
},
{
    name: "Kamran",
    role: "CEO of Shopidropship",
    duration: "1 Month",
    project: "Shopidropship",
    founder: "Kamran",
    telegram: "https://t.me/shopidropship",
    website: "https://shopidropship.com",
    text: "HASHHYPELABS brought our vision to life with stunning visuals and seamless functionality. Their expertise in web development is unmatched!",
    image: "/assets/shopidropship_logo.jpg",
    stars: 5,
  },
];

const ClientReview = () => {
  const [index, setIndex] = useState(0);
  const handleNext = () => setIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const {
    name,
    role,
    duration,
    project,
    telegram,
    website,
    text,
    image,
    stars,
  } = reviews[index];

  return (
    <section className="client-review" id="ClientReview">
      <div className="testimonial-section">
        <h2 className="testimonial-title">Happy & Satisfied Faces</h2>
        <p className="testimonial-subtitle">
          Here's what some of our satisfied clients say
        </p>

        <div className="testimonial-card">
          <div className="testimonial-image">
            <img src={image} alt={name} />
          </div>

          <h3 className="testimonial-name">{name}</h3>
          <p className="testimonial-role">
            {role} — <span>Duration:</span> {duration}
          </p>

          <div className="testimonial-project">
            <strong>Project:</strong> {project}
          </div>

          <div className="testimonial-links">
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              📩
            </a>
            <a href={website} target="_blank" rel="noopener noreferrer">
              🌐
            </a>
          </div>

          <div className="testimonial-stars">{"⭐".repeat(stars)}</div>

          <p className="testimonial-text">“{text}”</p>

          <div className="testimonial-arrows">
            <button onClick={handlePrev}>←</button>
            <button onClick={handleNext}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReview;
