import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import { ArrowLeft, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";

// Sample event details for demonstration
const eventDetails = {
  id: "1",
  name: "Summer Music Festival",
  date: "2023-07-15",
  location: "Central Park",
  ticketsMinted: 500,
  ticketsSold: 350,
  ticketsUsed: 280,
  revenue: 8750,
};

// Sample ticket data for demonstration
const sampleTickets = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  owner: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
  status: i < 7 ? "valid" : i < 9 ? "used" : "error",
  price: 25,
  purchaseDate: "2023-06-30",
}));

const EventTickets = () => {
  const { eventId } = useParams();


  React.useEffect(() => {
    console.log(`Fetching tickets for event ${eventId}...`);
  }, [eventId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="page-heading">{eventDetails.name} - Tickets</h1>
          <p className="text-muted-foreground mt-2">
            {eventDetails.date} • {eventDetails.location}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Tickets Minted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventDetails.ticketsMinted}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Tickets Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventDetails.ticketsSold}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Tickets Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventDetails.ticketsUsed}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventDetails.revenue} SUI
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tickets..." className="pl-8" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="valid">Valid</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Purchase Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.id}</TableCell>
                    <TableCell>{ticket.owner}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.status === "valid"
                            ? "text-status-success border-status-success"
                            : ticket.status === "used"
                              ? "text-muted-foreground"
                              : "text-status-error border-status-error"
                        }
                      >
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.price} SUI</TableCell>
                    <TableCell>{ticket.purchaseDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="valid">
            <div className="py-8 text-center text-muted-foreground">
              Valid tickets will appear here.
            </div>
          </TabsContent>

          <TabsContent value="used">
            <div className="py-8 text-center text-muted-foreground">
              Used tickets will appear here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventTickets;
