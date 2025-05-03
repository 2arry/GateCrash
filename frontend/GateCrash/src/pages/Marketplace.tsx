import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { CalendarIcon, Search } from "lucide-react";
import Navbar from "../components/layouts/Navbar";
import TicketCard from "../components/tickets/TicketCard";
import { Badge } from "../components/ui/badge";
import React from "react";

// Sample marketplace tickets for demonstration
const marketplaceTickets = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    description: "3-day music event featuring top artists",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Jul 15, 2023",
    location: "Central Park",
    price: 25,
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
    price: 30,
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
    price: 15,
    status: "valid",
  },
  {
    id: "4",
    eventName: "Comedy Night",
    description: "Live stand-up comedy performances",
    imageUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Oct 5, 2023",
    location: "Downtown Comedy Club",
    price: 20,
    status: "valid",
  },
  {
    id: "5",
    eventName: "Food & Wine Festival",
    description: "Culinary experience with top chefs",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "Nov 12, 2023",
    location: "Riverwalk Park",
    price: 40,
    status: "valid",
    isPremium: true,
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="page-heading">Ticket Marketplace</h1>
            <p className="text-muted-foreground">
              Browse and purchase tickets for upcoming events
            </p>
          </div>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-8" />
            </div>
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="music">
              Music
              <Badge variant="secondary" className="ml-2">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="tech">
              Tech
              <Badge variant="secondary" className="ml-2">
                2
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="art">
              Art
              <Badge variant="secondary" className="ml-2">
                1
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  id={ticket.id}
                  eventName={ticket.eventName}
                  description={ticket.description}
                  imageUrl={ticket.imageUrl}
                  date={ticket.date}
                  location={ticket.location}
                  price={ticket.price}
                  status={ticket.status as "valid" | "used" | "error"}
                  isPremium={ticket.isPremium}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="music">
            <div className="py-8 text-center text-muted-foreground">
              Music events will be filtered here.
            </div>
          </TabsContent>

          <TabsContent value="tech">
            <div className="py-8 text-center text-muted-foreground">
              Tech events will be filtered here.
            </div>
          </TabsContent>

          <TabsContent value="art">
            <div className="py-8 text-center text-muted-foreground">
              Art events will be filtered here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
