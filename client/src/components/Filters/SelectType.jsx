import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectType() {

  const [type, setType] = React.useState('');

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 100 }}>

        

        <InputLabel >Type</InputLabel>
        <Select
          value={type}
          onChange={handleType}
          autoWidth
          label="Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="alto">Pago</MenuItem>
          <MenuItem value="bajo">Gratis</MenuItem>
        </Select>


      </FormControl>
    </div>
    
  );
}