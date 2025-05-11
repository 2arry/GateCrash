import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { TextDecoder } from "text-encoding";
import { CalendarIcon, Search } from "lucide-react";
import Navbar from "../components/layouts/Navbar";
import TicketCard from "../components/tickets/TicketCard";
import { Badge } from "../components/ui/badge";
import React, { useEffect, useState } from "react";
import {
  SuiClient,
  SuiClientOptions,
  SuiHTTPTransport,
} from "@mysten/sui/client";
import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";

const clientConfig = {
  network: "devnet",
  transport: new SuiHTTPTransport({
    url: "https://fullnode.devnet.sui.io",
  }),
};

const Marketplace = () => {
  const suiClient = new SuiClient(clientConfig);
  const [marketplaceItems, setMarketPlaceItems] = useState();

  const KIOSK_ID = import.meta.env.VITE_KIOSK_ID;

  const decodeByteArray = (byteArray: number[]) => {
    return new TextDecoder().decode(new Uint8Array(byteArray));
  };

  const account = useCurrentAccount();

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

  async function viewTicketsForSale() {
    try {
      // Get dynamic fields for the Kiosk
      const dynamicFields = await suiClient.getDynamicFields({
        parentId: KIOSK_ID,
      });
      console.log(dynamicFields);
      // if (!dynamicFields || dynamicFields.data.length === 0) {
      //   console.log("No tickets for sale.");
      //   return;
      // }

      // Iterate over each dynamic field to fetch ticket details
      for (const field of dynamicFields.data) {
        const ticketId = field.objectId;
        const ticket = await suiClient.getObject({
          id: ticketId,
          options: { showContent: true },
        });

        setMarketPlaceItems(ticket as any);
        // You can add any custom processing logic for ticket data here
        // E.g., display the event name, price, etc., based on the ticket object content
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  useEffect(() => {
    viewTicketsForSale();
  }, []);
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
              {data?.data?.map((ticket) => {
                const fields = (ticket?.data?.content as any).fields;
                return (
                  <TicketCard
                    key={fields?.id}
                    id={fields?.id}
                    eventName={
                      decodeByteArray(fields?.name) || "Gate Crash Events"
                    }
                    description={decodeByteArray(fields?.description)}
                    imageUrl={decodeByteArray(fields?.image_url)}
                  />
                );
              })}
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
