const RECEIVING_WALLET = '0x1483393Cabbc486fe15B2fD067Bf91A41fc17a1a'.toLowerCase();
const TRON_RECEIVING_WALLET = 'TKYwnabAbfg9Tv7TVV7BCMk6indjuzeV32';
const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const BSC_RPC_URL = process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/';
const TRONGRID_URL = 'https://api.trongrid.io';
const TRON_USDT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

const NETWORKS = {
  'ERC-20': { chainId: '1', usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6, provider: 'etherscan' },
  'BEP-20': { chainId: '56', usdt: '0x55d398326f99059ff775485246999027b3197955', decimals: 18, provider: 'bsc-rpc' },
  'TRC-20': { usdt: TRON_USDT, decimals: 6, provider: 'trongrid' },
};

function topicAddress(address) { return `0x${address.toLowerCase().replace(/^0x/, '').padStart(64, '0')}`; }
function formatUnits(raw, decimals) { const negative = raw < 0n; const value = negative ? -raw : raw; const base = 10n ** BigInt(decimals); const whole = value / base; const fraction = (value % base).toString().padStart(decimals, '0').replace(/0+$/, ''); return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`; }
function parseUnits(value, decimals) { const text = String(value).trim(); if (!/^\d+(\.\d+)?$/.test(text)) throw new Error('Invalid amount'); const [whole, fraction = ''] = text.split('.'); if (fraction.length > decimals) throw new Error('Too many decimal places'); return BigInt(whole) * (10n ** BigInt(decimals)) + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals)); }

async function rpcCall(method, params = []) {
  const response = await fetch(BSC_RPC_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) });
  if (!response.ok) throw new Error(`BNB Chain RPC HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error.message || 'BNB Chain RPC error');
  return payload.result;
}
async function getBscReceipt(txid) { return rpcCall('eth_getTransactionReceipt', [txid]); }
async function getBscLatestBlock() { return rpcCall('eth_blockNumber'); }

async function getErcReceipt(txid, apiKey) {
  const url = new URL('https://api.etherscan.io/v2/api');
  url.searchParams.set('chainid', '1'); url.searchParams.set('module', 'proxy'); url.searchParams.set('action', 'eth_getTransactionReceipt'); url.searchParams.set('txhash', txid); url.searchParams.set('apikey', apiKey);
  const response = await fetch(url); const payload = await response.json(); const receipt = payload?.result;
  if (!receipt || typeof receipt !== 'object') { const apiMessage = typeof payload?.result === 'string' ? payload.result : ''; if (/paid|plan|subscription|unsupported/i.test(apiMessage)) { const error = new Error('ERC-20 verification is not available with the current blockchain API plan.'); error.statusCode = 503; throw error; } }
  return receipt;
}
async function getErcLatestBlock(apiKey) { const url = new URL('https://api.etherscan.io/v2/api'); url.searchParams.set('chainid', '1'); url.searchParams.set('module', 'proxy'); url.searchParams.set('action', 'eth_blockNumber'); url.searchParams.set('apikey', apiKey); const response = await fetch(url); const payload = await response.json(); return payload?.result || null; }

async function verifyTronPayment(txid, amount) {
  const apiKey = process.env.TRONGRID_API_KEY;
  if (!apiKey) { const error = new Error('TRC-20 verifier is not configured yet. Add TRONGRID_API_KEY in Vercel.'); error.statusCode = 503; throw error; }

  let fingerprint = '';
  for (let page = 0; page < 5; page += 1) {
    const url = new URL(`${TRONGRID_URL}/v1/accounts/${TRON_RECEIVING_WALLET}/transactions/trc20`);
    url.searchParams.set('only_confirmed', 'true');
    url.searchParams.set('only_to', 'true');
    url.searchParams.set('limit', '200');
    url.searchParams.set('contract_address', TRON_USDT);
    url.searchParams.set('order_by', 'block_timestamp,desc');
    if (fingerprint) url.searchParams.set('fingerprint', fingerprint);

    const response = await fetch(url, { headers: { 'TRON-PRO-API-KEY': apiKey } });
    if (!response.ok) { const error = new Error(`TRON verification service returned HTTP ${response.status}.`); error.statusCode = 503; throw error; }
    const payload = await response.json();
    const match = (payload?.data || []).find((item) => String(item.transaction_id || '').toLowerCase() === txid.toLowerCase());

    if (match) {
      if (match.to !== TRON_RECEIVING_WALLET) return { verified: false, statusCode: 400, message: 'This TRC-20 transaction was not sent to the HashHype Labs wallet.' };
      if (match.token_info?.address !== TRON_USDT) return { verified: false, statusCode: 400, message: 'This transaction is not USDT on TRON.' };
      const receivedRaw = BigInt(String(match.value || '0'));
      const expectedRaw = parseUnits(amount, 6);
      if (receivedRaw < expectedRaw) return { verified: false, statusCode: 400, message: `Transaction found, but only ${formatUnits(receivedRaw, 6)} USDT was sent. Expected at least ${amount} USDT.` };
      return { verified: true, amount: formatUnits(receivedRaw, 6), network: 'TRC-20', confirmations: 'Confirmed', txid };
    }

    fingerprint = payload?.meta?.fingerprint || '';
    if (!fingerprint) break;
  }

  return { verified: false, statusCode: 404, message: 'TRC-20 transaction not found or not confirmed yet. Please wait and try again.' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ verified: false, message: 'Method not allowed.' });
  try {
    const { txid, network, amount } = req.body || {};
    if (!NETWORKS[network]) return res.status(400).json({ verified: false, message: 'Unsupported network.' });
    if (network === 'TRC-20') {
      if (!/^[a-fA-F0-9]{64}$/.test(txid || '')) return res.status(400).json({ verified: false, message: 'Please enter a valid TRON transaction hash.' });
      try { const expectedRaw = parseUnits(amount, 6); if (expectedRaw <= 0n) throw new Error(); } catch { return res.status(400).json({ verified: false, message: 'Invalid payment amount.' }); }
      const result = await verifyTronPayment(txid, amount);
      return res.status(result.verified ? 200 : (result.statusCode || 400)).json(result);
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(txid || '')) return res.status(400).json({ verified: false, message: 'Please enter a valid transaction hash.' });
    const config = NETWORKS[network];
    let expectedRaw; try { expectedRaw = parseUnits(amount, config.decimals); if (expectedRaw <= 0n) throw new Error('Invalid amount'); } catch { return res.status(400).json({ verified: false, message: 'Invalid payment amount.' }); }

    let receipt; let latestBlockHex;
    if (config.provider === 'bsc-rpc') { [receipt, latestBlockHex] = await Promise.all([getBscReceipt(txid), getBscLatestBlock()]); }
    else { const apiKey = process.env.ETHERSCAN_API_KEY; if (!apiKey) return res.status(500).json({ verified: false, message: 'ERC-20 payment verifier is not configured yet.' }); [receipt, latestBlockHex] = await Promise.all([getErcReceipt(txid, apiKey), getErcLatestBlock(apiKey)]); }

    if (!receipt || typeof receipt !== 'object' || !receipt.blockNumber) return res.status(404).json({ verified: false, message: 'Transaction not found or still pending. Please wait for confirmation and try again.' });
    if (receipt.status !== '0x1') return res.status(400).json({ verified: false, message: 'This transaction failed on-chain.' });

    const expectedRecipientTopic = topicAddress(RECEIVING_WALLET).toLowerCase();
    const matchingTransfers = (receipt.logs || []).filter((log) => { const topics = log.topics || []; return log.address?.toLowerCase() === config.usdt && topics[0]?.toLowerCase() === TRANSFER_TOPIC && topics[2]?.toLowerCase() === expectedRecipientTopic; });
    if (!matchingTransfers.length) return res.status(400).json({ verified: false, message: `No USDT transfer to the HashHype Labs wallet was found in this ${network} transaction.` });

    const receivedRaw = matchingTransfers.reduce((sum, log) => sum + BigInt(log.data || '0x0'), 0n);
    if (receivedRaw < expectedRaw) return res.status(400).json({ verified: false, message: `Transaction found, but only ${formatUnits(receivedRaw, config.decimals)} USDT was sent. Expected at least ${amount} USDT.` });

    const latestBlock = latestBlockHex ? parseInt(latestBlockHex, 16) : null; const txBlock = parseInt(receipt.blockNumber, 16);
    const confirmations = Number.isFinite(latestBlock) && Number.isFinite(txBlock) ? Math.max(1, latestBlock - txBlock + 1) : 1;
    return res.status(200).json({ verified: true, message: 'Payment verified successfully.', amount: formatUnits(receivedRaw, config.decimals), network, confirmations, txid });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(error.statusCode || 500).json({ verified: false, message: error.statusCode ? error.message : 'Blockchain verification is temporarily unavailable. Please try again.' });
  }
}
