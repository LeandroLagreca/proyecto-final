import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import { auth } from "../firebase/credenciales";
import Item from "../components/Items/Item";
import LinkIcon from "@mui/icons-material/Link";
import { getComments } from "../redux/actions/comment";
import { postComments, updateComments } from "../redux/actions/comment";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  Paper,
  IconButton,
  Avatar,
  Rating,
} from "@mui/material";
import FloatingActionButtons from "../components/EditForm/BotonEditar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { AnswerModal, Answer } from "../components";
import "./Comments.css";

const parse = require("html-react-parser"); //funcion para parsear html

export default function Comments({ list, type }) {
  const { pathname } = useLocation();
  const gameComment = list;
  const user = useSelector((state) => state.user.status);
  const userImage = useSelector((state) => state.user.image);
  const dispatch = useDispatch();
  var userId = "";
  var userName = "";
  if (auth.currentUser !== null) {
    userId = auth.lastNotifiedUid;
    userName = auth.currentUser.email;
  }
  useEffect(() => {}, [gameComment]);

  //Update de comentarios
  async function handleSubmitUpdate(e) {
    if (!value.comment.text) {
      e.preventDefault();
      Swal.fire({
        toast: true,
        icon: "error",
        title: "You can not update a comment without text",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    } else {
      if (user === "guest") {
        setIsLogued(false);
        Swal.fire({
          toast: true,
          icon: "error",
          title: "You cannot update a post if you are not registered",
          position: "bottom-right",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      } else {
        //value.comment.id = 4;
        dispatch(updateComments(value));
        setValue({
          comment: {
            id: "",
            text: "",
            image: userImage,
            userComment: "",
            rating_like: 3,
          },
        });
        setIsLogued(true);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Your review has been updated",
          position: "bottom-right",
          showConfirmButton: false,
          timer: 3000,
        });
        setUpdateButton(false);
      }
    }
  }

  //Estado local de Form de Reseñas
  const [value, setValue] = React.useState({
    comment: {
      id: "",
      text: "",
      image: userImage,
      userComment: "",
      rating_like: 3,
    },
  });

  //Estado local para enviar Comment con negritas y demas
  const [already, setAlready] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
    quote: false,
  });

  //estado local para estrellas Rating
  const [estrella, setEstrella] = React.useState(3);

  const [isLogued, setIsLogued] = React.useState(false);

  //HandleChange para Form
  const handleChange = (e) => {
    value.comment.text = e.target.value;
    value.comment.userComment = userName;
    setValue({
      ...value,
      userID: auth.lastNotifiedUid,
    });
  };

  //Handle para Rating del form
  const handleStar = (e) => {
    value.comment.rating_like = e.target.value;
    setValue({
      ...value,
    });
  };

  //{----------------------Icons de review--------------------}
  //Handle para BOLD
  const handleBold = (e) => {
    if (already.bold === true) {
    } else {
      setValue({ ...value, comment: { text: `<b>${value.comment.text}</b>` } });
      setAlready({ ...already, bold: true });
    }
  };
  //Handle para ITALIC
  const handleItalic = (event) => {
    if (already.italic === true) {
    } else {
      setValue({ ...value, comment: { text: `<i>${value.comment.text}</i>` } });
      setAlready({ ...already, italic: true });
    }
  };
  //Handle para UNDERLINE
  const handleUnderline = (event) => {
    if (already.underline === true) {
    } else {
      setValue({ ...value, comment: { text: `<u>${value.comment.text}</u>` } });
      setAlready({ ...already, underline: true });
    }
  };
  //Handle para LINK
  const handleLink = (event) => {
    if (already.link === true) {
    } else {
      setValue({
        ...value,
        comment: { text: `<a href="#">${value.comment.text}` },
      });
      setAlready({ ...already, link: true });
    }
  };
  //Handle para QUOTE
  const handleQuote = (event) => {
    if (already.quote === true) {
    } else {
      setValue({
        ...value,
        comment: { text: `<blockquote>${value.comment.text}</blockquote>` },
      });
      setAlready({ ...already, quote: true });
    }
  };
  //{------------------------------------------}

  const [UpdateButton, setUpdateButton] = React.useState(false);

  const handleUpdateButton = (e) => {
    e.preventDefault();
    value.comment.id = e.target.name;
    setValue({
      ...value,
    });
    setUpdateButton(true);
  };
  if (!list?.length) return <></>;
  return (
    <div style={{ padding: 0 }} className="Comments">
      <h1>{type === "review" ? "Reseñas" : "Preguntas"}</h1>
      {gameComment.map((c) => {
        return (
          <Paper
            elevation={4}
            style={{ padding: "40px 20px", margin: "20px" }}
            key={c.id}
          >
            {c.userComment === userName ? (
              <Grid item>
                <Typography style={{ textAlign: "right" }} component="legend">
                  <Button
                    variant="contained"
                    name={c.id}
                    onClick={handleUpdateButton}
                  >
                    Update
                  </Button>
                </Typography>
                {UpdateButton ? (
                  <form onSubmit={handleSubmitUpdate} className="formComment">
                    <Box
                      width={580}
                      sx={{
                        bgcolor: "secondary.text",
                        borderColor: "primary.main",
                        border: 1,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      <TextField
                        onChange={handleChange}
                        type="form"
                        id="standard-multiline-static"
                        fullWidth
                        label="Reviews"
                        name="text"
                        value={value.comment.text}
                        multiline
                        rows={4}
                        placeholder="Post a review..."
                        variant="standard"
                      />
                      <Box
                        className="postActions"
                        sx={{
                          bgcolor: "#c0c0c0",
                          borderColor: "secondary.main",
                        }}
                      >
                        <Box className="iconsComment">
                          <IconButton onClick={handleBold}>
                            <FormatBoldIcon className="iconitos" />
                          </IconButton>
                          <IconButton onClick={handleItalic}>
                            <FormatItalicIcon className="iconitos" />
                          </IconButton>
                          <IconButton onClick={handleUnderline}>
                            <FormatUnderlinedIcon className="iconitos" />
                          </IconButton>
                          <IconButton onClick={handleLink}>
                            <LinkIcon className="iconitos" />
                          </IconButton>
                          <IconButton onClick={handleQuote}>
                            <FormatQuoteIcon className="iconitos" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingTop: 1,
                      }}
                    >
                      <Box>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          name="rating_like"
                          value={estrella}
                          onClick={handleStar}
                          onChange={(event, newValue) => {
                            setEstrella(newValue);
                          }}
                        />
                      </Box>

                      <Button
                        type="submit"
                        sx={{ marginLeft: 5 }}
                        variant="outlined"
                      >
                        Submit
                      </Button>
                    </Box>
                  </form>
                ) : null}
              </Grid>
            ) : (
              <Grid item></Grid>
            )}

            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt={c.userComment} src={c.image} />{" "}
                {/* Imagen usuario//alt nombreUsuario */}
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {c.userComment} {/* Nombre del usuario */}
                </h4>
                {/* Rating / Estrellitas */}
                {type === "review" ? (
                  <>
                    <Typography
                      style={{ textAlign: "right" }}
                      component="legend"
                    >
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
                {pathname !== "/admin/questions" || c.answer ? (
                  <></>
                ) : (
                  <AnswerModal userId={c.userId} questionId={c.id} game={c.videogame.name} />
                )}
              </Grid>
            </Grid>
            {!c.answer ? <></> : <Answer text={c.answer} date={c.createdAt}/>}
          </Paper>
        );
      })}
    </div>
  );
}
