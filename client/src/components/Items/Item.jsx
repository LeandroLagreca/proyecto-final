import React from "react";
import { Paper, Box } from "@mui/material";
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
          mozallowfullscreen
          src={item}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; mozallowfullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </Paper>
  );
}
