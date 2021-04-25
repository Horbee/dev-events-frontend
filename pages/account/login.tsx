import { loginUser } from "features/user/userSlice";
import { FormikProvider } from "formik";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "store/store";

import { InputField } from "@/components/form/InputField";
import { Layout } from "@/components/Layout";
import { LoginFormValues, useLoginForm } from "@/config/form-config/login-form";
import { Button, Container, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";

export default function Login() {
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginFormValues) => {
    dispatch(loginUser(values));
  };

  const loginForm = useLoginForm(onSubmit);

  return (
    <Layout>
      <Container>
        <Flex h="60vh" alignItems="center">
          <VStack shadow="2xl" p="6" w="100%" align="start" spacing="6">
            <Heading as="h1" size="xl">
              <Icon as={FaUser} /> Log In
            </Heading>
            <FormikProvider value={loginForm}>
              <form
                onSubmit={loginForm.handleSubmit}
                noValidate={true}
                style={{ width: "100%" }}
              >
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your E-Mail..."
                  label="E-Mail Address"
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
                <Button w="100%" colorScheme="red" type="submit" mt="5">
                  Login
                </Button>
              </form>
            </FormikProvider>
            <Text>
              Don't have an account?{" "}
              <Link href="/account/register">
                <Text as="span" color="blue.400" cursor="pointer">
                  Register
                </Text>
              </Link>
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Layout>
  );
}
