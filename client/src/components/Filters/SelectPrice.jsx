import { useSelector, useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import { filterByPrice } from "../../redux/reducers/videoGame";
import Slider from "@mui/material/Slider";
import { Box, Typography } from "@mui/material";

export default function SelectPrice() {
  const dispatch = useDispatch();
  const { price } = useSelector((state) => state.videogames.filters);

  const mark = [
    {
      value: 0,
      label: "$0",
    },
    {
      value: 25,
      label: "$25",
    },
    {
      value: 50,
      label: "$50",
    },
    {
      value: 75,
      label: "$75",
    },
    {
      value: 100,
      label: "$100",
    },
  ];

  const handlePrice = (event) => {
    dispatch(filterByPrice(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <Box style={{ width: 200, display: 'flex', flexDirection:'column', alignItems:'center' }}>
        <Typography variant='h5' color={"secondary.main"}>Price</Typography>
          <Slider
            step={25}
            min={0}
            max={100}
            onChange={handlePrice}
            value={parseInt(price)}
            color={"secondary"}
            marks={mark}
          />
        </Box>
      </FormControl>
    </div>
  );
}
