import React from "react";
import { Home, About } from "../sections";
import Paginated from "../components/Pagination/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../redux/actions/videoGame";
import Cards from "../components/Cards/Cards";

const MainHome = () => {
    const games = useSelector((state) => state.videogames.games);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getGames())
    }, []);

  
  return (
    <div>
      <Home />
      <About />
      {/* saco el renderizado de cards directo en el home */}
      <Paginated/>
    </div>
  );
};

export default MainHome;
