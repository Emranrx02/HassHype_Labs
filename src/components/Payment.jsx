import React, { useMemo, useState } from 'react';
import './Payment.css';

const WALLET_ADDRESS = '0x1483393Cabbc486fe15B2fD067Bf91A41fc17a1a';

function Payment() {
  const [network, setNetwork] = useState('BEP-20');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [verification, setVerification] = useState({ status: 'idle', message: '', details: null });
  const [showSuccess, setShowSuccess] = useState(false);
  const [verifiedTxid, setVerifiedTxid] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', project: '', service: '', amount: '', txid: '' });

  const invoiceId = useMemo(() => `HHL-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`, []);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(WALLET_ADDRESS)}`;

  const copyWallet = async () => { await navigator.clipboard.writeText(WALLET_ADDRESS); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  const extractTxid = (value) => { const match = String(value || '').trim().match(/0x[a-fA-F0-9]{64}/); return match ? match[0] : ''; };

  const emailReceipt = async ({ txid, details }) => {
    setEmailStatus('sending');
    try {
      const response = await fetch('/api/send-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, project: form.project, service: form.service, amount: details?.amount || form.amount, network, invoiceId, txid, explorerUrl: `${network === 'BEP-20' ? 'https://bscscan.com/tx/' : 'https://etherscan.io/tx/'}${txid}` }) });
      const data = await response.json();
      if (!response.ok || !data.sent) throw new Error(data.message || 'Email not sent');
      setEmailStatus('sent');
    } catch (error) { console.error('Receipt email error:', error); setEmailStatus('failed'); }
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    const txid = extractTxid(form.txid);
    if (!txid) { setVerification({ status: 'failed', message: 'Paste a valid TxID or a BscScan / Etherscan transaction URL.', details: null }); return; }
    setVerification({ status: 'checking', message: 'Checking your transaction on the blockchain…', details: null }); setEmailStatus('idle');
    try {
      const response = await fetch('/api/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, txid, network, invoiceId }) });
      const data = await response.json();
      if (!response.ok || !data.verified) throw new Error(data.message || 'Payment could not be verified.');
      setVerifiedTxid(txid); setVerification({ status: 'verified', message: 'Verified! Your USDT payment was found on-chain.', details: data }); setShowSuccess(true); emailReceipt({ txid, details: data });
    } catch (error) { setVerification({ status: 'failed', message: error.message || 'Unable to verify this transaction.', details: null }); }
  };

  const explorer = network === 'BEP-20' ? 'https://bscscan.com/tx/' : 'https://etherscan.io/tx/';
  const downloadReceiptImage = () => {
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 1500; const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#07100c'; ctx.fillRect(0, 0, canvas.width, canvas.height); const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); grad.addColorStop(0, '#00ffae'); grad.addColorStop(1, '#0aa77a'); ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, 18);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 54px Arial'; ctx.fillText('HashHype Labs', 90, 120); ctx.fillStyle = '#00ffae'; ctx.font = '700 26px Arial'; ctx.fillText('BLOCKCHAIN PAYMENT RECEIPT', 90, 180);
    ctx.fillStyle = '#0d1713'; ctx.strokeStyle = '#1d3b30'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(70, 240, 1060, 1040, 34); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#00ffae'; ctx.beginPath(); ctx.arc(150, 330, 42, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#062018'; ctx.font = '700 42px Arial'; ctx.fillText('✓', 132, 346);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 42px Arial'; ctx.fillText('PAID • VERIFIED', 220, 342); ctx.fillStyle = '#9eb5ac'; ctx.font = '400 24px Arial'; ctx.fillText('Verified on blockchain by HashHype Labs', 220, 382);
    const rows = [['Invoice ID', invoiceId], ['Client', form.name], ['Project', form.project], ['Service', form.service], ['Amount', `${verification.details?.amount || form.amount} USDT`], ['Network', network], ['Confirmations', String(verification.details?.confirmations ?? 'Confirmed')]];
    let y = 470; rows.forEach(([label, value]) => { ctx.fillStyle = '#73877f'; ctx.font = '600 22px Arial'; ctx.fillText(label.toUpperCase(), 120, y); ctx.fillStyle = '#ffffff'; ctx.font = '700 29px Arial'; ctx.fillText(String(value).slice(0, 52), 120, y + 40); y += 105; });
    ctx.fillStyle = '#73877f'; ctx.font = '600 22px Arial'; ctx.fillText('TRANSACTION HASH', 120, y + 10); ctx.fillStyle = '#d9e7e1'; ctx.font = '600 20px monospace'; ctx.fillText(verifiedTxid.slice(0, 46), 120, y + 50); ctx.fillText(verifiedTxid.slice(46), 120, y + 82); ctx.fillStyle = '#7f938b'; ctx.font = '400 22px Arial'; ctx.fillText('hashhypelabs.com  •  @emranrx', 90, 1395); ctx.fillStyle = '#00ffae'; ctx.font = '700 22px Arial'; ctx.fillText('Thank you for choosing HashHype Labs.', 90, 1440);
    const link = document.createElement('a'); link.download = `${invoiceId}-HashHypeLabs-Receipt.png`; link.href = canvas.toDataURL('image/png'); link.click();
  };
  const finishPayment = () => { setShowSuccess(false); setVerification({ status: 'idle', message: '', details: null }); setEmailStatus('idle'); setForm({ name: '', email: '', project: '', service: '', amount: '', txid: '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <section className="payment-section" id="payment"><div className="payment-shell" data-aos="fade-up">
    <div className="payment-heading"><span className="payment-kicker">HASHHYPE LABS • SECURE CHECKOUT</span><h2>Pay HashHype Labs</h2><p>Enter your payment details, send USDT, then paste your TxID or transaction link for automatic on-chain verification.</p></div>
    <div className="payment-layout">
      <div className="payment-card payment-details-card">
        <div className="payment-card-top"><div><span className="payment-label">PAY WITH</span><h3>USDT</h3></div><span className="payment-status-dot">On-chain Payment</span></div>
        <label className="payment-label">Select network</label><div className="network-tabs">{['BEP-20', 'ERC-20'].map(item => <button type="button" key={item} className={network === item ? 'network-tab active' : 'network-tab'} onClick={() => { setNetwork(item); setVerification({ status: 'idle', message: '', details: null }); }}>{item}</button>)}</div>
        <div className="wallet-box"><div><span className="payment-label">USDT {network} wallet</span><p>{WALLET_ADDRESS}</p></div><button type="button" className="copy-wallet-btn" onClick={copyWallet}>{copied ? 'Copied ✓' : 'Copy'}</button></div>
        <button type="button" className="mobile-qr-toggle" onClick={() => setShowQr(v => !v)}>{showQr ? 'Hide QR Code ↑' : 'Show QR Code ↓'}</button>
        <div className={`wallet-qr-wrap ${showQr ? 'mobile-qr-open' : ''}`}><div className="wallet-qr-card"><img src={qrUrl} alt={`HashHype Labs USDT ${network} wallet QR code`} /></div><div className="wallet-qr-copy"><span className="payment-label">SCAN TO PAY</span><strong>USDT • {network}</strong><p>Open your wallet, scan this QR, then confirm the selected network before sending.</p></div></div>
        <div className="payment-warning"><span>!</span><p>Only send USDT using the selected network. Double-check the network before confirming your transfer.</p></div><div className="payment-company"><div><span>Merchant</span><strong>HashHype Labs</strong></div><div><span>Website</span><strong>hashhypelabs.com</strong></div><div><span>Support</span><strong>@emranrx</strong></div><div><span>Receipt</span><strong>USD / USDT</strong></div></div>
      </div>
      <form className="payment-card payment-form" onSubmit={submitPayment}>
        <div className="payment-form-title"><span>1. Payment details</span><small>{invoiceId}</small></div><div className="payment-field-grid"><label>Client name<input name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label></div><label>Project name<input name="project" value={form.project} onChange={update} placeholder="Project / company name" required /></label><label>Service<select name="service" value={form.service} onChange={update} required><option value="">Choose a service</option><option>Community Management</option><option>Web3 Marketing & Growth</option><option>Influencer / KOL Marketing</option><option>Bot Development & Automation</option><option>Website Development</option><option>Content & Branding</option><option>Other / Custom Service</option></select></label><div className="payment-field-grid"><label>Amount<div className="amount-input"><input name="amount" type="number" min="1" step="0.01" value={form.amount} onChange={update} placeholder="500" required /><span>USDT</span></div></label><label>Network<input value={network} readOnly /></label></div>
        <div className="mobile-send-hint">2. Send <strong>{form.amount || 'your amount'} USDT</strong> using the payment details below ↓</div>
        <label className="tx-field">3. Transaction Hash or Explorer URL<input name="txid" value={form.txid} onChange={update} placeholder={network === 'BEP-20' ? 'TxID or BscScan link' : 'TxID or Etherscan link'} required /></label><p className="tx-help">After sending, paste the TxID or full explorer transaction link here.</p><button className="payment-submit" type="submit" disabled={verification.status === 'checking'}>{verification.status === 'checking' ? 'Verifying on Blockchain…' : 'Verify My Payment →'}</button>{(verification.status === 'checking' || verification.status === 'failed') && <div className={`verification-message ${verification.status}`}><strong>{verification.status === 'checking' ? '⟳ VERIFYING' : '✕ NOT VERIFIED'}</strong><p>{verification.message}</p></div>}
      </form>
    </div></div>
    {showSuccess && <div className="payment-success-overlay" role="dialog" aria-modal="true" aria-label="Payment verified"><div className="payment-success-modal"><div className="success-check">✓</div><span className="success-kicker">PAYMENT VERIFIED</span><h3>Paid Successfully!</h3><p>Your USDT payment has been confirmed on the blockchain.</p><div className="success-payment-info"><div><span>Amount</span><strong>{verification.details?.amount || form.amount} USDT</strong></div><div><span>Network</span><strong>{network}</strong></div><div><span>Project</span><strong>{form.project}</strong></div><div><span>Invoice</span><strong>{invoiceId}</strong></div></div><div className={`receipt-email-state ${emailStatus}`}>{emailStatus === 'sending' && 'Sending receipt to your email…'}{emailStatus === 'sent' && `✓ Receipt emailed to ${form.email}`}{emailStatus === 'failed' && 'Email receipt is not configured yet, but you can save the receipt below.'}</div><a className="success-explorer-link" href={`${explorer}${verifiedTxid}`} target="_blank" rel="noopener noreferrer">View verified transaction ↗</a><button type="button" className="save-receipt-btn" onClick={downloadReceiptImage}>↓ Save Receipt as Image</button><button type="button" className="success-done-btn" onClick={finishPayment}>Done</button><small>Thank you for choosing HashHype Labs.</small></div></div>}
  </section>;
}
export default Payment;
