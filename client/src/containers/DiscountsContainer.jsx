import { Box } from "@mui/material";
import React from "react";
const styles = {
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  gap: 15
}
export default function DiscountsContainer({ children, ...props }) {
  return <Box sx={styles} props>{children}</Box>;
}