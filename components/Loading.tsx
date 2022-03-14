import { Box, Spinner, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <VStack height="100vh" align="center" justify="center">
      <Spinner size="xl" />
      <Heading>Loading</Heading>
    </VStack>
  );
};

export default Loading;
