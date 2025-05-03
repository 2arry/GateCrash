import { Link } from "react-router-dom";
import TicketCard from "../components/tickets/TicketCard";
import { EmptyPlaceholder } from "../components/ui/empty-placeholder";
import { TicketIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Navbar from "../components/layouts/Navbar";

// Sample user tickets data for demonstration
const userTickets = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    description: "3-day music event featuring top artists",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Jul 15, 2023",
    location: "Central Park",
    status: "valid",
  },
  {
    id: "2",
    eventName: "Tech Conference 2023",
    description: "Annual tech conference with workshops",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Aug 25, 2023",
    location: "Convention Center",
    status: "valid",
    isPremium: true,
  },
  {
    id: "3",
    eventName: "Art Exhibition",
    description: "Contemporary art showcase",
    imageUrl:
      "https://images.unsplash.com/photo-1605429523419-d828acb941d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Sep 10, 2023",
    location: "City Gallery",
    status: "used",
  },
  {
    id: "4",
    eventName: "Web3 Developer Summit",
    description: "Learn about the latest in blockchain development",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Oct 5, 2023",
    location: "Tech Center",
    status: "valid",
    isPremium: true,
  },
  {
    id: "5",
    eventName: "Comedy Night",
    description: "An evening of stand-up comedy",
    imageUrl:
      "https://images.unsplash.com/photo-1610890690846-5149750c8634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    date: "Nov 20, 2023",
    location: "Comedy Club",
    status: "valid",
  },
];

const MyTickets = () => {
  const account = useCurrentAccount();

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
        ) : userTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                eventName={ticket.eventName}
                description={ticket.description}
                imageUrl={ticket.imageUrl}
                date={ticket.date}
                location={ticket.location}
                status={ticket.status as "valid" | "used" | "error"}
                isPremium={ticket.isPremium}
                isOwned={true}
              />
            ))}
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
