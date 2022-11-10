import { Routes as Rutas, Route } from "react-router-dom";

import useStatusChecker from "./firebase/statusCheck";
import signWithGoogle from "./firebase/signWithGoogle";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./firebase/credenciales";

import {
  Detail,
  MainHome,
  Landing,
  AdminPanel,
  NotFound,
  Cart,
  Discounts,
  Account,
} from "./pages";

import { Footer } from "./components";
import Wishes from "./components/Wishes/AddtoWishes";
import Purchases from "./components/Purchases/Purchases";
import Sidebar from "./components/Sidebar/Sidebar";
import Collection from "./components/Collection/Collection";
import LandingPage from "./components/Landing/LandingPage";
import Nosotros from "./components/Nosotros/Nosotros";

const Routes = ({ setMode, mode }) => {
  const statusChecker = useStatusChecker();
  getRedirectResult(auth).then((result) => {
    if (result) {
      signWithGoogle(result.user).then(() => statusChecker());
    }
  });

  statusChecker();

  return (
    <>
      <Rutas>
        <Route exact path="/login" element={<Landing />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<MainHome />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/wishes" element={<Wishes />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/colection" element={<Collection />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/about" element={<Nosotros />} />
      </Rutas>
    </>
  );
};

export default Routes;
