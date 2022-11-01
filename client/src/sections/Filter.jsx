import { Box } from "@mui/material";
import { Filter } from "../components";

import DisableElevation from "../components/Filters/CleanButton";

const FilterSection = () => {
  return (
    <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 6, fontSize: 24}} className="FiltersFather">
      <Filter />
      {/* <DisableElevation /> */}
    </Box>
  );
};

export default FilterSection;
