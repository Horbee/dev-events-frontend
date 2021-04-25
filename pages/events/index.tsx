import axios from "axios";
import { EventData } from "models/event";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
import { Container, Heading, Text } from "@chakra-ui/react";

interface EventsPageProps {
  events: EventData[];
  page: number;
  totalPages: number;
}

export default function EventsPage({
  events,
  page,
  totalPages
}: EventsPageProps) {
  const router = useRouter();

  const onPageChange = (newPage: number) =>
    router.push(`events?page=${newPage}`);

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

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 }
}) => {
  // Calcualte Total Page count
  const { data: total } = await axios.get<number>(API_URL + "/events/count");
  const totalPages = Math.ceil(total / PER_PAGE);

  // Calcualte Limit & Start for paginated query
  const start = (+page - 1) * PER_PAGE;
  const { data: events } = await axios.get<EventData[]>(API_URL + "/events", {
    params: {
      _start: start,
      _limit: PER_PAGE
    }
  });
  return { props: { events, page: +page, totalPages } };
};
