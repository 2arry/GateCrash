# GateCrash Frontend Integration Guide (Sui Blockchain)

Welcome to the GateCrash frontend repo! This guide is designed to explains how to connect the GateCrash UI to Sui blockchain smart contracts so users can:

* Connect their Sui wallet
* Mint NFT tickets
* View owned tickets
* View tickets for sale (listed on a Kiosk)
* Buy tickets directly from GateCrash UI

---

## 📦 Project Stack

* **Wallet/Blockchain SDK:** `@mysten/dapp-kit` (Sui wallet integration)
* **Blockchain:** Sui (Devnet/Testnet/Mainnet)
* **Smart Contract Language:** Move
* **Backend:** None required (Sui chain acts as backend)

---

## 🔌 Connecting the Wallet

### Libraries:

```bash
npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query
```

### Add Wallet Provider (src/main.tsx)

```tsx
import { SuiClientProvider, WalletProvider, networkConfig } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();
const networks = networkConfig(); // includes Devnet, Testnet, Mainnet

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Usage in Components

```tsx
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

const account = useCurrentAccount(); // Get user's address
```

---

## 🎟️ Minting NFT Tickets

### Required:

* **Package ID:** Provided by backend/dev team (e.g. `0xabc123...`)
* **Function:** `ticket::mint_ticket(title, description, image_url)`

### Example

```tsx
import { TransactionBlock } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';

const { mutate: signAndExecute } = useSignAndExecuteTransaction();

function mintTicket() {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: `0xPACKAGE_ID::ticket::mint_ticket`,
    arguments: [
      tx.pure.string("GateCrash VIP Ticket"),
      tx.pure.string("Access to secret event"),
      tx.pure.string("https://image-link.com/vip.png")
    ]
  });
  signAndExecute({ transaction: tx });
}
```

---

## 👛 View Owned Tickets

Use `getOwnedObjects` query with a filter:

```tsx
import { useSuiClientQuery, useCurrentAccount } from '@mysten/dapp-kit';

const { address } = useCurrentAccount() || {};

const { data } = useSuiClientQuery('getOwnedObjects', {
  owner: address,
  options: { showContent: true },
  filter: {
    StructType: '0xPACKAGE_ID::ticket::Ticket'
  }
});
```

Render the NFTs using `data.data[].data.content.fields`.

---

## 🛒 View Tickets for Sale in GateCrash Marketplace

Tickets listed for sale are stored in a **Kiosk**.
You can fetch listed items using:

```ts
suiClient.getDynamicFields({ parentId: KIOSK_ID });
```

Then fetch item details:

```ts
suiClient.getObject({ id: dynamicField.objectId, options: { showContent: true } });
```

> **Note:** You'll be provided with the `KIOSK_ID` by the dev team or can query it if needed.

---

## 🛍️ Buy Ticket from GateCrash Kiosk

You need to:

* Fetch the listing ID and price
* Construct a `TransactionBlock` that calls `kiosk::purchase()`

Example:

```tsx
const tx = new TransactionBlock();
tx.moveCall({
  target: '0xKIOSK_PACKAGE::kiosk::purchase',
  arguments: [
    tx.object(kioskId),
    tx.object(listingId),
    tx.pure.u64(price)
  ]
});
signAndExecute({ transaction: tx });
```

---

## 📚 Resources for Learning Sui

* [https://docs.sui.io](https://docs.sui.io)
* [https://github.com/MystenLabs/sui](https://github.com/MystenLabs/sui) (core repo)
* [https://explorer.sui.io](https://explorer.sui.io) (object & txn explorer)

---

## 📦 Provided by Backend Developer

* `PACKAGE_ID` for deployed contracts
* `Ticket` struct type (e.g. `0xabc::ticket::Ticket`)
* `KIOSK_ID` of marketplace
* Full function signatures for `mint_ticket`, `mark_used`, `purchase`, etc.
* Sample NFT metadata fields

---

## ✅ Summary

You can implement the full Web3 frontend for GateCrash **without needing an API server** by using Sui’s open RPC and wallet interface via `@mysten/dapp-kit`.

Let the core logic live **on-chain**, and use React + hooks to drive all user actions (mint, view, buy, etc.).
