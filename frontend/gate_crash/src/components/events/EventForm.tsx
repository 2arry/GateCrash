import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { cn } from "../../utils/helpers/helpers";
import { useToast } from "../../hooks/use-toast";
import Dropzone from "dropzone";

// Zod schema for form validation
const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  ticketCount: z.number().int().positive({
    message: "Ticket count must be a positive number.",
  }),
  enableResale: z.boolean().default(false),
  enableKiosk: z.boolean().default(false),
  ticketImageURL: z.string().optional(),
  ticketImageFile: z.string().optional(),
});

export function EventForm() {
  const { toast } = useToast();
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const dropzoneRef = useRef(null);
  const recipientAddress = account?.address as string;
  const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      description: "",
      location: "",
      ticketCount: 100,
      enableResale: false,
      enableKiosk: true,
      ticketImageURL: "",
      ticketImageFile: "",
    },
  });

  useEffect(() => {
    // Initialize Dropzone when component is mounted
    const dropzone = new Dropzone(dropzoneRef.current, {
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      maxFiles: 1,
      maxFilesize: 2,
      acceptedFiles: "image/*",
      dictDefaultMessage: "Drag & drop an image or click to upload",
      params: {
        upload_preset: "GateGrash",
      },
      success: (file, response) => {
        const url = response.secure_url;
        setImageURL(url);
        form.setValue("ticketImageURL", url);
      },

      error: (file, errorMessage) => {
        console.error("Error uploading image:", errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
    });

    // Cleanup Dropzone instance on unmount
    return () => dropzone.destroy();
  }, [toast, form]);

  // Function to mint event tickets
  async function mintTickets(eventDetails: z.infer<typeof formSchema>) {
    const tx = new Transaction();

    const imageUrl =
      imageURL ||
      eventDetails.ticketImageURL ||
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

    tx.setGasBudget(2797000);

    tx.moveCall({
      target: `${PACKAGE_ID}::ticket::mint_ticket`,
      arguments: [
        tx.pure.address(recipientAddress),
        tx.pure.string(eventDetails.eventName),
        tx.pure.string(eventDetails.description),
        tx.pure.string(imageUrl),
        tx.pure.u64(
          BigInt(Math.floor(new Date(eventDetails.eventDate).getTime() / 1000)),
        ),
        tx.pure.u64(eventDetails.ticketCount),
        tx.pure.bool(eventDetails.enableResale),
        tx.pure.bool(eventDetails.enableKiosk),
        tx.pure.u64(2797000),
        // tx.pure.string(
        //   0xa9887af1a2c0fdff4405c8df20013c26c5ba6763ca6bbe00777cbda8247ea5c1,
        // ),
      ],
    });

    const result = signAndExecute({
      transaction: tx,
    });

    console.log("Transaction result:", result);
  }

  // Form submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Creating event",
      description: "Your event is being created...",
      duration: 1000,
    });

    mintTickets(values);
  }

  const handleRemoveImage = () => {
    setImageURL(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Event" {...field} />
              </FormControl>
              <FormDescription>
                The name of your event as it will appear on tickets.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your event here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When will your event take place?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Event Location" {...field} />
                </FormControl>
                <FormDescription>
                  Where will your event take place?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ticketCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Tickets</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                How many tickets would you like to mint?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormItem>
            <FormLabel>Upload Ticket Image</FormLabel>
            <div className="relative w-full h-48 border-2 border-dashed border-gray-400 rounded-md p-4">
              <div ref={dropzoneRef} className="dropzone h-full w-full"></div>

              {imageURL && (
                <div className="flex items-center space-x-4 mt-4">
                  <img
                    src={imageURL}
                    alt="Uploaded Ticket"
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                  <div className="flex-grow">
                    <Button
                      onClick={handleRemoveImage}
                      className="text-xs text-red-600 hover:bg-red-100 px-2 py-1 rounded-md"
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </FormItem>

          <div className="py-4">
            <FormDescription>
              Alternatively, provide a direct URL to your ticket image.
            </FormDescription>
          </div>

          {/* Image URL Input */}
          <FormField
            control={form.control}
            name="ticketImageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provide Image URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/ticket-image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="enableResale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Enable Resale</FormLabel>
                  <FormDescription>
                    Allow ticket holders to resell their tickets.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enableKiosk"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Enable Sui Kiosk</FormLabel>
                  <FormDescription>
                    List tickets for sale on the Sui Kiosk marketplace.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="text-red-400">Minting Fee: {2797000 * 10}</div>
        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button type="submit">Create Event</Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
