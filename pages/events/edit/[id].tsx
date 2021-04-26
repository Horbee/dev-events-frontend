import axios from "axios";
import { FormikProvider } from "formik";
import { EventData } from "models/event";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

import { InputField } from "@/components/form/InputField";
import { ImageUpload } from "@/components/ImageUpload";
import { Layout } from "@/components/Layout";
import { ModalDialog } from "@/components/ModalDialog";
import { EventFormValues, getInitialValues, useEventForm } from "@/config/form-config/event-form";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/cookie";
import { createErrorToast } from "@/helpers/toasts";
import {
    Box, Button, Container, Grid, Heading, Stack, Text, Textarea, useDisclosure
} from "@chakra-ui/react";

interface EditEventProps {
  token: string;
  event?: EventData;
}

const EditEvent = ({ token, event }: EditEventProps) => {
  const router = useRouter();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal
  } = useDisclosure();

  const onSubmit = async (values: EventFormValues) => {
    try {
      await axios.put<EventData>(`${API_URL}/events/${event?.id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${event?.slug}`);
    } catch (err) {
      createErrorToast(err.response.data.message, "Error");
    }
  };

  const eventForm = useEventForm(onSubmit, event && getInitialValues(event));

  const [imagePreview, setImagePreview] = useState(
    event?.image ? event.image.formats.thumbnail.url : null
  );

  const imageUploaded = async () => {
    const { data } = await axios.get<EventData>(
      `${API_URL}/events/${event?.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setImagePreview(data.image.formats.thumbnail.url);
    closeModal();
  };

  return (
    <>
      <Layout title="Edit Event">
        <Container my="5" maxW="container.md">
          <Stack spacing={4}>
            <Link href={`/events/${event?.slug}`}>
              <Text color="blue.400" cursor="pointer">
                Go Back
              </Text>
            </Link>
            <Heading as="h1" size="2xl">
              Edit Event:
            </Heading>

            <FormikProvider value={eventForm}>
              <form onSubmit={eventForm.handleSubmit} noValidate={true}>
                <Grid
                  templateColumns={["repeat(1fr)", "repeat(2, 1fr)"]}
                  gap={6}
                  mb="6"
                >
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
                  Update
                </Button>
              </form>
            </FormikProvider>
            <Text as="h2" fontSize="2xl">
              Event Image
            </Text>
          </Stack>
          {imagePreview ? (
            <Image src={imagePreview} width={170} height={100} />
          ) : (
            <Text as="h2" fontSize="md">
              No image provided
            </Text>
          )}
          <Box>
            <Button
              colorScheme="orange"
              size="sm"
              leftIcon={<FaImage />}
              onClick={openModal}
            >
              Set Image
            </Button>
          </Box>
        </Container>
      </Layout>
      <ModalDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Image Upload"
      >
        <ImageUpload
          eventId={event!.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </ModalDialog>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const { token } = parseCookies(req);
  const { data: event } = await axios.get<EventData>(
    `${API_URL}/events/${params?.id}`
  );
  return { props: { event, token } };
};

export default EditEvent;
