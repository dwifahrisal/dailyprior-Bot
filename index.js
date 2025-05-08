require('dotenv').config();
const axios = require('axios');
const { ethers } = require('ethers');

// Daftar User-Agent
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.101 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.102 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.119 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.110 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.94 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.87 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5467.78 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5525.91 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5581.124 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5634.82 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5689.102 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5739.125 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5792.112 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5845.122 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5896.131 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.5948.141 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6003.150 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6054.165 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6107.173 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6159.182 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6210.192 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6262.201 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6314.212 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6365.223 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6417.234 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6469.245 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6520.256 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6571.267 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.6622.278 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6673.289 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6724.300 Safari/537.36',
];

// Fungsi untuk memilih user-agent acak
function getRandomUserAgent() {
  const randomIndex = Math.floor(Math.random() * USER_AGENTS.length);
  return USER_AGENTS[randomIndex];
}

// ASCII Banner
console.log(`
	+=====================================================================+
	|                                                                     |
	|   _ __  _ __   ___ ___  _ __    ______ _ __   ,___ ____ __  ______  |
	|  ( /  )( /  ) ( / /  ()( /  )  (  /   ( /  ) /   /( /( /  )(  /     |
	|   /--'  /--<   / /   /  /--<     /--   /  / /  __  /  /  /   /--    |
	|  /     /   \__/_(___/  /   \_  (/____//  (_(___/ _/_ /  (_ (/____/  |
	|                                                                     |
	+=====================================================================+
                       🚀 PRIOR SWAP ENGINE V 2.0 update
        =======================================================================
`);

// Konfigurasi
const API_BASE_URL = 'https://priortestnet.xyz/api';
const JUMLAH_SWAP = 5;
const JUMLAH_TOKEN_SWAP = '0.05';
const KONTRAK_PRIOR = '0xefc91c5a51e8533282486fa2601dffe0a0b16edb';
const SALDO_MINIMUM_PRIOR = '0.25';
const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');

// Ambil Wallet
function ambilWallet() {
  if (process.env.WALLETS) {
    return JSON.parse(process.env.WALLETS);
  }
  if (process.env.WALLET_ADDRESS && process.env.PRIVATE_KEY) {
    return [{
      address: process.env.WALLET_ADDRESS,
      privateKey: process.env.PRIVATE_KEY
    }];
  }
  throw new Error('Wallet belum dikonfigurasi di file .env');
}

const WALLETS = ambilWallet();

// Headers untuk request
const headers = {
  'accept': '*/*',
  'content-type': 'application/json',
};

// Fungsi untuk klaim faucet
async function klaimFaucet(address) {
  const headersWithUA = {
    ...headers,
    'user-agent': getRandomUserAgent() // Pilih user-agent acak untuk setiap klaim
  };

  console.log(`Menggunakan User-Agent: ${headersWithUA['user-agent']}`); // Tampilkan User-Agent yang digunakan

  try {
    const res = await axios.post(`${API_BASE_URL}/faucet/claim`, { address }, { headers: headersWithUA });
    console.log(`✅ Faucet berhasil diklaim untuk alamat: ${address}`);
    return res.data; // Mengembalikan data yang relevan (termasuk poin)
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message.includes('24 hours')) {
      console.log(`⚠️ Faucet sudah diklaim 24 jam terakhir untuk ${address}`);
      return null;
    }
    throw error;
  }
}

// Fungsi untuk swap token
async function swapToken(address) {
  const txHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const res = await axios.post(`${API_BASE_URL}/swap`, {
    address,
    amount: JUMLAH_TOKEN_SWAP,
    tokenFrom: "PRIOR",
    tokenTo: "USDC",
    txHash
  }, { headers });
  console.log(`🔄 Swap berhasil untuk wallet: ${address} ✅`);
  return res.data; // Mengembalikan detail transaksi
}

// Fungsi untuk menampilkan detail transaksi dan poin
function tampilkanDetailTransaksi(data) {
  console.log('\n=== Detail Transaksi ===');
  console.log(`ID Transaksi: ${data.transaction.id}`);
  console.log(`Tipe: ${data.transaction.type}`);
  console.log(`Jumlah: ${data.transaction.amount} ${data.transaction.tokenFrom} ke ${data.transaction.tokenTo}`);
  console.log(`Poin Didapat: ${data.pointsEarned}`);
  console.log(`Status: ${data.transaction.status}`);
  console.log(`Waktu: ${new Date(data.transaction.timestamp).toLocaleString()}`);
  console.log(`TX Hash: ${data.transaction.txHash}`);
  console.log('\n=== Statistik Pengguna ===');
  console.log(`ID Pengguna: ${data.user.id}`);
  console.log(`Alamat: ${data.user.address}`);
  console.log(`Total Poin: ${data.user.totalPoints}`);
  console.log(`Poin Harian: ${data.user.dailyPoints}`);
  console.log(`Faucet Terakhir: ${data.user.lastFaucetClaim ? new Date(data.user.lastFaucetClaim).toLocaleString() : 'Belum Pernah'}`);
  console.log('========================\n');
}

// Fungsi untuk proses wallet
async function prosesWallet(walletData, index, total) {
  const wallet = new ethers.Wallet(walletData.privateKey, provider);
  console.log(`\n🔐 Menjalankan Wallet ${index + 1} dari ${total} - ${wallet.address}`);
  
  const faucetData = await klaimFaucet(wallet.address); // Klaim faucet terlebih dahulu
  
  // Jika faucet berhasil, tampilkan detail poin
  if (faucetData) {
    tampilkanDetailTransaksi(faucetData);
  }

  // Eksekusi swap setelah klaim faucet berhasil atau gagal
  for (let i = 0; i < JUMLAH_SWAP; i++) {
    const swapData = await swapToken(wallet.address);
    tampilkanDetailTransaksi(swapData); // Tampilkan detail setelah swap
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (6000 - 3000) + 5000))); // Jeda 3-6 detik
  }
}

// Fungsi untuk memulai bot
async function mulaiBot() {
  while (true) {
    console.log(`\n🚀 Memulai siklus swap baru`);
    for (let i = 0; i < WALLETS.length; i++) {
      await prosesWallet(WALLETS[i], i, WALLETS.length);
      console.log('➡️ Lanjut ke wallet berikutnya...');
      await new Promise(r => setTimeout(r, 10000)); // Menunggu 10 detik antar wallet
    }
    console.log('🕒 Menunggu 24 jam untuk siklus berikutnya...');
    await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000)); // Menunggu 24 jam
  }
}

mulaiBot();
