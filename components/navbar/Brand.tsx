import Link from "next/link";

import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

export const Brand = () => {
  const brandLabel = useBreakpointValue({ base: "CE", md: "COMPANY EVENTS" });

  return (
    <Box>
      <Link href="/">
        <Text fontSize="lg" fontWeight="bold" color="red.400" cursor="pointer">
          {brandLabel}
        </Text>
      </Link>
    </Box>
  );
};
