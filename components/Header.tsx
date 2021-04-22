import { Box } from "@chakra-ui/react";

import { Navbar } from "./navbar/Navbar";

export const Header = () => {
  return (
    <Box flexShrink={0}>
      <Navbar />
    </Box>
  );
};
