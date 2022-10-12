import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/videoGame";

export default function Detail() {

  // const gameDetail = useSelector((state) => state.videogames.details);
  // const dispatch = useDispatch();
  // let { id } = useParams();

  // useEffect(() => {
  //   dispatch(getDetails(id))
  // }, []);

//   useEffect(()=>{
//     return ()=>{
//       dispatch(cleanDetail())
//     }
//   },[])

  return <div>
    SOY DETAIL
  </div>;
}
