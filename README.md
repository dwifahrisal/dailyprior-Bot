# 🤖 Swap Prior 24 Jam

Bot ini bakal ngejalanin swap otomatis setiap 24 jam buat dapetin poin dari Prior. Bisa jalanin 1 wallet aja (single) atau banyak wallet sekaligus (multi-wallet).

---

## 🔧 Fitur
- 🔄 Swap token otomatis PRIOR ke USDC
- 🧪 Klaim faucet otomatis kalo saldo PRIOR kurang
- 🕓 Looping 24 jam, gak usah dijalanin lagi tiap hari
- 🧾 Detail transaksi ditampilin setelah swap
- 🔐 Support single dan multi wallet lewat file `.env`
- ⏳ Ada hitung mundur buat next cycle

---

## 📦 Cara Install

1. **Clone repo-nya**
```bash
git clone https://github.com/dwifahrisal/dailyprior-Bot.git
cd dailyprior-Bot
```

2. **Install dependency**
```bash
npm install axios ethers dotenv https-proxy-agent

```

3. **Edit file `.env`**

### ➤ Buat 1 wallet aja (single):
```env
WALLET_ADDRESS=0xAlamatWalletKamu
PRIVATE_KEY=privatekeywalletmu
```

### ➤ Buat banyak wallet (multi):
```env
WALLETS=[
  {
    "address": "0xAlamatWallet1",
    "privateKey": "privatekey1"
  },
  {
    "address": "0xAlamatWallet2",
    "privateKey": "privatekey2"
  }
]
```

---

## UPDATE SUPPORT PROXY
http://user:pass@1.2.3.4:8080
http://5.6.7.8:3128


## ▶️ Cara Jalanin Bot

isi sesuai format
```bash
nano .env
```

Run

```bash
node index.js
```

Bot bakal terus looping swap tiap 24 jam. Kamu bisa tinggalin jalan di VPS, PC, atau laptop yang nyala terus.

---

## ❗ Tips
- Jangan pakai wallet utama, ini buat testnet.
- Simpen private key di `.env`, jangan share ke siapa-siapa.
- Bisa disambungin ke cronjob atau pm2 kalo mau running di server.

---

## 📞 Kontak / Bantuan
- Twitter: [@dwifahrissal](https://x.com/dwifahrissal)

---

Selamat farming poin! 🚀

