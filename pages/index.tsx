import { EventData } from "models/event";
import { GetStaticProps } from "next";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Home.module.css";

interface HomePageProps {
  events: EventData[];
}

export default function HomePage({ events }: HomePageProps) {
  return (
    <Layout>
      <div className={styles.landing}>
        <h1>Welcome To Dev Events</h1>
        <p className="fs-5">Find the hottest developer events nearby!</p>
      </div>

      <div className="container">
        <h1>Upcoming Events</h1>

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
