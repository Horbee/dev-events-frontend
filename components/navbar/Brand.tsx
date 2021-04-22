import Link from "next/link";

import { Box, Text } from "@chakra-ui/react";

export const Brand = () => {
  return (
    <Box>
      <Link href="/">
        <Text fontSize="lg" fontWeight="bold" color="red.400" cursor="pointer">
          COMPANY EVENTS
        </Text>
      </Link>
    </Box>
  );
};
