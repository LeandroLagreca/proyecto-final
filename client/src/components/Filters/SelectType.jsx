import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { orderAlphabetically } from "../../redux/reducers/videoGame";

export default function SelectType() {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.videogames.filters);
  
  const handleType = (event) => {
    dispatch(orderAlphabetically(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel>A-Z</InputLabel>
        <Select value={sort} onChange={handleType} autoWidth label="Type">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">A/z</MenuItem>
          <MenuItem value="desc">Z/a</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
