import { EventData } from "models/event";
import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

interface EventItemProps {
  evt: EventData;
}

export const EventItem: React.FC<EventItemProps> = ({ evt }) => {
  const router = useRouter();
  const imageSrc = evt.image
    ? evt.image.formats.thumbnail.url
    : "/images/event-default.jpg";

  const openEvent = () => {
    router.push(`/events/${evt.slug}`);
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      mb="2"
      p="3"
      boxShadow="md"
      alignItems="center"
    >
      <Box flexShrink={0}>
        <Image src={imageSrc} width={170} height={100} />
      </Box>
      <Box flexGrow={1} ml="3">
        <Box>
          {new Date(evt.date).toLocaleDateString("de-DE")} at {evt.time}
        </Box>
        <Heading as="h4" size="md">
          {evt.name}
        </Heading>
      </Box>
      <Button colorScheme="red" onClick={openEvent}>
        Details
      </Button>
    </Flex>
  );
};
