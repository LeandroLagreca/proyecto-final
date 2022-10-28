import React from "react";
import { Paper } from "@mui/material";
import "./Item.css";

export default function Item({ item, name }) {
  return (
    <Paper className="paperBanner">
      <p className="nameBanner">{name}</p>

      {!item.includes("youtube") ? (
        <img
          className="imagenBanner"
          width="auto"
          height={400}
          src={item}
          alt="notFound"
        />
      ) : (
        <iframe
          className="frame"
          scrolling="no"
          src={item}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </Paper>
  );
}
