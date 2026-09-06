const RECEIVING_WALLET = '0x1483393Cabbc486fe15B2fD067Bf91A41fc17a1a'.toLowerCase();
const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const NETWORKS = {
  'ERC-20': {
    chainId: '1',
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  },
  'BEP-20': {
    chainId: '56',
    usdt: '0x55d398326f99059ff775485246999027b3197955',
  },
};

function topicAddress(address) {
  return `0x${address.toLowerCase().replace(/^0x/, '').padStart(64, '0')}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ verified: false, message: 'Method not allowed.' });

  try {
    const { txid, network, amount } = req.body || {};
    if (!/^0x[a-fA-F0-9]{64}$/.test(txid || '')) return res.status(400).json({ verified: false, message: 'Please enter a valid transaction hash.' });
    if (!NETWORKS[network]) return res.status(400).json({ verified: false, message: 'Unsupported network.' });

    const expectedAmount = Number(amount);
    if (!Number.isFinite(expectedAmount) || expectedAmount <= 0) return res.status(400).json({ verified: false, message: 'Invalid payment amount.' });

    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!apiKey) return res.status(500).json({ verified: false, message: 'Payment verifier is not configured yet.' });

    const config = NETWORKS[network];
    const url = new URL('https://api.etherscan.io/v2/api');
    url.searchParams.set('chainid', config.chainId);
    url.searchParams.set('module', 'proxy');
    url.searchParams.set('action', 'eth_getTransactionReceipt');
    url.searchParams.set('txhash', txid);
    url.searchParams.set('apikey', apiKey);

    const response = await fetch(url);
    const payload = await response.json();
    const receipt = payload?.result;

    if (!receipt || typeof receipt !== 'object' || !receipt.blockNumber) return res.status(404).json({ verified: false, message: 'Transaction not found or still pending. Please wait for confirmation and try again.' });
    if (receipt.status !== '0x1') return res.status(400).json({ verified: false, message: 'This transaction failed on-chain.' });

    const expectedRecipientTopic = topicAddress(RECEIVING_WALLET).toLowerCase();
    const matchingTransfers = (receipt.logs || []).filter((log) => {
      const topics = log.topics || [];
      return log.address?.toLowerCase() === config.usdt && topics[0]?.toLowerCase() === TRANSFER_TOPIC && topics[2]?.toLowerCase() === expectedRecipientTopic;
    });

    if (!matchingTransfers.length) return res.status(400).json({ verified: false, message: `No USDT transfer to the HashHype Labs wallet was found in this ${network} transaction.` });

    const receivedRaw = matchingTransfers.reduce((sum, log) => sum + BigInt(log.data || '0x0'), 0n);
    const received = Number(receivedRaw) / 1_000_000;
    const tolerance = 0.000001;

    if (received + tolerance < expectedAmount) return res.status(400).json({ verified: false, message: `Transaction found, but only ${received.toFixed(6)} USDT was sent. Expected at least ${expectedAmount} USDT.` });

    const blockUrl = new URL('https://api.etherscan.io/v2/api');
    blockUrl.searchParams.set('chainid', config.chainId);
    blockUrl.searchParams.set('module', 'proxy');
    blockUrl.searchParams.set('action', 'eth_blockNumber');
    blockUrl.searchParams.set('apikey', apiKey);
    const blockResponse = await fetch(blockUrl);
    const blockPayload = await blockResponse.json();
    const latestBlock = blockPayload?.result ? parseInt(blockPayload.result, 16) : null;
    const txBlock = parseInt(receipt.blockNumber, 16);
    const confirmations = latestBlock && txBlock ? Math.max(1, latestBlock - txBlock + 1) : 1;

    return res.status(200).json({ verified: true, message: 'Payment verified successfully.', amount: received.toFixed(6).replace(/\.0+$/, ''), network, confirmations, txid });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ verified: false, message: 'Blockchain verification is temporarily unavailable. Please try again.' });
  }
}
