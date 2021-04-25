import axios from "axios";
import { EventData } from "models/event";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useConfirmationModal } from "@/components/confirmation-dialog/useConfirmationDialog";
import { DashboardEvent } from "@/components/DashboardEvent";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/cookie";
import { createErrorToast } from "@/helpers/toasts";
import { Container, Heading } from "@chakra-ui/react";

interface DashboardProps {
  events: EventData[];
  token: string;
}

export default function Dashboard({ events, token }: DashboardProps) {
  const { getConfirmation } = useConfirmationModal();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (
      await getConfirmation(
        "Warning",
        "Are you sure you want to delete this Event?"
      )
    ) {
      try {
        await axios.delete<EventData>(`${API_URL}/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        router.replace(router.asPath);
      } catch (err) {
        createErrorToast(err.response.data.message, "Error");
      }
    }
  };

  return (
    <Layout>
      <Container my="5" maxW="container.md">
        <Heading as="h1" size="xl" pb="3">
          Dashboard
        </Heading>
        <Heading as="h3" size="md" pb="3" color="orange.400">
          My Events
        </Heading>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={handleDelete} />
        ))}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const { data: events } = await axios.get<EventData[]>(
    `${API_URL}/events/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return { props: { events, token } };
};
