import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/layouts/Navbar";
import { EventForm } from "../components/events/EventForm";
import React from "react";

const CreateEvent = () => {
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

        <div className="max-w-3xl mx-auto">
          <h1 className="page-heading mb-8">Create New Event</h1>
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
