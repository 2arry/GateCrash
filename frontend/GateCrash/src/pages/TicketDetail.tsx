import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { ArrowLeft, Share2 } from "lucide-react";
import Navbar from "../components/layouts/Navbar";
import QRTicketView from "../components/tickets/QRTicketView";
import React from "react";

// Sample ticket details for demonstration
const sampleTickets = {
  "1": {
    id: "1",
    eventName: "Summer Music Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Jul 15, 2023 • 12:00 PM",
    location: "Central Park",
    status: "valid",
    qrValue: "ticket-1-valid-abcd1234",
    txHash: "0x1234567890abcdef1234567890abcdef",
  },
  "2": {
    id: "2",
    eventName: "Tech Conference 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Aug 25, 2023 • 9:00 AM",
    location: "Convention Center",
    status: "valid",
    qrValue: "ticket-2-valid-efgh5678",
    txHash: "0xabcdef1234567890abcdef1234567890",
  },
  "3": {
    id: "3",
    eventName: "Art Exhibition",
    imageUrl:
      "https://images.unsplash.com/photo-1605429523419-d828acb941d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Sep 10, 2023 • 10:00 AM",
    location: "City Gallery",
    status: "used",
    qrValue: "ticket-3-used-ijkl9012",
    txHash: "0x567890abcdef1234567890abcdef1234",
  },
};

const TicketDetail = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [useDialogOpen, setUseDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  // This would be replaced with actual data fetching based on the ticketId
  const ticket = sampleTickets[ticketId as keyof typeof sampleTickets];

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8">
          <div className="mb-8">
            <Link
              to="/my-tickets"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to My Tickets
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="mb-8">
              The ticket you're looking for doesn't exist or you don't have
              access to it.
            </p>
            <Link to="/my-tickets">
              <Button>Go to My Tickets</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleUseTicket = () => {
    console.log("Using ticket", ticketId);
    // This would be replaced with actual ticket usage logic
    setUseDialogOpen(false);
  };

  const handleShareTicket = () => {
    console.log("Sharing ticket", ticketId);
    // This would be replaced with actual ticket sharing logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <Link
            to="/my-tickets"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to My Tickets
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <QRTicketView
            id={ticket.id}
            eventName={ticket.eventName}
            imageUrl={ticket.imageUrl}
            date={ticket.date}
            location={ticket.location}
            status={ticket.status as "valid" | "used" | "error"}
            qrValue={ticket.qrValue}
            txHash={ticket.txHash}
          />

          {ticket.status === "valid" && (
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                onClick={() => setTransferDialogOpen(true)}
              >
                Transfer Ticket
              </Button>
              <Button variant="outline" onClick={handleShareTicket}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          )}
        </div>

        {/* Use Ticket Confirmation Dialog */}
        <Dialog open={useDialogOpen} onOpenChange={setUseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Use Ticket</DialogTitle>
              <DialogDescription>
                Are you sure you want to use this ticket? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUseTicket}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Transfer Ticket Dialog */}
        <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Ticket</DialogTitle>
              <DialogDescription>
                Enter the recipient's wallet address to transfer this ticket.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <input
                type="text"
                placeholder="0x..."
                className="w-full p-2 border rounded"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setTransferDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Transfer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TicketDetail;
