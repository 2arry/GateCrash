
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Wallet, Loader } from "lucide-react";
import { cn } from "../../utils/helpers/helpers";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";


interface BuyTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    eventName: string;
    price: number;
    imageUrl: string;
    sellerAddress?: string;
  };
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ 
  isOpen, 
  onClose, 
  ticket 
}) => {
  const { toast } = useToast();
  const [isPurchasing, setIsPurchasing] = React.useState(false);
  
  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      
      // This would be replaced with actual wallet transaction code
      console.log(`Purchasing ticket ${ticket.id} for ${ticket.price} SUI`);
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success toast
      toast({
        title: "Purchase successful!",
        description: `You have successfully purchased a ticket for ${ticket.eventName}`,
      });
      
      setIsPurchasing(false);
      onClose();
      
      // In a real implementation, we would redirect to the My Tickets page
      // window.location.href = "/my-tickets";
    } catch (error) {
      console.error("Purchase failed:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      });
      setIsPurchasing(false);
    }
  };
  
  // Format the seller address for display (shortened)
  const formattedSellerAddress = ticket.sellerAddress 
    ? `${ticket.sellerAddress.substring(0, 6)}...${ticket.sellerAddress.substring(ticket.sellerAddress.length - 4)}`
    : "Unknown";

  return (
    <Dialog open={isOpen} onOpenChange={() => !isPurchasing && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            You are about to purchase a ticket for {ticket.eventName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center py-4">
          <div className="rounded-lg overflow-hidden w-32 h-24">
            <img
              src={ticket.imageUrl}
              alt={ticket.eventName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Event:</span>
            <span className="font-medium">{ticket.eventName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-semibold text-lg">{ticket.price} SUI</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Seller:</span>
            <span>{formattedSellerAddress}</span>
          </div>
          
          <Separator />
          
          <div className="bg-muted rounded-lg p-3 text-sm">
            <p className="flex items-center text-muted-foreground">
              <Wallet className="mr-2 h-4 w-4" />
              You'll be asked to approve this transaction in your wallet
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPurchasing}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={isPurchasing} className={cn(isPurchasing && "opacity-80")}>
            {isPurchasing ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Purchase"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyTicketModal;
