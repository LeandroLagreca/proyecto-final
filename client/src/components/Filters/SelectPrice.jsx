import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectPrice() {

  const [price, setPrice] = React.useState('');

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 100 }}>

        

        <InputLabel >Price</InputLabel>
        <Select
          value={price}
          onChange={handlePrice}
          autoWidth
          label="Price"
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