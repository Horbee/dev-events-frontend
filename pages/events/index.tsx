import axios from "axios";
import { EventData } from "models/event";
import { GetStaticProps } from "next";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { Container, Heading, Text } from "@chakra-ui/react";

interface EventsPageProps {
  events: EventData[];
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <Layout title="Browse Events">
      <Container my="5" maxW="container.md">
        <Heading as="h1" size="xl" mb="3">
          Browse Events
        </Heading>

        {events.length === 0 && (
          <Text as="h3" fontSize="xl">
            No events to show
          </Text>
        )}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: events } = await axios.get<EventData[]>(API_URL + "/events");
  return { props: { events }, revalidate: 1 };
};
