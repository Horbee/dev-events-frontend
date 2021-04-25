import axios from "axios";
import { EventData } from "models/event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { useConfirmationModal } from "@/components/confirmation-dialog/useConfirmationDialog";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

import type { GetStaticPaths, GetStaticProps } from "next";
interface EventDetailsProps {
  event?: EventData;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const router = useRouter();
  const { getConfirmation } = useConfirmationModal();

  const openEditEvent = () => router.push(`/events/edit/${event?.id}`);
  const deleteEvent = async () => {
    const confirm = await getConfirmation(
      "Delete Event",
      "Are you sure, you want to delete this event?"
    );
    if (confirm) {
      await axios.delete(`${API_URL}/events/${event?.id}`); // TODO: find a way to get token for this request
      router.push("/events");
    }
  };

  return (
    <Layout>
      <Container my="5" maxW="container.md">
        {!event && (
          <Heading as="h1" size="2xl">
            Event not found
          </Heading>
        )}
        {/* Remove controls if user is not the owner or not authenticated */}
        {event && (
          <>
            <Flex justifyContent="flex-end">
              <Button
                leftIcon={<FaPencilAlt />}
                variant="outline"
                colorScheme="blue"
                onClick={openEditEvent}
              >
                Edit Event
              </Button>
              <Button
                leftIcon={<FaTrashAlt />}
                variant="outline"
                colorScheme="red"
                ml="3"
                onClick={deleteEvent}
              >
                Delete Event
              </Button>
            </Flex>
            <Text>
              {new Date(event.date).toLocaleDateString("de-DE")}
              {" at "}
              {event.time}
            </Text>
            <Heading as="h1" size="xl" my="3">
              {event.name}
            </Heading>
            {event.image && (
              <Image
                src={event.image.formats.medium.url}
                width={960}
                height={600}
              />
            )}
            <Text as="h3" fontSize="xl">
              Performers:
            </Text>
            <Text>{event.performers}</Text>
            <Text as="h3" fontSize="xl">
              Description:
            </Text>
            <Text>{event.description}</Text>
            <Text as="h3" fontSize="xl">
              Venue: {event.venue}
            </Text>
            <Text>{event.address}</Text>

            <Link href="/events">
              <Text color="blue.400">{"<"} Go Back</Text>
            </Link>
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: events } = await axios.get<EventData[]>(`${API_URL}/events`);

  const paths = events.map((evt) => ({
    params: { slug: evt.slug }
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: events } = await axios.get<EventData[]>(`${API_URL}/events`, {
    params: { slug_contains: params?.slug }
  });
  return { props: { event: events[0], revalidate: 1 } };
};
