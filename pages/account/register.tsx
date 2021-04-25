import { FormikProvider } from "formik";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";

import { InputField } from "@/components/form/InputField";
import { Layout } from "@/components/Layout";
import { RegisterFormValues, useRegisterForm } from "@/config/form-config/register-form";
import { Button, Container, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";

export default function Register() {
  const onSubmit = async (values: RegisterFormValues) => {
    console.log(values);
  };

  const registerForm = useRegisterForm(onSubmit);

  return (
    <Layout>
      <Container>
        <Flex h="80vh" alignItems="center">
          <VStack shadow="2xl" p="6" w="100%" align="start" spacing="6">
            <Heading as="h1" size="xl">
              <Icon as={FaUserPlus} /> Register
            </Heading>
            <FormikProvider value={registerForm}>
              <form
                onSubmit={registerForm.handleSubmit}
                noValidate={true}
                style={{ width: "100%" }}
              >
                <InputField
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Username..."
                  label="Username"
                  isRequired
                />
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your E-Mail..."
                  label="E-Mail Address"
                  containerProps={{ mt: "4" }}
                  isRequired
                />
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your Password..."
                  label="Password"
                  containerProps={{ mt: "4" }}
                  isRequired
                />
                <InputField
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Confirm Password..."
                  label="Confirm Password"
                  containerProps={{ mt: "4" }}
                  isRequired
                />
                <Button w="100%" colorScheme="red" type="submit" mt="5">
                  Register
                </Button>
              </form>
            </FormikProvider>
            <Text>
              Already have an account?{" "}
              <Link href="/account/login">
                <Text as="span" color="blue.400" cursor="pointer">
                  Login
                </Text>
              </Link>
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Layout>
  );
}
