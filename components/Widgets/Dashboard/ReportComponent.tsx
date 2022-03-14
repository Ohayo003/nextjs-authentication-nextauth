import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React from "react";

const ReportComponent = () => {
  return (
    <Box
      rounded="xl"
      w="lg"
      justifyContent="space-evenly"
      background="white"
      p={5}
      boxShadow={`0 4px 8px 0 gray`}
    >
      <HStack justifyContent="space-between">
        <Text fontSize="1.5em" lineHeight="2rem" fontWeight="700">
          Reports
        </Text>
        <HStack>
          <Button
            background="#D69E2F"
            color="white"
            _hover={{
              backgroundColor: "white",
              color: "#D69E2F",
              borderColor: "#D69E2F",
              border: "1px",
            }}
          >
            Create Report
          </Button>
          <Button
            background="transparent"
            borderColor="#D69E2F"
            border="1px"
            color="#D69E2F"
            _hover={{ backgroundColor: "#D69E2F", color: "white" }}
          >
            Second Report
          </Button>
        </HStack>
      </HStack>
      <Box mt={3}></Box>
    </Box>
  );
};

export default ReportComponent;
