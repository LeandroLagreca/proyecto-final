import { Box } from "@mui/material";
import React from "react";
import { Navbar, Footer } from "..";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <Box maxWidth="lg">{children}</Box>
      <Footer />
    </>
  );
}
