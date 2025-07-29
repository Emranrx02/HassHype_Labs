import React, { useState } from "react";

const reviews = [
  {
    name: "Denver",
    role: "Business developer Undeads Metaverse",
    text: "We had a great experience working with HASHHYPELABS! Their chatter team delivered exactly the kind of organic and active engagement we were hoping for. They also helped us manage our forum presence — the execution was clean, professional, and on point. Thanks a lot team! We booked them directly through Fiverr and would absolutely recommend them to others.",
    image: "/assets/undeads.jpg",
    stars: 5,
  },
  {
    name: "Kamran",
    role: "CEO of Shopidropship",
    text: "HASHHYPELABS brought our vision to life with stunning visuals and seamless functionality. Their expertise in web development is unmatched!",
    image: "/assets/shopidropship_logo.jpg",
    stars: 5,
  },
  {
    name: "John Doe",
    role: "Founder of Tech Innovators",
    text: "Working with HASHHYPELABS was a game-changer for our business. Their team not only understood our needs but also exceeded our expectations with their innovative solutions.",
    image: "/assets/tech_innovators.jpg",
    stars: 5,
  },
];

const ClientReview = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const { name, role, text, image, stars } = reviews[index];

  return (
    <section className="client-review" id="ClientReview">
      <div className="testimonial-section">
        <h2 className="testimonial-title">Happy & Satisfied Faces</h2>
        <p className="testimonial-subtitle">Here's what some of our satisfied clients say</p>

        <div className="testimonial-card">
          <div className="testimonial-image">
            <img src={image} alt={name} />
          </div>

          <h3 className="testimonial-name">{name}</h3>
          <p className="testimonial-role">{role}</p>

          <div className="testimonial-stars">
            {Array(stars).fill("⭐").join(" ")}
          </div>

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