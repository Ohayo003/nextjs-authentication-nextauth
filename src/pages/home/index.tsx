import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Layout from "components/Layout";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import CardComponent from "components/Widgets/dashboard/CardComponent";
import ReportComponent from "components/Widgets/dashboard/ReportComponent";
import StatsComponent from "components/Widgets/dashboard/StatsComponent";

const HomePage = () => {
  return (
    <Box background="#FAF7F0" p={10}>
      <Box ml={16} mb={5} w="lg">
        <Heading>Dashboard</Heading>
      </Box>
      <SimpleGrid
        columns={{ sm: 1, lg: 2 }}
        spacingY={10}
        justifyItems="center"
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
    </Box>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
