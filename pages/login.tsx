import { useEffect, useState } from "react";
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import PlatformLogins from "components/Widgets/Login/PlatfomLoginButtons";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Loading from "components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputComponent from "components/Widgets/Login/InputComponent";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email is invalid (eg. example@example.com)")
    .required(),
  password: yup.string().required(),
});

export interface IData {
  email: string;
  password: string;
}

const Login = () => {
  const route = useRouter();
  const { status } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  ///useForm from react-hook-form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({ resolver: yupResolver(schema) });

  const [error, setError] = useState(false);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await signIn(providers?.credentials.id, {
      ...data,
      callbackUrl: "http://localhost:3000/home",
      redirect: false,
    });
    setError(true);
  });

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") {
    route.push("/home/");
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
                  {error ? (
                    <Box
                      color="red"
                      textAlign="center"
                      fontWeight="600"
                      fontStyle="italic"
                    >
                      ❌ Invalid Email or Password 😱
                    </Box>
                  ) : null}

                  {/**INPUT COMPONENT */}
                  <InputComponent
                    register={register}
                    email={errors.email}
                    isEmail={true}
                  />
                  <InputComponent register={register} isEmail={false} />

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

                  <PlatformLogins provider={providers!} />
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </>
    );
  }
};

export default Login;
