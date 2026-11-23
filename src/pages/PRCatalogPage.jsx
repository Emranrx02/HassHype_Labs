import { useEffect, useRef, useState } from 'react';
import offers from '../data/prCatalog.json';
import './PRCatalogPage.css';

const PAGE_SIZE = 12;
const ALL = 'All placements';
const categories = [
  ALL, 'Crypto PR', 'PR packages', 'Promotional articles', 'Native articles',
  'YouTube creators', 'Banners & AMAs', 'Tech & business', 'Gaming & NFT',
  'UAE media', 'Featured media', 'Fashion',
];

const wholeUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const decimalUsd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const searchIndex = new Map(offers.map((offer) => [
  offer.id,
  [offer.name, offer.category, offer.format, offer.region, offer.language,
    ...(offer.members ?? []).map((member) => member.name)].join(' ').toLowerCase(),
]));

function priceText(cents) {
  const formatter = cents % 100 === 0 ? wholeUsd : decimalUsd;
  return formatter.format(cents / 100);
}

function quoteLink(offer) {
  const message = offer
    ? `Hi Emran, I'd like a quote for ${offer.name} (${offer.format}).\nProject website: \nAnnouncement / campaign: \nTarget market: \nTimeline: `
    : "Hi Emran, I'd like help planning a Web3 PR campaign.\nProject website: \nAnnouncement / campaign: \nTarget market: \nTimeline: ";
  return `https://t.me/emranrx?text=${encodeURIComponent(message)}`;
}

function OfferPrice({ offer }) {
  if (!offer.cents.length) return <span className="pr-price-label">Price on request</span>;
  return (
    <div className="pr-prices">
      {offer.cents.map((cents, index) => (
        <span className="pr-price" key={index}>
          {priceText(cents)} {offer.variants?.[index] && <small>{offer.variants[index]}</small>}
        </span>
      ))}
    </div>
  );
}

function OfferDetails({ offer, onClose }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (!dialog.current.open) dialog.current.showModal();
  }, []);

  const facts = [
    [offer.reachLabel, offer.reach],
    ['Turnaround', offer.timing],
    ['Country', offer.region],
    ['Language', offer.language],
    ['Listed views', offer.views],
    ['Quantity', offer.quantity],
  ].filter(([, value]) => value);

  return (
    <dialog ref={dialog} className="pr-dialog" aria-labelledby="pr-offer-title" onClose={onClose}>
      <form method="dialog" className="pr-dialog-close">
        <button className="pr-button pr-button-secondary" autoFocus>Close</button>
      </form>
      <span className="pr-kicker">{offer.category}</span>
      <h2 id="pr-offer-title">{offer.name}</h2>
      <p>{offer.format}</p>
      <OfferPrice offer={offer} />
      {facts.length > 0 && (
        <dl className="pr-facts">
          {facts.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      )}
      {offer.notes && <p>{offer.notes}</p>}
      {offer.members?.length > 0 && (
        <>
          <h3>{offer.category === 'YouTube creators' ? 'Creators in this package' : 'Outlets listed in this package'}</h3>
          <ul className="pr-members">
            {offer.members.map((member, index) => (
              <li key={index}>
                {member.url ? (
                  <a href={member.url} target="_blank" rel="noopener noreferrer">{member.name}</a>
                ) : member.name}
                {(member.region || member.language || member.subscribers || member.views) && (
                  <small>{[member.region, member.language, member.subscribers, member.views].filter(Boolean).join(' · ')}</small>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="pr-actions">
        <a className="pr-button pr-button-primary" href={quoteLink(offer)} target="_blank" rel="noopener noreferrer">Request quote on Telegram</a>
        {offer.url && <a className="pr-button pr-button-secondary" href={offer.url} target="_blank" rel="noopener noreferrer">Visit listing</a>}
        {offer.sample && <a className="pr-button pr-button-secondary" href={offer.sample} target="_blank" rel="noopener noreferrer">View sample</a>}
      </div>
    </dialog>
  );
}

function OfferCard({ offer, onSelect }) {
  return (
    <article className="pr-offer">
      <span className="pr-offer-category">{offer.category}</span>
      <h3>{offer.name}</h3>
      <p>{[offer.format, offer.language, offer.timing].filter(Boolean).join(' · ')}</p>
      <div className="pr-offer-bottom">
        <OfferPrice offer={offer} />
        <button type="button" className="pr-button pr-button-secondary" onClick={() => onSelect(offer)}>Details</button>
      </div>
    </article>
  );
}

export default function PRCatalogPage() {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('listed');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = 'Web3 PR & Media Catalog | HashHype Labs';
  }, []);

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = offers.filter((offer) =>
    (category === ALL || offer.category === category) &&
    terms.every((term) => searchIndex.get(offer.id).includes(term)),
  );

  if (sort !== 'listed') {
    const direction = sort === 'low' ? 1 : -1;
    results.sort((a, b) => {
      const aPrice = a.cents.length ? Math.min(...a.cents) : Infinity;
      const bPrice = b.cents.length ? Math.min(...b.cents) : Infinity;
      if (!Number.isFinite(aPrice) || !Number.isFinite(bPrice)) return aPrice === bPrice ? 0 : aPrice - bPrice;
      return direction * (aPrice - bPrice);
    });
  }

  const visible = results.slice(0, shown);

  return (
    <div className="pr-page">
      <header className="pr-header">
        <a className="pr-brand" href="/">HashHype<span>Labs</span></a>
        <a className="pr-home-link" href="/#Services">All services</a>
      </header>

      <main>
        <section className="pr-hero" aria-labelledby="pr-title">
          <div className="pr-hero-body">
            <span className="pr-kicker">Web3 PR & media placements</span>
            <h1 id="pr-title">Put your launch<br /> <em>in the headlines.</em></h1>
            <p>Explore press releases, sponsored articles, PR packages, and creator campaigns. Find the right placement for your audience and budget.</p>
            <div className="pr-actions">
              <a href="#placements" className="pr-button pr-button-primary">Browse placements</a>
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="pr-button pr-button-secondary">Discuss my campaign</a>
            </div>
          </div>
          <dl className="pr-hero-summary">
            <div>
              <dt>Placements & packages</dt>
              <dd>{offers.length}</dd>
            </div>
            <div>
              <dt>PR distribution packages</dt>
              <dd>{offers.filter((offer) => offer.category === 'PR packages').length}</dd>
            </div>
            <div>
              <dt>Media & creator categories</dt>
              <dd>{categories.length - 1}</dd>
            </div>
          </dl>
        </section>

        <section className="pr-list" id="placements" aria-labelledby="pr-list-title">
          <h2 id="pr-list-title">Explore placements</h2>
          <div className="pr-controls">
            <label>
              Search
              <input type="search" value={query} placeholder="Publication, creator or package"
                onChange={(event) => { setQuery(event.target.value); setShown(PAGE_SIZE); }} />
            </label>
            <label>
              Category
              <select value={category} onChange={(event) => { setCategory(event.target.value); setShown(PAGE_SIZE); }}>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              Sort by
              <select value={sort} onChange={(event) => { setSort(event.target.value); setShown(PAGE_SIZE); }}>
                <option value="listed">Catalog order</option>
                <option value="low">Lowest price</option>
                <option value="high">Highest price</option>
              </select>
            </label>
          </div>
          <div className="pr-result-info">
            <p role="status">{results.length ? `Showing ${visible.length} of ${results.length} offers` : 'No matching offers'}</p>
            <p>Rates in USD. Availability, pricing and turnaround are confirmed when you request a quote.</p>
          </div>
          {visible.length ? (
            <div className="pr-offers">
              {visible.map((offer) => <OfferCard key={offer.id} offer={offer} onSelect={setSelected} />)}
            </div>
          ) : <p className="pr-empty">Try another search or category.</p>}
          {visible.length < results.length && (
            <div className="pr-load">
              <button type="button" className="pr-button pr-button-secondary" onClick={() => setShown(shown + PAGE_SIZE)}>Load more placements</button>
            </div>
          )}
        </section>

        <aside className="pr-campaign">
          <div>
            <h2>Need a PR shortlist?</h2>
            <p>Share your project, target market and launch date. We’ll recommend placements that fit your campaign.</p>
          </div>
          <a className="pr-button pr-button-primary" href={quoteLink()} target="_blank" rel="noopener noreferrer">Talk to us on Telegram</a>
        </aside>
      </main>
      {selected && <OfferDetails offer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
