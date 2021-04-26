import { EventData } from "models/event";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

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

  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm", md: "md" });

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      mb="2"
      p="3"
      boxShadow="md"
      alignItems="center"
    >
      <Box>
        <Image src={imageSrc} width={170} height={100} />
      </Box>
      <Flex
        direction={["column", "row"]}
        w="100%"
        justifyContent="space-between"
        ml="2"
      >
        <Box flexGrow={1} ml="3">
          <Box>
            <Text fontSize={["sm", "md", "lg"]}>
              {moment(evt.date, "YYYY-MM-DD").format("DD.MM.YYYY")} at{" "}
              {evt.time}
            </Text>
          </Box>
          <Heading as="h4" fontSize={["sm", "md", "lg"]}>
            {evt.name}
          </Heading>
        </Box>
        <Button colorScheme="red" onClick={openEvent} size={buttonSize} mt="2">
          Details
        </Button>
      </Flex>
    </Flex>
  );
};
