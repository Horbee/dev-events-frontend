import { EventData } from "models/event";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { Box, Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react";

import { useConfirmationModal } from "./confirmation-dialog/useConfirmationDialog";

interface DashboardEventProps {
  evt: EventData;
}

export const DashboardEvent: React.FC<DashboardEventProps> = ({ evt }) => {
  const router = useRouter();
  const { getConfirmation } = useConfirmationModal();

  const openEvent = () => {
    router.push(`/events/${evt.slug}`);
  };

  const editEvent = () => {
    router.push(`/events/edit/${evt.id}`);
  };

  const deleteEvent = async () => {
    if (
      await getConfirmation(
        "Warning",
        "Are you sure you want to delete this Event?"
      )
    ) {
      console.log(evt.id);
    }
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
        <Text color="red.400" cursor="pointer" onClick={deleteEvent}>
          <Icon as={FaTimes} /> Delete
        </Text>
      </HStack>
    </Flex>
  );
};
