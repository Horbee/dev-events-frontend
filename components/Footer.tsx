import Link from "next/link";

import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box flexShrink={0} boxShadow="dark-lg" py="3" textAlign="center">
      <Text color="gray.500">Copyright &copy; Company Events 2021</Text>
      <Link href="/about">
        <Text cursor="pointer" color="blue.400">
          About This Project
        </Text>
      </Link>
    </Box>
  );
};
