import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectRating() {
  const [rating, setRating] = React.useState('');


  const handleRating = (event) => {
    setRating(event.target.value);
  };


  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 100 }}>

        

        <InputLabel >Rating</InputLabel>
        <Select
          value={rating}
          onChange={handleRating}
          autoWidth
          label="Rating"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="alto">Alto</MenuItem>
          <MenuItem value="bajo">Bajo</MenuItem>
        </Select>


      </FormControl>
    </div>
    
  );
}

