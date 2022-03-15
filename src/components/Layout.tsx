import { Box, Grid } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "components/Footer";
import Header from "components/Header";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <Box width="full">
      <Grid>
        <Header />
        {children}
        <Footer />
      </Grid>
    </Box>
  );
};

export default Layout;
