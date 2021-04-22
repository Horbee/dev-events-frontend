import Link from "next/link";
import { FaFrown, FaTerminal } from "react-icons/fa";

import { Layout } from "@/components/Layout";
import { Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" height="60vh">
        <Icon as={FaFrown} fontSize="10rem" />
        <Stack ml="4" maxW="400px">
          <Heading as="h1" size="3xl">
            <Icon as={FaTerminal} />
            <strong> 404</strong>
          </Heading>
          <Text fontSize="3xl">Your page is not found</Text>
          <Text>
            Sorry, the page you are looking for does not exists, or it may have
            been removed.
          </Text>
          <Link href="/">
            <Text color="blue.400" cursor="pointer">
              Back to Homepage
            </Text>
          </Link>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default NotFound;
