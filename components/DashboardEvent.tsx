import { EventData } from "models/event";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { Box, Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react";

interface DashboardEventProps {
  evt: EventData;
  handleDelete: (id: number) => void;
}

export const DashboardEvent: React.FC<DashboardEventProps> = ({
  evt,
  handleDelete
}) => {
  const router = useRouter();

  const openEvent = () => {
    router.push(`/events/${evt.slug}`);
  };

  const editEvent = () => {
    router.push(`/events/edit/${evt.id}`);
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
      <Box flexGrow={1} ml="3">
        <Heading
          as="h4"
          size="sm"
          color="blue.400"
          cursor="pointer"
          onClick={openEvent}
        >
          {evt.name}
        </Heading>
      </Box>
      <HStack>
        <Text color="blue.400" cursor="pointer" onClick={editEvent}>
          <Icon as={FaPencilAlt} /> Edit
        </Text>
        <Text
          color="red.400"
          cursor="pointer"
          onClick={() => handleDelete(evt.id)}
        >
          <Icon as={FaTimes} /> Delete
        </Text>
      </HStack>
    </Flex>
  );
};
