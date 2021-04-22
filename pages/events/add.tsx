import axios from "axios";
import { useFormik } from "formik";
import { EventData } from "models/event";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { Button, Container, Grid, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";

export default function AddEvent() {
  const router = useRouter();

  const { handleSubmit, handleChange, values, handleBlur, errors } = useFormik({
    initialValues: {
      name: "",
      performers: "",
      venue: "",
      address: "",
      date: "",
      time: "",
      description: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      performers: Yup.string().required("Required"),
      venue: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
      time: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      const { data: event } = await axios.post<EventData>(
        `${API_URL}/events`,
        values
      );
      router.push(`/events/${event.slug}`);
    }
  });

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

          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Event Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <Input
                type="text"
                name="performers"
                id="performers"
                placeholder="Performers"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.performers}
              />
              <Input
                type="text"
                name="venue"
                id="venue"
                placeholder="Venue"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.venue}
              />
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              <Input
                name="date"
                id="date"
                placeholder="Date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
              />
              <Input
                type="text"
                name="time"
                id="time"
                placeholder="Time"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.time}
              />
            </Grid>
            <Textarea
              mt="6"
              type="text"
              name="description"
              id="description"
              placeholder="Event Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <Button mt="4" type="submit" colorScheme="red">
              Add Event
            </Button>
          </form>
        </Stack>
      </Container>
    </Layout>
  );
}
