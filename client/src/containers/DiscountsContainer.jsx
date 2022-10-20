import { Box } from "@mui/material";
import React from "react";
const styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15
}
export default function DiscountsContainer({ children, ...props }) {
  return <Box sx={styles} props>{children}</Box>;
}