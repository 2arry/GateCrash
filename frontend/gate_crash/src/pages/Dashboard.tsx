import { Link } from "react-router-dom";

import { CalendarIcon, PlusIcon, TicketIcon } from "lucide-react";
import Navbar from "../components/layouts/Navbar";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { format } from "date-fns";

const sampleEvents = [
  {
    id: "1",
    name: "Summer Music Festival",
    date: "2023-07-15",
    ticketsMinted: 500,
    ticketsSold: 350,
    revenue: 8750,
  },
  {
    id: "2",
    name: "Tech Conference 2023",
    date: "2023-08-25",
    ticketsMinted: 200,
    ticketsSold: 175,
    revenue: 5250,
  },
  {
    id: "3",
    name: "Art Exhibition",
    date: "2023-09-10",
    ticketsMinted: 150,
    ticketsSold: 95,
    revenue: 1900,
  },
  {
    id: "4",
    name: "Web3 Developer Summit",
    date: "2023-10-05",
    ticketsMinted: 300,
    ticketsSold: 275,
    revenue: 13750,
  },
  {
    id: "5",
    name: "Comedy Night",
    date: "2023-11-20",
    ticketsMinted: 150,
    ticketsSold: 120,
    revenue: 3600,
  },
];

const Dashboard = () => {
  const account = useCurrentAccount();

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
  const formattedDate = format(
    new Date("2024-01-15T19:00:00.000Z"),
    "eeee, MMMM, yyyy",
  );
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-heading">Organizer Dashboard</h1>
          <Link to="/event/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Event
            </Button>
          </Link>
        </div>

        {!account ? (
          <div className="flex flex-col items-center justify-center bg-muted p-12 rounded-lg">
            <TicketIcon className="h-12 w-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              Connect your wallet to access the dashboard
            </h2>
            <p className="mb-6 text-muted-foreground">
              You need to connect your wallet to view your events and create new
              ones.
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{data?.data?.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Total Tickets Sold
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    20
                    {/* {sampleEvents.reduce(
                      (sum, event) => sum + event.ticketsSold,
                      0,
                    )} */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {/* {sampleEvents.reduce(
                      (sum, event) => sum + event.revenue,
                      0,
                    )}{" "} */}
                    1000 SUI
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="section-heading mb-6">Your Events</h2>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Tickets</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((event) => {
                    const fields = (event?.data?.content as any)?.fields;
                    return (
                      <TableRow key={fields.id}>
                        <TableCell className="font-medium">
                          {decodeByteArray(fields?.name) || "Gate Crash Events"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {formattedDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">
                            {"500"} / {"30"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {"300"} SUI
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            to={`/event/${decodeByteArray(fields?.id)}/tickets`}
                          >
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
