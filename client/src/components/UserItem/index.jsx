import axios from "axios";
import {
  Box,
  IconButton,
  Select,
	MenuItem,
  Typography,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

import DotMenu from "./dotMenu";

export default function UserItem({ username, email, admin, id }) {

	function changeAdmin(e) {
		const value = e.target.value;
		axios.put("http://localhost:3001/user/" + id, {
			admin: value
		});
	}

	

  return (
    <Box width={400}>
      <Typography variant="h5">{username}</Typography>
      <Box width={300} gap={10} display={"flex"}>
        <Box display={"flex"}>
          <Typography variant="body1">Email: {email}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Admin</Typography>
					<Select defaultValue={admin} onChange={changeAdmin}>
						<MenuItem value='true' >True</MenuItem>
						<MenuItem value='false'>False</MenuItem>
					</Select>
        </Box>
			<DotMenu id={id} />
      </Box>
    </Box>
  );
}
