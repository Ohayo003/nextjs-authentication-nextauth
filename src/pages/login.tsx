import { useEffect, useState } from "react";
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputComponent from "components/Widgets/login/InputComponent";
import ProviderButtons from "components/Widgets/login/ProviderButtons";
import { FaFacebookSquare, FaGithub, FaGoogle } from "react-icons/fa";
import { useCallbackUrl } from "hooks/useCallbackUrl";
import TextField from "components/Widgets/TextField";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email is invalid (eg. example@example.com)")
    .trim()
    .required(),
  password: yup.string().trim().required(),
});

export interface IData {
  email: string;
  password: string;
}

const Login = () => {
  const { status } = useSession();

  const route = useRouter();

  const callbackUrl = useCallbackUrl();

  console.log(callbackUrl);

  ///useForm from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
    setError(true);
  });

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") {
    route.push(callbackUrl);
    return null;
  } else {
    return (
      <>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Welcome</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form noValidate onSubmit={onSubmit}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  {error && (
                    <Box
                      color="red"
                      textAlign="center"
                      fontWeight="600"
                      fontStyle="italic"
                    >
                      ❌ Invalid Email or Password 😱
                    </Box>
                  )}

                  {/**INPUT COMPONENT */}
                  <TextField
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <TextField
                    type="password"
                    error={errors.password?.message}
                    {...register("password")}
                  />

                  {/* <InputComponent register={register} isEmail={false} /> */}

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                  <Divider orientation="horizontal" borderColor="gray" />

                  {/**Provider Button Section */}
                  <Socials />
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </>
    );
  }
};

const Socials = () => {
  return (
    <HStack justify="center">
      <ProviderButtons
        provider="facebook"
        icon={<FaFacebookSquare size={45} />}
        aria-label="facebook"
      />
      <ProviderButtons
        provider="github"
        icon={<FaGithub size={45} />}
        aria-label="facebook"
      />
      <ProviderButtons
        provider="google"
        icon={<FaGoogle size={45} />}
        aria-label="facebook"
      />
    </HStack>
  );
};

export default Login;
