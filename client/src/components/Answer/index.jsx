import React from "react";
import { Box, Avatar, Container, Divider, Typography } from "@mui/material";


const styles = {
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		paddingTop: 3,
		paddingLeft: 4,
		textAlign: 'left'
	}
}
export default function Answer({name='Admin', text, date='' }) {
  return (
		<Box marginTop={2}>
			<Divider />
    <Box sx={styles.container}>
			<Avatar></Avatar>
			<Container>
				<h5>{name}</h5>
      	<p>{text}</p>
      	<Typography sx={{color: 'gray'}}>{date}</Typography>
			</Container>
    </Box>
		
		</Box>
  );
}
