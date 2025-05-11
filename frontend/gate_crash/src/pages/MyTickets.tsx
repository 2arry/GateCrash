import { Link } from "react-router-dom";
import TicketCard from "../components/tickets/TicketCard";
import { EmptyPlaceholder } from "../components/ui/empty-placeholder";
import { TicketIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import Navbar from "../components/layouts/Navbar";

const MyTickets = () => {
  const account = useCurrentAccount();
  const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
  const decodeByteArray = (byteArray: number[]) => {
    return new TextDecoder().decode(new Uint8Array(byteArray));
  };

  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!account,
    },
  );

  console.log(data, "data");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <h1 className="page-heading mb-8">My Tickets</h1>

        {!account ? (
          <div className="flex flex-col items-center justify-center bg-muted p-12 rounded-lg">
            <TicketIcon className="h-12 w-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              Connect your wallet to view your tickets
            </h2>
            <p className="mb-6 text-muted-foreground">
              You need to connect your wallet to see your purchased tickets.
            </p>
            <ConnectButton />
          </div>
        ) : data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((ticket) => {
              const fields = (ticket?.data?.content as any).fields;
              return (
                <TicketCard
                  key={decodeByteArray(fields?.id)}
                  id={decodeByteArray(fields?.id)}
                  eventName={
                    decodeByteArray(fields?.name) || "Gate Crash Events"
                  }
                  description={decodeByteArray(fields?.description)}
                  imageUrl={decodeByteArray(fields?.image_url)}
                  location={""}
                  status="valid"
                  isPremium={true}
                  isOwned={true}
                />
              );
            })}
          </div>
        ) : (
          <EmptyPlaceholder>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <TicketIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <EmptyPlaceholder.Title>No tickets found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don't have any tickets yet. Browse the marketplace to find
              events.
            </EmptyPlaceholder.Description>
            <Link to="/marketplace">
              <Button>Browse Marketplace</Button>
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
