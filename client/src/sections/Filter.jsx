import { Box } from "@mui/material";
import { Filter } from "../components";

import DisableElevation from "../components/Filters/CleanButton";

const FilterSection = () => {
  return (
    <Box >
      <Filter />
      <DisableElevation />
    </Box>
  );
};

export default FilterSection;
