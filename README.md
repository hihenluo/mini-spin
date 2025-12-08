# 🎡 LUCKY WHEEL — Spin-to-Win dApp

> **Spin. Mint. Celebrate.**

![Lucky Wheel Preview](./public/preview.png)

---

## 🚀 Project Overview

**Lucky Wheel** is a vibrant, arcade-styled Web3 dApp that lets players spin a colorful wheel to win on-chain rewards: tokens and NFTs (plus some "zonk" outcomes for extra tension). Built with modern front-end tooling and integrated with Celo blockchain smart contracts, the app mints or credits token rewards when users win — producing a delightful, low-friction crypto game experience.

The UI is lightweight, fast, and mobile-friendly. Animations and eye-catching UI affordances (big type, chunky borders, and tactile buttons) create that casual-game feel while the blockchain integration supplies real value and verifiability.

---

## ✨ Key Features

* Smooth, animated spin wheel built in React + TypeScript.
* On-win minting/credit flow for tokens and NFTs.
* Multiple prize types: COIN, GEM, TICKET, STAR, HEART, NFT, and ZONK (losing) slots.
* Wallet/connect support via WAGMI (Ethereum-compatible connectors) — works on Celo.
* Tailwind CSS for responsive, modern visuals.
* Easy-to-edit prize table and styles.

---

## 🎯 How It Works (High-level)

1. User connects a wallet (WAGMI connector).
2. User clicks **SPIN NOW**. The front-end picks a random prize index and starts the wheel animation.
3. When the wheel stops, the front-end evaluates the prize (`prizeData[prizeNumber]`).
4. If the prize is a reward (token or NFT), the app triggers a mint/credit transaction to the corresponding smart contract on Celo.
5. Transaction completes and the UI shows a confirmation message and celebration animation.

> Tip: For fairness and transparency, you can move random selection to an on-chain or verifiable-randomness oracle later (e.g., VRF). For now, the experience is driven by client-side randomness plus on-chain minting for the awarded asset.

---

## 🎁 Prize Table (current)

The wheel uses the following prize slices (this array lives at `src/data/prizes.ts`):

```ts
export const prizeData = [
  { option: '🪙 COIN', style: { backgroundColor: '#fef273', textColor: '#8c5a0c' } },
  { option: '💎 GEM', style: { backgroundColor: '#81e6d9', textColor: '#234e52' } },
  { option: '🎟️ TICKET', style: { backgroundColor: '#ff9b85', textColor: '#702c22' } },
  { option: '💣 ZONK', style: { backgroundColor: '#a0aec0', textColor: '#2d3748' } },
  { option: '⭐ STAR', style: { backgroundColor: '#faf089', textColor: '#744210' } },
  { option: '❤️ HEART', style: { backgroundColor: '#fbb6ce', textColor: '#702459' } },
  { option: '🖼️ NFT', style: { backgroundColor: '#d6bcfa', textColor: '#44337a' } },
  { option: '💨 ZONK', style: { backgroundColor: '#e2e8f0', textColor: '#4a5568' } },
];
```

**Prize semantics used in `Spin.tsx`:**

* `ZONK` → no reward (fun fail state).
* `COIN` → credits or mints an ERC-20 token amount to the user.
* `TICKET` → mints a ticket token (ERC-20 or ERC-1155 depending on your contract).
* `NFT` → mints an on-chain NFT to the user.
* Other prizes (GEM, STAR, HEART) can map to distinct token contracts or rarities.

---

## 🧩 Contracts & Addresses (deployed on Celo)

> You provided the following contract addresses — keep these updated as you redeploy.

* **TOKEN_CONTRACTS**

```ts
export const TOKEN_CONTRACTS = {
  COIN: '0xFcf71696D7126E1310C42BD4EBd7da4D8D69F696',
  GEM:  '0x7Afeb18429803f0a69e3602E84eac2d09a8ac731',
  TICKET: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  STAR: '0x27D72D183fA6969cf65c363f8E36bC3C8F3b1D24',
  HEART: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
};

export const NFT_CONTRACT_ADDRESS = '0x661335e2Ce2A684713D7265E9C9895d5a26C9535';
```

> **Security note:** Double-check and verify ABI compatibility and required signer permissions before invoking mint functions. Never hardcode private keys in the client.

---

## 🧰 Tech Stack

* Frontend: Vite + React + TypeScript
* Styling: Tailwind CSS
* Wallet & Blockchain: WAGMI + Viem (or ethers if you prefer)
* Blockchain: Celo (EVM-compatible)
* Smart Contracts: ERC-20 (tokens), ERC-721 / ERC-1155 (NFTs / Tickets)
* Build / Deploy: Vercel / Cloudflare Pages / Netlify (pick your favorite)

---

## 🔧 Getting Started (Developer)

1. Clone repository

```bash
git clone https://github.com/hihenluo/mini-spin.git
cd <mini-spin>
```

2. Install dependencies

```bash
npm install
# or
pnpm install
```

3. Run the dev server

```bash
npm run dev
# open http://localhost:5173
```

4. Environment

Create a `.env` file with keys for your wallet provider (if needed), RPC endpoint for Celo, and API keys. Example:

```
VITE_RPC_URL=https://forno.celo.org
VITE_APP_ENV=development
```

5. Connect wallet and test spins in the UI. Monitor console and network tab for minting txs.

---

## ✅ UX & Game Design Suggestions

* Add a small confirmation modal before minting (show gas estimate and reward preview).
* Show a transaction status panel with links to the Celo block explorer.
* Add a daily free spin limit to increase retention and fairness.
* Add rarity tiers: Common / Rare / Epic / Legendary mapped to spin slices.
* Consider server-side randomness (or VRF) for high-stakes rewards to prevent client-side manipulation.

---

## 🖼️ App Icon — Cool Wheel SVG (copy & paste)

Below is a compact, mint-friendly SVG you can drop in `public/icon.svg` or use as a starting point for an app icon. Resize to 512×512 for stores.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#ff7a5a"/>
      <stop offset="1" stop-color="#ff5a5a"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="24" fill="#0f172a" />
  <g transform="translate(64,64)">
    <circle r="40" fill="url(#g)" stroke="#0b1220" stroke-width="6" />
    <g transform="rotate(-22)">
      <path d="M0 -40 L10 0 L0 10 L-10 0 Z" fill="#0b1220" opacity="0.12" />
    </g>
    <circle r="12" fill="#fff" stroke="#0b1220" stroke-width="3"/>
    <text x="0" y="4" font-size="10" font-family="sans-serif" text-anchor="middle" fill="#0b1220" font-weight="700">SPIN</text>
  </g>
</svg>
```

---

## 🧾 License

MIT — feel free to reuse, remix, and iterate. Give credit where it's due.

---

## 🤝 Contribute

Pull requests welcome. Open an issue for feature proposals (VRF integration, analytics, UX polish, or additional prize types). If you’d like help with contract security audits or gas optimization, ping the maintainer.

---

## 📬 Contact

Built with ❤️. If you want me to refine the README, add badges, or produce a landing page mockup — say the word and I'll craft it.
