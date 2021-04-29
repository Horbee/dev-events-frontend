import axios from "axios";
import { EventData } from "models/event";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { useConfirmationModal } from "@/components/confirmation-dialog/useConfirmationDialog";
import { EventMap } from "@/components/EventMap";
import { Layout } from "@/components/Layout";
import { API_URL, NEXT_URL } from "@/config/index";
import { createErrorToast } from "@/helpers/toasts";
import { Box, Container, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import type { GetStaticPaths, GetStaticProps } from "next";
interface EventDetailsProps {
  event?: EventData;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [userIsOwner, setUserIsOwner] = useState(false);
  const router = useRouter();
  const { getConfirmation } = useConfirmationModal();

  const openEditEvent = () => router.push(`/events/edit/${event?.id}`);
  const deleteEvent = async () => {
    const confirm = await getConfirmation(
      "Delete Event",
      "Are you sure, you want to delete this event?"
    );
    if (confirm) {
      try {
        await axios.delete(`${NEXT_URL}/api/events/delete/${event?.id}`);
        router.push("/events");
      } catch (err) {
        createErrorToast(err.response.data.message, "Error");
      }
    }
  };

  useEffect(() => {
    if (event) {
      axios
        .post(`${NEXT_URL}/api/ismine`, { ids: [event.id] })
        .then((res) => {
          setUserIsOwner(res.data);
        })
        .catch((err) => setUserIsOwner(false));
    }
  }, []);

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
            {userIsOwner && (
              <HStack justify="flex-end">
                <Text color="blue.400" cursor="pointer" onClick={openEditEvent}>
                  <Icon as={FaPencilAlt} /> Edit
                </Text>
                <Text color="red.400" cursor="pointer" onClick={deleteEvent}>
                  <Icon as={FaTimes} /> Delete
                </Text>
              </HStack>
            )}
            <Text>
              {moment(event.date, "YYYY-MM-DD").format("DD.MM.YYYY")}
              {" at "}
              {event.time}
            </Text>
            <Heading as="h1" size="xl" my="3">
              {event.name}
            </Heading>
            {event.image && (
              <Image
                src={event.image.formats.medium?.url ?? event.image.url}
                width={960}
                height={600}
              />
            )}
            <VStack align="flex-start" spacing="4">
              <Text as="h3" fontSize="4xl">
                Performers:
              </Text>
              <Text>{event.performers}</Text>
              <Text as="h3" fontSize="4xl">
                Description:
              </Text>
              <ReactMarkdown remarkPlugins={[gfm]}>
                {event.description}
              </ReactMarkdown>
              <Box>
                <Text as="h3" fontSize="4xl">
                  Venue: {event.venue}
                </Text>
                <Text>{event.address}</Text>
              </Box>
            </VStack>

            <EventMap evt={event} />

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
  return { props: { event: events[0] }, revalidate: 1 };
};
