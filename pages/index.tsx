import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "components/Loading";

const Home = () => {
  const route = useRouter();
  const { status } = useSession();

  const handleChangeRouteLogin = () => {
    route.push("/login");
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") {
    route.push("/home");
    return null;
  } else {
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: { base: "20%", md: "30%" },
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Freelance
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Design Projects
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              The project board is an exclusive resource for contract work.
              It&apos;s perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleChangeRouteLogin()}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
          />
        </Flex>
      </Stack>
    );
  }
};

export default Home;
