import React from "react";
import { Home, About } from "../sections";
import Paginated from "../components/Pagination/Pagination";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../redux/actions/videoGame";

const MainHome = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getGames())
    }, []);

  
  return (
    <div>
      <Home />
      <About />
      <Paginated/>
    </div>
  );
};

export default MainHome;
