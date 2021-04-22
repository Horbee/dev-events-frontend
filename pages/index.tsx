import axios from "axios";
import { EventData } from "models/event";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import qs from "qs";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Home.module.css";

interface HomePageProps {
  events: EventData[];
}

export default function HomePage({ events }: HomePageProps) {
  const router = useRouter();
  const openEvents = () => router.push("/events");

  return (
    <Layout>
      <div className={styles.landing}>
        <h1>Welcome To Dev Events</h1>
        <p className="fs-5">Find the hottest developer events nearby!</p>
      </div>

      <div className="container my-4">
        <h1>Upcoming Events</h1>

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}

        {events.length === 0 ? (
          <h3>No events to show</h3>
        ) : (
          <button
            type="button"
            className="btn btn-dark btn-sm"
            onClick={openEvents}
          >
            View all Events
          </button>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: events } = await axios.get<EventData[]>(API_URL + "/events", {
    params: { _sort: "date:ASC", _limit: 3 }
  });
  return { props: { events }, revalidate: 1 };
};
