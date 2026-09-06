import React, { useMemo, useState } from 'react';
import './Payment.css';

const WALLET_ADDRESS = '0x1483393Cabbc486fe15B2fD067Bf91A41fc17a1a';

function Payment() {
  const [network, setNetwork] = useState('BEP-20');
  const [copied, setCopied] = useState(false);
  const [verification, setVerification] = useState({ status: 'idle', message: '', details: null });
  const [form, setForm] = useState({ name: '', email: '', project: '', service: '', amount: '', txid: '' });

  const invoiceId = useMemo(() => `HHL-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`, []);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(WALLET_ADDRESS)}`;

  const copyWallet = async () => {
    await navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    setVerification({ status: 'checking', message: 'Checking your transaction on the blockchain…', details: null });

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, network, invoiceId }),
      });
      const data = await response.json();
      if (!response.ok || !data.verified) throw new Error(data.message || 'Payment could not be verified.');
      setVerification({ status: 'verified', message: 'Verified! Your USDT payment was found on-chain.', details: data });
    } catch (error) {
      setVerification({ status: 'failed', message: error.message || 'Unable to verify this transaction.', details: null });
    }
  };

  const explorer = network === 'BEP-20' ? 'https://bscscan.com/tx/' : 'https://etherscan.io/tx/';

  return (
    <section className="payment-section" id="payment">
      <div className="payment-shell" data-aos="fade-up">
        <div className="payment-heading">
          <span className="payment-kicker">HASHHYPE LABS • SECURE CHECKOUT</span>
          <h2>Pay HashHype Labs</h2>
          <p>Pay with USDT, paste your TxID, and we will automatically verify the transfer on-chain.</p>
        </div>

        <div className="payment-layout">
          <div className="payment-card payment-details-card">
            <div className="payment-card-top"><div><span className="payment-label">PAY WITH</span><h3>USDT</h3></div><span className="payment-status-dot">On-chain Payment</span></div>
            <label className="payment-label">Select network</label>
            <div className="network-tabs">{['BEP-20', 'ERC-20'].map((item) => <button type="button" key={item} className={network === item ? 'network-tab active' : 'network-tab'} onClick={() => { setNetwork(item); setVerification({ status: 'idle', message: '', details: null }); }}>{item}</button>)}</div>
            <div className="wallet-box"><div><span className="payment-label">USDT {network} wallet</span><p>{WALLET_ADDRESS}</p></div><button type="button" className="copy-wallet-btn" onClick={copyWallet}>{copied ? 'Copied ✓' : 'Copy'}</button></div>

            <div className="wallet-qr-wrap">
              <div className="wallet-qr-card">
                <img src={qrUrl} alt={`HashHype Labs USDT ${network} wallet QR code`} />
              </div>
              <div className="wallet-qr-copy">
                <span className="payment-label">SCAN TO PAY</span>
                <strong>USDT • {network}</strong>
                <p>Open your wallet, scan this QR, then confirm the selected network before sending.</p>
              </div>
            </div>

            <div className="payment-warning"><span>!</span><p>Only send USDT using the selected network. The verifier checks the network, USDT contract, destination wallet, transaction success and amount.</p></div>
            <div className="payment-company"><div><span>Merchant</span><strong>HashHype Labs</strong></div><div><span>Website</span><strong>hashhypelabs.com</strong></div><div><span>Support</span><strong>@emranrx</strong></div><div><span>Receipt</span><strong>USD / USDT</strong></div></div>
          </div>

          <form className="payment-card payment-form" onSubmit={submitPayment}>
            <div className="payment-form-title"><span>Payment details</span><small>{invoiceId}</small></div>
            <div className="payment-field-grid"><label>Client name<input name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label></div>
            <label>Project name<input name="project" value={form.project} onChange={update} placeholder="Project / company name" required /></label>
            <label>Service<select name="service" value={form.service} onChange={update} required><option value="">Choose a service</option><option>Community Management</option><option>Web3 Marketing & Growth</option><option>Influencer / KOL Marketing</option><option>Bot Development & Automation</option><option>Website Development</option><option>Content & Branding</option><option>Other / Custom Service</option></select></label>
            <div className="payment-field-grid"><label>Amount<div className="amount-input"><input name="amount" type="number" min="1" step="0.01" value={form.amount} onChange={update} placeholder="500" required /><span>USDT</span></div></label><label>Network<input value={network} readOnly /></label></div>
            <label>Transaction Hash / TxID<input name="txid" value={form.txid} onChange={update} placeholder="0x…" pattern="0x[a-fA-F0-9]{64}" title="Enter a valid 66-character transaction hash" required /></label>
            <button className="payment-submit" type="submit" disabled={verification.status === 'checking'}>{verification.status === 'checking' ? 'Verifying on Blockchain…' : 'Verify My Payment →'}</button>
            {verification.status !== 'idle' && <div className={`verification-message ${verification.status}`}><strong>{verification.status === 'verified' ? '✓ VERIFIED PAYMENT' : verification.status === 'checking' ? '⟳ VERIFYING' : '✕ NOT VERIFIED'}</strong><p>{verification.message}</p></div>}
          </form>
        </div>

        {verification.status === 'verified' && <div className="invoice-preview verified-receipt" data-aos="zoom-in">
          <div className="invoice-success">✓ VERIFIED ON BLOCKCHAIN</div>
          <div className="invoice-header"><div><span>HASHHYPE LABS</span><h3>Payment Receipt</h3></div><div className="invoice-pending invoice-verified">PAID • VERIFIED</div></div>
          <div className="invoice-grid"><div><span>Invoice ID</span><strong>{invoiceId}</strong></div><div><span>Client</span><strong>{form.name}</strong></div><div><span>Email</span><strong>{form.email}</strong></div><div><span>Project</span><strong>{form.project}</strong></div><div><span>Service</span><strong>{form.service}</strong></div><div><span>Amount Received</span><strong>{verification.details?.amount || form.amount} USDT</strong></div><div><span>Network</span><strong>{network}</strong></div><div><span>Confirmations</span><strong>{verification.details?.confirmations ?? 'Confirmed'}</strong></div></div>
          <div className="invoice-tx"><span>Verified Transaction</span><p>{form.txid}</p><a href={`${explorer}${form.txid}`} target="_blank" rel="noopener noreferrer">View on block explorer ↗</a></div>
          <p className="invoice-footer-text">This receipt was generated after validating the USDT transfer to the HashHype Labs receiving wallet.</p>
        </div>}
      </div>
    </section>
  );
}

export default Payment;
