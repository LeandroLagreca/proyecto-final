import React from "react";
import { Avatar, Grid, Paper, Rating, Typography } from "@mui/material";
import "./Comments.css";

const parse = require("html-react-parser"); //funcion para parsear html
const imgLink = "Url de imagen de usuario"; //aqui cuando agreguen la funcion de Imagen Profile

export default function Comments({ list, type }) {
  if (!list.length) return <></>;
  return (
    <div style={{ padding: 0 }} className="Comments">
      <h1>
      {
        type === "review" ?
          'Reseñas' :
          'Preguntas'
      }
      </h1>
      {list.map((c) => {
        return (
          <Paper
            elevation={4}
            style={{ padding: "40px 20px", margin: "20px" }}
            key={c.id}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt={c.userComment} src={imgLink} />{" "}
                {/* Imagen usuario//alt nombreUsuario */}
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {c.userComment} {/* Nombre del usuario */}
                </h4>
                {/* Rating / Estrellitas */}
                {type === "review" ? (
                  <>
                    <Typography style={{ textAlign: "right" }} component="legend">
                      Rating
                    </Typography>
                    <Rating
                    style={{ float: "right" }}
                    name="read-only"
                    value={c.rating_like}
                    readOnly
                  />
                  </>
                ) : (
                  <></>
                )}
                <p style={{ textAlign: "left" }}>
                  {parse(c.text)} {/* Texto o Review del usuario */}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {c.createdAt} {/* Cuando se hizo el review */}
                </p>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
}
