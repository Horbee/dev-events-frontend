import { EventData } from "models/event";
import { GetStaticProps } from "next";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";

interface EventsPageProps {
  events: EventData[];
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <Layout title="Browse Events">
      <div className="container">
        <h1>Browse Events</h1>

        {events.length === 0 && <h3>No events to show</h3>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(API_URL + "/api/events");
  const events = await res.json();
  return { props: { events }, revalidate: 1 };
};
