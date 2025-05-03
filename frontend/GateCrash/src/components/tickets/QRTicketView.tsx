import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Calendar, MapPin, ArrowRight, QrCode } from "lucide-react";
import { TicketStatus } from "./TicketCard";
import { cn } from "../../utils/helpers/helpers";

interface QRTicketViewProps {
  id: string;
  eventName: string;
  imageUrl: string;
  date: string;
  location: string;
  status: TicketStatus;
  qrValue: string;
  txHash?: string;
  className?: string;
}

const QRTicketView: React.FC<QRTicketViewProps> = ({
  id,
  eventName,
  imageUrl,
  date,
  location,
  status,
  txHash,
  className,
}) => {
  return (
    <div className={cn("max-w-md mx-auto", className)}>
      <Card className="overflow-hidden">
        <div className="aspect-[3/2] relative">
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-full object-cover"
          />
          {status === "used" && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge
                variant="outline"
                className="text-lg font-bold border-4 px-6 py-3 rotate-[-20deg]"
              >
                USED
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{eventName}</CardTitle>
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

          <div className="space-y-2 text-sm mt-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />

          <div className="p-4 bg-muted rounded-lg flex justify-center">
            <div className="bg-white p-4 rounded-md">
              {/* Placeholder for QR Code - would be replaced with actual QR component */}
              <div className="w-48 h-48 bg-black text-white flex items-center justify-center">
                {/* This would be replaced with an actual QR code component */}
                <QrCode size={120} />
              </div>
            </div>
          </div>

          {txHash && (
            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                Transaction: {txHash.substring(0, 10)}...
                {txHash.substring(txHash.length - 6)}
              </p>
              <p className="mt-1">Ticket ID: #{id}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {status === "valid" ? (
            <>
              <Button className="w-full" variant="default">
                Use Ticket
              </Button>
              <Button className="w-full" variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" />
                Transfer Ticket
              </Button>
            </>
          ) : (
            <Button className="w-full" variant="outline">
              View on Explorer
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QRTicketView;
