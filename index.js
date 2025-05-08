require('dotenv').config();
const axios = require('axios');
const { ethers } = require('ethers');

const API_BASE_URL = 'https://priortestnet.xyz/api';
const JUMLAH_SWAP = 5;
const JUMLAH_TOKEN_SWAP = '0.05';
const KONTRAK_PRIOR = '0xefc91c5a51e8533282486fa2601dffe0a0b16edb';
const SALDO_MINIMUM_PRIOR = '0.25';
const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');

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

const headers = {
  'accept': '*/*',
  'content-type': 'application/json',
  'user-agent': 'Mozilla/5.0'
};

function buatWallet(privateKey) {
  return new ethers.Wallet(privateKey, provider);
}

async function cekSaldoPrior(walletAddress) {
  const kontrak = new ethers.Contract(
    KONTRAK_PRIOR,
    ['function balanceOf(address) view returns (uint256)'],
    provider
  );
  const saldo = await kontrak.balanceOf(walletAddress);
  return parseFloat(ethers.formatUnits(saldo, 18));
}

async function klaimFaucet(address) {
  try {
    const res = await axios.post(`${API_BASE_URL}/faucet/claim`, { address }, { headers });
    console.log(`✅ Faucet berhasil diklaim untuk alamat: ${address}`);
    // Jeda 2-3 detik setelah klaim faucet
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 1000) + 2000)); // Jeda acak 2-3 detik
    return true;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message.includes('24 hours')) {
      console.log(`⚠️ Faucet sudah diklaim 24 jam terakhir untuk ${address}`);
      return false;
    }
    throw error;
  }
}

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
  
  // Tampilkan detail transaksi yang diterima dari API
  tampilkanDetailTransaksi(res.data); 
}

async function prosesWallet(walletData, index, total) {
  const wallet = buatWallet(walletData.privateKey);
  console.log(`\n🔐 Menjalankan Wallet ${index + 1} dari ${total} - ${wallet.address}`);
  const saldoPrior = await cekSaldoPrior(wallet.address);

  // Klaim faucet hanya jika saldo PRIOR kurang dari minimum, jika gagal tetap lakukan swap
  if (saldoPrior < parseFloat(SALDO_MINIMUM_PRIOR)) {
    const faucetBerhasil = await klaimFaucet(wallet.address);
    if (faucetBerhasil) {
      console.log('⏳ Faucet berhasil, melanjutkan swap...');
    } else {
      console.log('⚠️ Faucet gagal, melanjutkan swap...');
    }
  } else {
    console.log(`💰 Saldo PRIOR mencukupi untuk melakukan swap.`);
  }

  // Eksekusi swap tanpa jeda antara swap
  for (let i = 0; i < JUMLAH_SWAP; i++) {
    await swapToken(wallet.address);
  }

  // Menambahkan jeda acak antara 5-10 detik setelah memproses setiap wallet
  const delay = Math.floor(Math.random() * 5000) + 5000; // 5 detik hingga 10 detik
  console.log(`⏳ Menunggu selama ${delay / 1000} detik sebelum melanjutkan ke wallet berikutnya...`);
  await new Promise(r => setTimeout(r, delay));
}

function tampilkanHitungMundur(ms) {
  const interval = 1000;
  let sisa = ms / 1000;

  const timer = setInterval(() => {
    const jam = Math.floor(sisa / 3600);
    const menit = Math.floor((sisa % 3600) / 60);
    const detik = Math.floor(sisa % 60);
    process.stdout.write(`\r⏳ Menunggu: ${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`);
    sisa--;
    if (sisa < 0) {
      clearInterval(timer);
      process.stdout.write('\n');
    }
  }, interval);

  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mulaiBot() {
  while (true) {
    console.log(`\n🚀 Memulai siklus swap baru`);
    for (let i = 0; i < WALLETS.length; i++) {
      await prosesWallet(WALLETS[i], i, WALLETS.length);
      console.log('➡️ Lanjut ke wallet berikutnya...');
      await new Promise(r => setTimeout(r, 10000)); // Menunggu 10 detik antar wallet
    }
    console.log('🕒 Menunggu 24 jam untuk siklus berikutnya...');
    await tampilkanHitungMundur(24 * 60 * 60 * 1000); // Menunggu 24 jam
  }
}

mulaiBot();
