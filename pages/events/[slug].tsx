import { EventData } from "models/event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";

import type { GetStaticPaths, GetStaticProps } from "next";
interface EventDetailsProps {
  event?: EventData;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const router = useRouter();

  const openEditEvent = () => router.push(`/events/edit/${event?.id}`);

  return (
    <Layout>
      <div className="container my-3">
        {!event && <h1>Event not found</h1>}

        {event && (
          <>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={openEditEvent}
              >
                <FaPencilAlt className="me-2" />
                Edit Event
              </button>
              <button type="button" className="btn btn-outline-danger ms-2">
                <FaTrashAlt className="me-2" />
                Delete Event
              </button>
            </div>
            <span>
              {new Date(event.date).toLocaleDateString("de-DE")}
              {" at "}
              {event.time}
            </span>
            <h1>{event.name}</h1>
            {event.image && (
              <Image
                className="img-fluid"
                src={event.image}
                width={960}
                height={600}
              />
            )}
            <h3>Performers:</h3>
            <p>{event.performers}</p>
            <h3>Description:</h3>
            <p>{event.description}</p>
            <h3>Venue: {event.venue}</h3>
            <p>{event.address}</p>

            <Link href="/events">
              <a className="">{"<"} Go Back</a>
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = (await res.json()) as EventData[];

  const paths = events.map((evt) => ({
    params: { slug: evt.slug }
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${API_URL}/api/events/${params?.slug}`);
  const events = await res.json();
  return { props: { event: events[0], revalidate: 1 } };
};
