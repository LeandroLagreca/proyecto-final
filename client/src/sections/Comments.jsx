import React from "react";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { getComments } from "../redux/actions/comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comments.css";
import { margin } from "@mui/system";
const parse = require("html-react-parser");
const imgLink = "Url de imagen de usuario";

export default function Comments() {
  const gameComment = useSelector((state) => state.videogames.comments);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    console.log(gameComment);
    dispatch(getComments(id));
    console.log(gameComment);
  }, []);

  return (
    <div style={{ padding: 0 }} className="Comments">
      <h1>Comments</h1>
      {gameComment.comments?.map((c) => {
        return (
          <Paper elevation={4} style={{ padding: "40px 20px", margin: "20px"}}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                {/* Traer Imagen del usuario  // poner en alt nombreUsuario */}
                <Avatar alt={gameComment.name} src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                {/* Traer Nombre del usuario */}
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {gameComment.name}
                </h4>
                <Typography style={{ textAlign: "right" }} component="legend">
                  Rating
                </Typography>
                <Rating
                  style={{ float: "right" }}
                  name="read-only"
                  value={c.rating_like}
                  readOnly
                />
                {/* Traer Texto o comment del usuario */}
                <p style={{ textAlign: "left" }}>{parse(c.text)}</p>
                {/* Traer cuando se hizo el comment */}
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {c.createdAt}
                </p>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
}
