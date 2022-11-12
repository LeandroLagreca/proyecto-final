import { Container } from "@mui/material";
import React from "react";
import { Navbar, Footer } from "..";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">{children}</Container>
      <Footer />
    </>
  );
}
