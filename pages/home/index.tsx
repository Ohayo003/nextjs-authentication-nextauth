import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Image,
  Stack,
  Button,
  SimpleGrid,
  Icon,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";
import ProtectedWrapper from "components/ProtectedWrapper";
import Layout from "components/Layouts/Layout";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import CardComponent from "components/Widgets/Dashboard/CardComponent";
import StatsComponent from "components/Widgets/Dashboard/StatsComponent";
import ReportComponent from "components/Widgets/Dashboard/ReportComponent";

const HomePage = () => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2 }}
      spacingY={10}
      justifyItems="center"
      background="#FAF7F0"
      p={10}
    >
      <CardComponent
        count={80}
        title="New User"
        icon={FaChevronUp}
        dropdownIcon={FaChevronDown}
        percentage="+2.5%"
        isUser={true}
      />
      <CardComponent
        count={12}
        title="New Subscription"
        icon={FaChevronDown}
        percentage="-2.5%"
        isUser={false}
      />
      <ReportComponent />
      <StatsComponent />
    </SimpleGrid>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedWrapper>
      <Layout>{page}</Layout>
    </ProtectedWrapper>
  );
};
