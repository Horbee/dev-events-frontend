import axios from "axios";
import { EventData } from "models/event";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { EventItem } from "@/components/EventItem";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Home.module.css";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

interface HomePageProps {
  events: EventData[];
}

export default function HomePage({ events }: HomePageProps) {
  const router = useRouter();
  const openEvents = () => router.push("/events");

  return (
    <Layout>
      <Box className={styles.landing}>
        <Heading as="h1" size="2xl">
          Welcome To Company Events
        </Heading>
        <Text fontSize={["md", "lg"]} pt="3">
          Find the hottest upcoming events of your company!
        </Text>
      </Box>

      <Container my="5" maxW="container.md">
        <Heading as="h1" size="xl" pb="3">
          Upcoming Events
        </Heading>

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}

        {events.length === 0 ? (
          <Text as="h3" fontSize="xl">
            No events to show
          </Text>
        ) : (
          <Button size="sm" colorScheme="blackAlpha" onClick={openEvents}>
            View all Events
          </Button>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: events } = await axios.get<EventData[]>(API_URL + "/events", {
    params: { _sort: "date:ASC", _limit: 3 }
  });
  return { props: { events }, revalidate: 1 };
};
