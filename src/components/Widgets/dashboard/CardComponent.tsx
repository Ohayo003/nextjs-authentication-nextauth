import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type CardComponentType = {
  count: number;
  title: string;
  icon: IconType;
  dropdownIcon?: IconType;
  percentage: string;
  isUser: Boolean;
};

const CardComponent = ({
  count,
  title,
  icon,
  percentage,
  isUser,
  dropdownIcon,
}: CardComponentType) => {
  return (
    <Box
      bg="#D69E2F"
      color="white"
      rounded="xl"
      w="lg"
      p={5}
      boxShadow={`0 4px 8px 0 gray`}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <VStack align="left" w="md" justifyContent="space-between" h="9rem">
          <Text fontSize="2em" lineHeight="2rem" fontWeight="700">
            {title}
          </Text>
          <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
            {count}
          </Text>
        </VStack>
        <Stack
          alignItems="end"
          justifyContent={isUser ? "space-between" : "end"}
          w="xs"
          h="9rem"
        >
          {isUser ? (
            <>
              <Box
                border="1px"
                _hover={{ cursor: "pointer" }}
                borderColor="white"
                p={1.5}
                borderRadius="lg"
              >
                <HStack>
                  <Text>Last 14 days</Text>
                  <Icon as={dropdownIcon} />
                </HStack>
              </Box>
              <VStack>
                <Icon as={icon} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">{percentage}</Badge>
              </VStack>
            </>
          ) : (
            <>
              <Icon as={icon} color="gray.100" fontSize="2em" />
              <Badge colorScheme="red">{percentage}</Badge>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default CardComponent;
