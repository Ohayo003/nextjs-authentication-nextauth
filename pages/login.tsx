import { ReactElement, useEffect, useState } from "react";
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  FormHelperText,
  Button,
  Link,
  chakra,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import PlatformLogins from "../components/PlatfomLoginButtons";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Loading from "../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email is invalid (eg. example@example.com)")
    .required(),
  password: yup.string().min(5).required(),
});

interface Data {
  email: string;
  password: string;
}

const Login = () => {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
  } = useForm<Data>({ resolver: yupResolver(schema) });

  const handleShowClick = () => setShowPassword(!showPassword);
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
    route.push("/home");
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
                  <FormControl isInvalid={!!errors.email}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaUserAlt color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email address "
                        {...register("email")}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <CFaLock color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="true"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
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
