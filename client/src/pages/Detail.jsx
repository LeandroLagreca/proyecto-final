import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddToWishes, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/videoGame";
import { getDetails } from "../redux/actions/videoGame";
import Carousel from "react-material-ui-carousel";
import LinkIcon from "@mui/icons-material/Link";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Item from "../components/Items/Item";
import "./Detail.css";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";

export default function Detail() {
  const { loading } = useSelector((state) => state.videogames);
  const gameDetail = useSelector((state) => state.videogames.details);
  const dispatch = useDispatch();
  let { id } = useParams();

  var imgCarousel = [];
  if (gameDetail.images) {
    var images = gameDetail.images;
    imgCarousel = images.split(",");
  }

  //Estado locad de Form de Reseñas
  const [value, setValue] = React.useState(); //Estado local
  const [already, setAlready] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
    quote: false,
  });

  const handleChange = (event) => {
    //Handle para Form
    setValue(event.target.value);
    console.log(value);
  };

  //Icons
  const handleImage = (event) => {
    //Handle para BOLD
  };
  const handleBold = (event) => {
    //Handle para BOLD
    if (already.bold === true) {
      console.log("entre");
    } else {
      setValue("<b>" + value + "</b>");
      setAlready({ ...already, bold: true });
    }
    console.log(value, already);
  };
  const handleItalic = (event) => {
    //Handle para ITALIC
    if (already.italic === true) {
      console.log("entre");
    } else {
      setValue("<i>" + value + "</i>");
      setAlready({ ...already, italic: true });
      console.log(value);
    }
  };
  const handleUnderline = (event) => {
    //Handle para UNDERLINE
    if (already.underline === true) {
      console.log("entre");
    } else {
      setValue("<u>" + value + "</u>");
      setAlready({ ...already, underline: true });
      console.log(value);
    }
  };
  const handleLink = (event) => {
    //Handle para LINK
    if (already.link === true) {
      console.log("entre");
    } else {
      setValue(`<a href="#">` + value);
      setAlready({ ...already, link: true });
      console.log(value);
    }
  };
  const handleQuote = (event) => {
    //Handle para QUOTE
    if (already.quote === true) {
      console.log("entre");
    } else {
      setValue("<blockquote>" + value + "</blockquote>");
      setAlready({ ...already, quote: true });
      console.log(value);
    }
  };

  useEffect(() => {
    //UseEffect para traer los datos con la action x id
    dispatch(setLoading());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Paper elevation={8} sx={{ padding: 2 }}>
        <Box display="flex" alignItems="flex-start" className="boxDivisor">
          <Box
            className="containerNombreImagenDescription"
            backgroundColor="secondary.light"
            width={650}
            borderRadius={3}
            sx={{ border: "grey" }}
          >
            <Box
              display="flex"
              backgroundColor="primary.main"
              borderRadius={1}
              sx={{
                borderColor: "#42a5f5",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                display="contents"
                className="nombrePrecio"
                sx={{ border: "1px dashed grey" }}
              >
                <Box></Box>
                {/* NOMBRE */}
                <Typography
                  padding={1}
                  variant="h5"
                  color={"white"}
                  component="div"
                >
                  {gameDetail.name}
                </Typography>
                {/* PRECIO */}
                <Typography variant="h6" color={"white"}>
                  ${gameDetail.price}
                </Typography>
              </Box>
              <Box display="flex" sx={{ border: "" }}>
                <Button variant="contained">
                  <AddShoppingCartIcon />{" "}
                </Button>
              </Box>
              {/* ADDWISHES_ICON */}
              <Box>
                <AddToWishes
                  id={id}
                  name={gameDetail.name}
                  image={gameDetail.background_image}
                  price={gameDetail.price}
                />
              </Box>
            </Box>
            <Box
              width={650}
              height={300}
              alignItems="center"
              className="imagen"
              display="inline-block"
              sx={{ borderRadius: "4px" }}
            >
              {/* CARRUSEL */}
              <Carousel className="carusel">
                {imgCarousel.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </Carousel>
            </Box>
            <Box className="description" borderRadius={0.5} sx={{ padding: 1 }}>
              {/* DESCRIPCION */}
              <Typography
                variant="body2"
                textAlign="justify"
                color="text.primary"
              >
                {gameDetail.description}
              </Typography>
            </Box>
          </Box>
          <Box
            className="requeriments"
            margin={1.5}
            sx={{ borderRadius: 1, padding: 1 }}
          >
            {/* REQUERIMIENTOS */}
            <Typography
              borderRadius={0.5}
              backgroundColor="primary.main"
              variant="body1"
              height={35}
              color="white"
            >
              Requeriments
            </Typography>
            <Typography
              sx={{ borderRadius: 2 }}
              backgroundColor="secondary.light"
              variant="body2"
              color="text.primary"
            >
              {gameDetail.requirements}
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/* SECCION RESEÑAS */}
      <section>
        <Box className="newComment">
          <Box>
            <AccountBoxIcon sx={{ fontSize: 50 }} />
          </Box>
          <Box
            width={340}
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
              id="standard-multiline-static"
              fullWidth
              label="Reseñas"
              value={value}
              multiline
              rows={4}
              placeholder="Agrega un comentario..."
              variant="standard"
            />
            <Box
              className="postActions"
              sx={{
                bgcolor: "#90caf9",
                borderColor: "secondary.main",
                border: 1,
              }}
            >
              <Box className="iconsComment">
                <IconButton onClick={handleImage}>
                  <input type="file" hidden />
                  <AddPhotoAlternateIcon opacity={30} />
                </IconButton>|
                <IconButton onClick={handleBold}>
                  <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={handleItalic}>
                  <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={handleUnderline}>
                  <FormatUnderlinedIcon />
                </IconButton>
                <IconButton onClick={handleLink}>
                  <LinkIcon />
                </IconButton>
                <IconButton onClick={handleQuote}>
                  <FormatQuoteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </Container>
  );
}
