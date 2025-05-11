import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.data.length === 0 ? (
        <div>No objects owned by the connected wallet</div>
      ) : (
        <div>Objects owned by the connected wallet</div>
      )}
      {data.data.map((object) => (
        <div key={object.data?.objectId}>
          <div>Object ID: {object.data?.objectId}</div>
        </div>
      ))}
    </div>
  );
}
