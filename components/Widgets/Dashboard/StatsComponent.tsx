import React from "react";
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Box,
  Text,
} from "@chakra-ui/react";

const StatsComponent = () => {
  return (
    <Box
      rounded="xl"
      w="lg"
      justifyContent="space-evenly"
      background="white"
      p={5}
      boxShadow={`0 4px 8px 0 gray`}
    >
      <Text fontSize="1.5em" lineHeight="2rem" fontWeight="700">
        Your Stat
      </Text>
      <Box mt={3}>
        <StatGroup justifyContent="space-between">
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Sold</StatLabel>
            <StatNumber>$1,500</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              29.13%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
};

export default StatsComponent;
