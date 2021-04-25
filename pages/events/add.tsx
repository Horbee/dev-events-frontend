import axios from "axios";
import { FormikProvider } from "formik";
import { EventData } from "models/event";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { InputField } from "@/components/form/InputField";
import { Layout } from "@/components/Layout";
import { EventFormValues, useEventForm } from "@/config/form-config/event-form";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/cookie";
import { createErrorToast } from "@/helpers/toasts";
import { Button, Container, Grid, Heading, Stack, Text, Textarea } from "@chakra-ui/react";

interface AddEventProps {
  token: string;
}

export default function AddEvent({ token }: AddEventProps) {
  const router = useRouter();

  const onSubmit = async (values: EventFormValues) => {
    try {
      const { data: event } = await axios.post<EventData>(
        `${API_URL}/events`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/events/${event.slug}`);
    } catch (err) {
      createErrorToast(err.response.data.message, "Error");
    }
  };

  const eventForm = useEventForm(onSubmit);

  return (
    <Layout title="Add New Event">
      <Container my="5" maxW="container.md">
        <Stack spacing={4}>
          <Link href="/events">
            <Text color="blue.400" cursor="pointer">
              Go Back
            </Text>
          </Link>
          <Heading as="h1" size="2xl">
            Add Event:
          </Heading>

          <FormikProvider value={eventForm}>
            <form onSubmit={eventForm.handleSubmit} noValidate={true}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6} mb="6">
                <InputField
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  label="Name"
                  isRequired
                />
                <InputField
                  type="text"
                  name="performers"
                  placeholder="Performers"
                  label="Performers"
                  isRequired
                />
                <InputField
                  type="text"
                  name="venue"
                  placeholder="Venue"
                  label="Venue"
                  isRequired
                />
                <InputField
                  type="text"
                  name="address"
                  placeholder="Address"
                  label="Address"
                  isRequired
                />
                <InputField
                  type="date"
                  placeholder="Date"
                  name="date"
                  label="Date"
                  isRequired
                />
                <InputField
                  type="text"
                  placeholder="Time"
                  name="time"
                  label="Time"
                  isRequired
                />
              </Grid>
              <InputField
                type="text"
                placeholder="Event Description"
                name="description"
                label="Event Description"
              >
                <Textarea
                  type="text"
                  placeholder="Event Description"
                  {...eventForm.getFieldProps("description")}
                />
              </InputField>
              <Button mt="4" type="submit" colorScheme="red">
                Add Event
              </Button>
            </form>
          </FormikProvider>
        </Stack>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  return { props: { token } };
};
