import React from 'react';

const trackData = [
  {
    title: '150+ Projects Delivered',
    description:
      'Over the past 5+ years, we’ve completed 150+ projects — including 100+ on Fiverr and 50+ direct & agency clients across Web3, SaaS, fintech, and creator brands.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.2 4.5L19 7l-3.5 2.7L16.4 16 12 13.6 7.6 16l1-6.3L5 7l4.8-.5L12 2z" />
        </g>
      </svg>
    ),
  },
  {
    title: '10K+ Community Members Managed',
    description:
      'We’ve managed and grown communities of 10,000+ members across Telegram, Discord, and X — handling support, engagement, and growth daily.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </g>
      </svg>
    ),
  },
  {
    title: '50+ Growth Campaigns',
    description:
      'From token launches and airdrops to AMAs and hype events, we’ve executed 50+ campaigns focused on real traffic, real holders, and long-term retention.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h6l2-3 4 8 4-6" />
          <path d="M21 19v2H3v-2" />
        </g>
      </svg>
    ),
  },
  {
    title: '50+ KOLs & Creators Activated',
    description:
      'We work with a vetted network of 50+ KOLs and creators, helping projects reach the right audience with the right narrative.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 11v6" />
          <path d="M19 11v6" />
        </g>
      </svg>
    ),
  },
  {
    title: '5+ Years in Web3',
    description:
      'With 5+ years in crypto, community management, and Web3 marketing, we know how to build trust and momentum around your project.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6" />
          <path d="M5 8v6a7 7 0 0 0 14 0V8" />
        </g>
      </svg>
    ),
  },
];

const TrackRecord = () => {
  return (
    <section className="track-record-section" id="TrackRecord">
      <h2 className="section-title">
        <span className="trophy">🏆</span> Our Track Record
      </h2>
      <div className="track-record-list">
        {trackData.map((item, index) => (
          <div className="track-item" key={index}>
            <div className="track-icon">{item.icon}</div>
            <div className="track-title highlight">{item.title}</div>
            <div className="track-description">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackRecord;