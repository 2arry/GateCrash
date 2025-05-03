import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { QrCode, Calendar, MapPin } from "lucide-react";
import BuyTicketModal from "./BuyTicketModal";
import { cn } from "../../utils/helpers/helpers";

export type TicketStatus = "valid" | "used" | "error";

export interface TicketProps {
  id: string;
  eventName: string;
  description?: string;
  imageUrl: string;
  date: string;
  location: string;
  price?: number;
  status: TicketStatus;
  isPremium?: boolean;
  className?: string;
  isOwned?: boolean;
  sellerAddress?: string;
}

const TicketCard = ({
  id,
  eventName,
  description,
  imageUrl,
  date,
  location,
  price,
  status,
  isPremium = false,
  className,
  isOwned = false,
  sellerAddress,
}: TicketProps) => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          "ticket-card",
          isPremium && "ticket-card-premium",
          className,
        )}
      >
        <div className="aspect-[3/2] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {status === "used" && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge
                variant="outline"
                className="text-lg font-bold border-4 px-4 py-2 rotate-[-20deg]"
              >
                USED
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{eventName}</CardTitle>
            <div
              className={cn(
                "ticket-status",
                status === "valid" && "ticket-status-valid",
                status === "used" && "ticket-status-used",
                status === "error" && "ticket-status-error",
              )}
            >
              {status === "valid"
                ? "Valid"
                : status === "used"
                  ? "Used"
                  : "Error"}
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </div>
            {price !== undefined && (
              <div className="mt-4">
                <span className="font-semibold">{price} SUI</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {isOwned ? (
            <Link to={`/my-tickets/${id}`} className="w-full">
              <Button className="w-full" variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                View Ticket
              </Button>
            </Link>
          ) : (
            <Button className="w-full" onClick={() => setIsBuyModalOpen(true)}>
              Buy Ticket
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Buy Ticket Modal */}
      {!isOwned && (
        <BuyTicketModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          ticket={{
            id,
            eventName,
            price: price || 0,
            imageUrl,
            sellerAddress,
          }}
        />
      )}
    </>
  );
};

export default TicketCard;
