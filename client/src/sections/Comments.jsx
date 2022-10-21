import React from "react";
import { Divider, Avatar, Grid, Paper, Rating, Typography } from "@mui/material";
import { getComments } from "../redux/actions/comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comments.css";

const imgLink = "Url de imagen de usuario";

export default function Comments() {
    const gameComment = useSelector((state) => state.videogames.comments);
    const dispatch = useDispatch();
    let { id } = useParams();

  useEffect(() => {
    console.log(gameComment);
    dispatch(getComments(id));
    console.log(gameComment);
  }, [dispatch]);

  return (
    <div style={{ padding: 0 }} className="Comments">
      <h1>Comments</h1>
      {gameComment.comments?.map((c) =>{ 
      return(

      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            {/* Traer Imagen del usuario  // poner en alt nombreUsuario */}
            <Avatar alt={c.name} src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            {/* Traer Nombre del usuario */}
            <h4 style={{ margin: 0, textAlign: "left" }}>{c.name}</h4>
            <Typography style={{ textAlign: "right" }} component="legend">Rating</Typography>
            <Rating style={{ float: "right" }} name="read-only" value={c.rating_like} readOnly />
            {/* Traer Texto o comment del usuario */}
            {gameComment.comments?.map((e) => {
              return (
                <p style={{ textAlign: "left" }}>
                  {e.text}
                </p>
              );
            })}
            {/* Traer cuando se hizo el comment */}
            {gameComment.comments?.map((e) => {
              return (
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {e.createdAt}
                </p>
              );
            })}
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Usuario Ejemplo 2</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      )})}
      <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              Usuario Ejemplo 3 en diferente Paper
            </h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
