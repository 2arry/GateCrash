import { useCurrentAccount } from "@mysten/dapp-kit";
import { OwnedObjects } from "./OwnedObjects";

export function WalletStatus() {
  const account = useCurrentAccount();
  

  return (
    <div>
      <div>Wallet Status</div>

      {account ? (
        <div>
          <div>Wallet connected</div>
          <div>Address: {account.address}</div>
        </div>
      ) : (
        <div>Wallet not connected</div>
      )}
      <OwnedObjects />
    </div>
  );
}
