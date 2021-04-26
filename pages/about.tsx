import Link from "next/link";

import { Layout } from "@/components/Layout";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Layout title="About Company events">
      <Container my="5" maxW="lg">
        <VStack align="flex-start">
          <Heading as="h1" fontSize="4xl">
            About
          </Heading>
          <Text>
            This is an app to find the upcoming events of your Company.
          </Text>
          <Text>Version: 1.0.0</Text>
          <Link href="/">
            <Text color="blue.400" cursor="pointer">
              Home
            </Text>
          </Link>
        </VStack>
      </Container>
    </Layout>
  );
}
