import axios from "axios";
import { EventData } from "models/event";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { Container, Heading, Text } from "@chakra-ui/react";

interface EventsPageProps {
  events: EventData[];
}

export default function EventSearchResults({ events }: EventsPageProps) {
  const router = useRouter();

  return (
    <Layout title="Browse Events">
      <Container my="5" maxW="container.md">
        <Heading as="h1" fontSize={["lg", "4xl"]} mb="3">
          Search Results for {router.query.term}
        </Heading>

        {events.length === 0 && (
          <Text as="h3" fontSize="xl">
            No events to show
          </Text>
        )}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
        <Link href="/events">
          <Text color="blue.400" cursor="pointer">
            Go Back
          </Text>
        </Link>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { term }
}) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  });
  const { data: events } = await axios.get<EventData[]>(
    `${API_URL}/events?${query}`
  );
  return { props: { events } };
};
