import { Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <VStack height="100vh" align="center" justify="center">
      <Spinner size="xl" thickness="6px" color="green" speed="0.65s" />
    </VStack>
  );
};

export default Loading;
