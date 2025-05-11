import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import Navbar from "../components/layouts/Navbar";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "../components/ui/button";
import React from "react";

const Index = () => {
  const account = useCurrentAccount();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
                NFT Tickets on{" "}
                <span className="bg-gradient-to-r from-ticket to-ticket-secondary bg-clip-text text-transparent">
                  Sui Blockchain
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                GateCrash is a decentralized ticketing platform. Create, sell,
                and collect NFT tickets for events. Verify attendance and
                prevent counterfeiting.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {account ? (
                  <Link to="/event/new">
                    <Button className="btn-primary">Create Event</Button>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-primary">Create Event</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect Your Wallet</DialogTitle>
                        <DialogDescription>
                          Please connect your wallet to create an event
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center py-4">
                        <ConnectButton />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <Link to="/marketplace">
                  <Button variant="outline">Browse Events</Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-lg bg-gradient-to-r from-ticket-accent to-ticket-secondary opacity-30"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Concert"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-ticket flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M20 4v16H4a2 2 0 0 1 0-4h12a2 2 0 0 0 0-4H4a2 2 0 0 1 0-4h12a2 2 0 0 0 0-4H4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Create Event Tickets</h3>
              <p className="text-muted-foreground">
                Mint NFT tickets for your events with customizable settings
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-ticket-accent flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M7 10v12"></path>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Sell & Trade</h3>
              <p className="text-muted-foreground">
                List tickets on Sui Kiosk marketplace or transfer directly
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-ticket-secondary flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 11h18"></path>
                  <path d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6"></path>
                  <path d="M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path>
                  <path d="M9 22V5"></path>
                  <path d="M15 22V5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Verify Attendance</h3>
              <p className="text-muted-foreground">
                Secure QR codes for seamless event check-in
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
