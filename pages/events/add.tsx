import axios from "axios";
import { FormikProvider } from "formik";
import { EventData } from "models/event";
import Link from "next/link";
import { useRouter } from "next/router";

import { InputField } from "@/components/form/InputField";
import { Layout } from "@/components/Layout";
import { addEventForm, AddEventFormValues } from "@/config/form-config/add-event-form";
import { API_URL } from "@/config/index";
import { Button, Container, Grid, Heading, Stack, Text, Textarea } from "@chakra-ui/react";

export default function AddEvent() {
  const router = useRouter();

  const onSubmit = async (values: AddEventFormValues) => {
    const { data: event } = await axios.post<EventData>(
      `${API_URL}/events`,
      values
    );
    router.push(`/events/${event.slug}`);
  };

  const eventForm = addEventForm(onSubmit);

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
