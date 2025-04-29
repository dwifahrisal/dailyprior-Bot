# 🤖 Bot Swap Prior Testnet 24 Jam

Bot ini bakal ngejalanin swap otomatis setiap 24 jam buat dapetin poin dari Prior Testnet. Bisa jalanin 1 wallet aja (single) atau banyak wallet sekaligus (multi-wallet).

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
npm install
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

## ▶️ Cara Jalanin Bot

```bash
nano .env
```
isi sesuai format

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

