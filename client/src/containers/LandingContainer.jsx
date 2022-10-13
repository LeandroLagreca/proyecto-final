import React from "react";
import { Container } from "@mui/material";

export default function LandingContainer({ children, ...rest }) {
  return (
    <div>
      <Container {...rest}>{children}</Container>
    </div>
  );
}
