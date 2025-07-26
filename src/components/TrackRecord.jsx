import React, { useState } from 'react';

const trackData = [
  {
    title: "100+ Projects",
    short: "Successfully launched with growth support.",
    details: "We’ve launched over 100 projects, helping them grow from 0 to traction with targeted strategies and community support.",
  },
  {
    title: "50M+ Impressions",
    short: "Across Twitter, Telegram & more.",
    details: "Through organic content and paid campaigns, we generated over 50M impressions across key Web3 platforms.",
  },
  {
    title: "Top KOLs Engaged",
    short: "Crypto influencers backed campaigns.",
    details: "Worked with 70+ KOLs globally to boost project credibility, visibility, and user acquisition.",
  },
  {
    title: "24/7 Support",
    short: "Active community management and support.",
    details: "Our team handles round-the-clock moderation, responding to community needs instantly.",
  },
  {
    title: "Successful Ad Campaigns",
    short: "Ran high-converting campaigns.",
    details: "Successfully executed paid campaigns on Telegram, Twitter, and other crypto-native platforms.",
  },
  {
    title: "Offline Charity Events",
    short: "Social impact via blockchain.",
    details: "Organized charity distributions in flood-affected areas, proving real-world impact through Web3.",
  }
];

const TrackRecord = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDetails = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="track-record-section" id="TrackRecord">
      <h2 className="section-title">Our Track Record</h2>
      <div className="track-record-list">
        {trackData.map((item, index) => (
          <div
            className={`track-item ${activeIndex === index ? 'expanded' : ''}`}
            key={index}
            onClick={() => toggleDetails(index)}
          >
            <div className="track-title">{item.title}</div>
            <div className="track-description">{item.short}</div>
            {activeIndex === index && (
              <div className="track-details">{item.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackRecord;