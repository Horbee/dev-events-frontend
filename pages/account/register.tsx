import { registerUser } from "features/user/userSlice";
import { FormikProvider } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserPlus } from "react-icons/fa";
import { useAppDispatch } from "store/store";

import { InputField } from "@/components/form/InputField";
import { Layout } from "@/components/Layout";
import { RegisterFormValues, useRegisterForm } from "@/config/form-config/register-form";
import { Button, Container, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";

export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await dispatch(registerUser(values));
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/account/dashboard");
    } else {
      registerForm.resetForm({
        values: { ...values, password: "", passwordConfirm: "" }
      });
    }
  };

  const registerForm = useRegisterForm(onSubmit);

  return (
    <Layout>
      <Container>
        <Flex h="80vh" alignItems="center">
          <VStack
            shadow="2xl"
            p={["3", "6"]}
            w="100%"
            align="start"
            spacing="6"
          >
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
