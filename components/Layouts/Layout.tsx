import { Box, Grid } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

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
