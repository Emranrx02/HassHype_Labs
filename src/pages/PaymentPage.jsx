import React from 'react';
import Payment from '../components/Payment';
import '../components/Payment.css';

function PaymentPage() {
  return (
    <div className="payment-page">
      <header className="payment-page-header">
        <a href="/" className="payment-page-brand" aria-label="Back to HashHype Labs home">
          HashHype<span>Labs</span>
        </a>
        <a href="/" className="payment-page-back">← Back to website</a>
      </header>
      <Payment />
    </div>
  );
}

export default PaymentPage;
