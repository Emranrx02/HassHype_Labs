import React, { useMemo, useState } from 'react';

const WALLET_ADDRESS = '0x1483393Cabbc486fe15B2fD067Bf91A41fc17a1a';

function Payment() {
  const [network, setNetwork] = useState('BEP-20');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    service: '',
    amount: '',
    txid: '',
  });

  const invoiceId = useMemo(() => {
    const stamp = Date.now().toString().slice(-7);
    return `HHL-${new Date().getFullYear()}-${stamp}`;
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyWallet = async () => {
    await navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="payment-section" id="payment">
      <div className="payment-shell" data-aos="fade-up">
        <div className="payment-heading">
          <span className="payment-kicker">HASHHYPE LABS • SECURE CHECKOUT</span>
          <h2>Pay HashHype Labs</h2>
          <p>Complete your project payment with USDT and submit your transaction details for verification.</p>
        </div>

        <div className="payment-layout">
          <div className="payment-card payment-details-card">
            <div className="payment-card-top">
              <div>
                <span className="payment-label">PAY WITH</span>
                <h3>USDT</h3>
              </div>
              <span className="payment-status-dot">Crypto Payment</span>
            </div>

            <label className="payment-label">Select network</label>
            <div className="network-tabs">
              {['BEP-20', 'ERC-20'].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={network === item ? 'network-tab active' : 'network-tab'}
                  onClick={() => setNetwork(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="wallet-box">
              <div>
                <span className="payment-label">USDT {network} wallet</span>
                <p>{WALLET_ADDRESS}</p>
              </div>
              <button type="button" className="copy-wallet-btn" onClick={copyWallet}>
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <div className="payment-warning">
              <span>!</span>
              <p>Only send USDT using the selected network. Sending another token or using a different network may result in loss of funds.</p>
            </div>

            <div className="payment-company">
              <div><span>Merchant</span><strong>HashHype Labs</strong></div>
              <div><span>Website</span><strong>hashhypelabs.com</strong></div>
              <div><span>Support</span><strong>@emranrx</strong></div>
              <div><span>Receipt</span><strong>USD / USDT</strong></div>
            </div>
          </div>

          <form className="payment-card payment-form" onSubmit={submitPayment}>
            <div className="payment-form-title">
              <span>Payment details</span>
              <small>{invoiceId}</small>
            </div>

            <div className="payment-field-grid">
              <label>
                Client name
                <input name="name" value={form.name} onChange={update} placeholder="Your full name" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required />
              </label>
            </div>

            <label>
              Project name
              <input name="project" value={form.project} onChange={update} placeholder="Project / company name" required />
            </label>

            <label>
              Service
              <select name="service" value={form.service} onChange={update} required>
                <option value="">Choose a service</option>
                <option>Community Management</option>
                <option>Web3 Marketing & Growth</option>
                <option>Influencer / KOL Marketing</option>
                <option>Bot Development & Automation</option>
                <option>Website Development</option>
                <option>Content & Branding</option>
                <option>Other / Custom Service</option>
              </select>
            </label>

            <div className="payment-field-grid">
              <label>
                Amount
                <div className="amount-input"><input name="amount" type="number" min="1" step="0.01" value={form.amount} onChange={update} placeholder="500" required /><span>USDT</span></div>
              </label>
              <label>
                Network
                <input value={network} readOnly />
              </label>
            </div>

            <label>
              Transaction Hash / TxID
              <input name="txid" value={form.txid} onChange={update} placeholder="Paste transaction hash after payment" required />
            </label>

            <button className="payment-submit" type="submit">Submit Payment for Verification →</button>
            <p className="payment-form-note">Submitting a TxID does not automatically mark a payment as paid. It will be verified before a paid receipt is issued.</p>
          </form>
        </div>

        {submitted && (
          <div className="invoice-preview" data-aos="zoom-in">
            <div className="invoice-success">✓ PAYMENT SUBMITTED</div>
            <div className="invoice-header">
              <div><span>HASHHYPE LABS</span><h3>Payment Receipt</h3></div>
              <div className="invoice-pending">PENDING VERIFICATION</div>
            </div>
            <div className="invoice-grid">
              <div><span>Invoice ID</span><strong>{invoiceId}</strong></div>
              <div><span>Client</span><strong>{form.name}</strong></div>
              <div><span>Email</span><strong>{form.email}</strong></div>
              <div><span>Project</span><strong>{form.project}</strong></div>
              <div><span>Service</span><strong>{form.service}</strong></div>
              <div><span>Amount</span><strong>{form.amount} USDT</strong></div>
              <div><span>Network</span><strong>{network}</strong></div>
              <div><span>Payment method</span><strong>USDT Crypto</strong></div>
            </div>
            <div className="invoice-tx"><span>Transaction Hash</span><p>{form.txid}</p></div>
            <p className="invoice-footer-text">Payment verification and automated email receipts will be activated through the secure server-side integration.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Payment;
