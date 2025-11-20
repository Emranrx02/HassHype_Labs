import React from "react";

const services = [
	{
		title: "Community Management",
		description:
			"24/7 Telegram, Discord, and Twitter community moderation, engagement, and support.",
		icon: 'community',
	},
	{
		title: "Bot Development",
		description:
			"Custom bots and mini-apps for automation, analytics, airdrops, onboarding, and VIP flows.",
		icon: 'bot',
	},
	{
		title: "Influencer Marketing",
		description:
			"Tap into our vetted KOL network to drive awareness and trust for your project across Web3.",
		icon: 'influencer',
	},
	{
		title: "Content Creation",
		description:
			"Memes, videos, animations, stickers, and branding kits — content designed for viral, community-first growth.",
		icon: 'content',
	},
	{
		title: "Launch & Hype Planning",
		description:
			"Pre-launch buzz, event scripting, countdowns, and coordinated social pushes — everything to ignite launch day.",
		icon: 'launch',
	},
	{
		title: "Twitter & Telegram Growth",
		description:
			"Real user growth with welcome flows, chatter campaigns, and activity reports — no fake numbers.",
		icon: 'growth',
	},
	{
		title: "Web3 Branding",
		description:
			"We craft unique, memorable brand identities aligned with your mission, story, and target audience.",
		icon: 'branding',
	},
	{
		title: "Web Development",
		description:
			"Fast, modern Web3-ready sites and dashboards — React builds with wallet/API integrations, clean UI, and full deployment support.",
		icon: 'webdev',
	},
	{
		title: "Post-Launch Monitoring",
		description:
			"We help you iterate — community feedback, bug fixes, content updates, and ongoing strategy support.",
		icon: 'monitor',
	},
	{
		title: "KOL Hub (Coming Soon)",
		description:
			"A live KOL directory on-site, pulling data from our internal sheet — see reach, platform, and pricing in one transparent view.",
		icon: 'kol',
	},
];

function Services() {
	const renderIcon = (name) => {
		switch (name) {
			case 'community':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="8" cy="8" r="2" />
							<path d="M2 20c1.5-3 6-4 6-4s4 .5 6 4" />
							<circle cx="17" cy="9" r="1.5" />
							<path d="M13 20c1-2.2 4-3 4-3" />
						</g>
					</svg>
				);
			case 'bot':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<rect x="3" y="7" width="18" height="10" rx="2" />
							<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
							<circle cx="9" cy="12" r="1" />
							<circle cx="15" cy="12" r="1" />
						</g>
					</svg>
				);
			case 'influencer':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M3 11h3l8-5v12l-8-5H3v-2z" />
							<path d="M21 7v10" />
						</g>
					</svg>
				);
			case 'content':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<rect x="2" y="6" width="20" height="12" rx="2" />
							<path d="M10 9l5 3-5 3V9z" />
						</g>
					</svg>
				);
			case 'launch':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M12 2l3 7-3 13-3-13 3-7z" />
							<path d="M5 12l4-1" />
							<path d="M19 12l-4-1" />
						</g>
					</svg>
				);
			case 'growth':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M3 17l6-6 4 4 8-8" />
							<path d="M3 21h18" />
						</g>
					</svg>
				);
			case 'branding':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M3 12h18" />
							<circle cx="12" cy="8" r="2" />
							<circle cx="12" cy="16" r="2" />
						</g>
					</svg>
				);
			case 'webdev':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<rect x="3" y="4" width="18" height="14" rx="2" />
							<path d="M8 20h8" />
							<path d="M9 9l2 2-2 2" />
							<path d="M15 9l-2 2 2 2" />
						</g>
					</svg>
				);
			case 'monitor':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M12 2v4" />
							<path d="M5 8l4 4-4 4" />
							<path d="M19 8l-4 4 4 4" />
						</g>
					</svg>
				);
			case 'kol':
				return (
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g stroke="#00ffae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="8" r="3" />
							<path d="M5 20c1-3 6-4 7-4s6 1 7 4" />
							<path d="M3 12h18" />
						</g>
					</svg>
				);
			default:
				return null;
		}
	};
	return (
		<section className="services-section" id="Services">
			<h2 className="services-title">What We Offer</h2>
			<div className="services-list">
						{services.map((item, index) => (
							<div className="service-item" key={index}>
								<div className="service-icon">{renderIcon(item.icon)}</div>
								<div className="service-title highlight">{item.title}</div>
								<div className="service-description">{item.description}</div>
							</div>
						))}
			</div>
		</section>
	);
}

export default Services;