const ADMIN_EMAIL = 'emran.huk2016@gmail.com';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ sent: false, message: 'Method not allowed.' });
  }

  try {
    const {
      name,
      email,
      project,
      service,
      amount,
      network,
      invoiceId,
      txid,
      explorerUrl,
    } = req.body || {};

    if (!email || !invoiceId || !txid || !amount || !network) {
      return res.status(400).json({ sent: false, message: 'Missing receipt information.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      return res.status(503).json({
        sent: false,
        message: 'Receipt email is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel.',
      });
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      project: escapeHtml(project),
      service: escapeHtml(service),
      amount: escapeHtml(amount),
      network: escapeHtml(network),
      invoiceId: escapeHtml(invoiceId),
      txid: escapeHtml(txid),
      explorerUrl: escapeHtml(explorerUrl),
    };

    const html = `
      <div style="background:#07100c;padding:32px;font-family:Arial,sans-serif;color:#ffffff">
        <div style="max-width:680px;margin:0 auto;background:#0d1713;border:1px solid #1c3c30;border-radius:22px;overflow:hidden">
          <div style="height:8px;background:#00ffae"></div>
          <div style="padding:32px">
            <div style="color:#00ffae;font-size:12px;font-weight:700;letter-spacing:1.8px">HASHHYPE LABS</div>
            <h1 style="margin:10px 0 6px;font-size:30px;color:#ffffff">Payment Verified ✓</h1>
            <p style="margin:0 0 28px;color:#9eb5ac;line-height:1.6">Your USDT payment has been successfully verified on-chain.</p>

            <div style="background:#0a120f;border-radius:16px;padding:22px;margin-bottom:24px">
              <table style="width:100%;border-collapse:collapse;color:#ffffff;font-size:14px">
                <tr><td style="padding:8px 0;color:#7f938b">Invoice</td><td style="padding:8px 0;text-align:right;font-weight:700">${safe.invoiceId}</td></tr>
                <tr><td style="padding:8px 0;color:#7f938b">Client</td><td style="padding:8px 0;text-align:right;font-weight:700">${safe.name}</td></tr>
                <tr><td style="padding:8px 0;color:#7f938b">Project</td><td style="padding:8px 0;text-align:right;font-weight:700">${safe.project}</td></tr>
                <tr><td style="padding:8px 0;color:#7f938b">Service</td><td style="padding:8px 0;text-align:right;font-weight:700">${safe.service}</td></tr>
                <tr><td style="padding:8px 0;color:#7f938b">Amount</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#00ffae">${safe.amount} USDT</td></tr>
                <tr><td style="padding:8px 0;color:#7f938b">Network</td><td style="padding:8px 0;text-align:right;font-weight:700">${safe.network}</td></tr>
              </table>
            </div>

            <div style="font-size:12px;color:#7f938b;margin-bottom:6px">TRANSACTION HASH</div>
            <div style="font-family:monospace;font-size:12px;word-break:break-all;color:#d9e7e1;background:#08100d;padding:14px;border-radius:10px">${safe.txid}</div>

            <a href="${safe.explorerUrl}" style="display:inline-block;margin-top:22px;padding:13px 18px;background:#00ffae;color:#062018;text-decoration:none;font-weight:700;border-radius:10px">View Transaction</a>

            <p style="margin:28px 0 0;color:#7f938b;font-size:12px;line-height:1.6">hashhypelabs.com • Telegram: @emranrx</p>
          </div>
        </div>
      </div>`;

    const send = async (to, subject) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to,
          subject,
          html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Email provider rejected the request.');
      }
      return data;
    };

    await Promise.all([
      send([email], `HashHype Labs Payment Receipt • ${invoiceId}`),
      send([ADMIN_EMAIL], `Payment Received • ${invoiceId} • ${amount} USDT`),
    ]);

    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error('Receipt email error:', error);
    return res.status(500).json({ sent: false, message: error.message || 'Unable to send receipt email.' });
  }
}
