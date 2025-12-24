import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
  mode: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("event_date", { ascending: true });

    if (!error && data) setEvents(data as Event[]);
    setLoading(false);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <Layout>
        <p className="text-center py-20">Loading events...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Events</h1>

        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">

                {/* Date Column */}
                <div className="w-full md:w-40 bg-muted rounded-lg p-4 text-center">
                  <p className="text-lg font-bold">
                    {formatDate(event.event_date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(event.event_date)}
                  </p>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                      {event.event_type}
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {event.mode}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center">
                  <Button
                    variant="orange"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    View Details
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
