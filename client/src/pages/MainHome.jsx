import { About, Games, FilterSection } from "../sections";
import { ClientLayout, Footer, Social } from "../components";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import ContactComponent from "../components/ContactUsComponent/ContactUs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { putUserData } from "../redux/actions/user";

const MainHome = () => {
  return (
    <ClientLayout>
      <Social />
      <Stack direction={{xs:'column', sm:'row'}}>
        <FilterSection />
        <Games />
      </Stack>
      <About />
      <ContactComponent />
    </ClientLayout>
  );
};

export default MainHome;
