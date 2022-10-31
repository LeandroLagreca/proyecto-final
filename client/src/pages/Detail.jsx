import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import "./Detail.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/videoGame";
import { getDetails } from "../redux/actions/videoGame";
import { getComments } from "../redux/actions/comment";
import { getQuestions, postQuestion } from "../redux/actions/questions";
import {
  AddToWishes,
  Loader,
  AddToCartButton,
  Footer,
  TextForm,
} from "../components";
import Carousel from "react-material-ui-carousel";
import Item from "../components/Items/Item";
import Comments from "../sections/Comments";
import { Typography, Container, Box, Paper, Button } from "@mui/material";
import FloatingActionButtons from "../components/EditForm/BotonEditar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Detail() {
  const { id } = useParams();
  const { status, id: userId } = useSelector((state) => state.user);
  const { loading, gameComments, gameQuestions, details } = useSelector((state) => state.videogames);
  const [questionText, setQuestionText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDetails(id));
    dispatch(getComments(id))
    dispatch(getQuestions(id))
  }, [id, dispatch]);

  var imgCarousel = [];
  if (details.images) {
    var images = details.images;
    imgCarousel = images.split(",");
    imgCarousel.unshift(details.trailer);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "guest") {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "You cannot add post if you are not registered",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      dispatch(postQuestion({
        userId,
        gameId: id,
        text: questionText
      }))
      setQuestionText('');
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Your review has been posted",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="boxBanner2">
        <Container>
          <Sidebar />
          <Paper elevation={8} sx={{ padding: 2 }}>
            <Typography variant="caption" display="flex" mb={1}>
              <Link className="redir" to={"/home"}>
                Games  {' >>'}
              </Link>
              <Typography
                variant="caption"
                ml={1}
                mr={1}
                color={"darkgray"}
              ></Typography>
              <b>{details.name}</b>
            </Typography>
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
                  className="ReqTit"
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
                    <Typography
                      padding={1}
                      variant="h5"
                      color={"white"}
                      component="div"
                    >
                      {details.name} {/* NOMBRE */}
                    </Typography>
                    <Typography variant="h6" color={"white"}>
                      ${details.price} {/* PRECIO */}
                    </Typography>
                  </Box>
                  <Box display="flex" sx={{ border: "" }}>
                    <AddToCartButton
                      id={id}
                      name={details.name}
                      picture={details.background_image}
                      price={details.price}
                      variant="contained"
                    />
                  </Box>
                  {/* ADDWISHES_ICON */}
                  <Box>
                    <AddToWishes
                      id={id}
                      name={details.name}
                      image={details.background_image}
                      price={details.price}
                      variant="contained"
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
                  <Carousel autoPlay={false} className="carusel">
                    {imgCarousel.map((item, index) => (
                      <Item key={index} item={item} />
                    ))}
                  </Carousel>
                </Box>
                <Box
                  className="description"
                  borderRadius={0.5}
                  sx={{ padding: 1 }}
                >
                  <Typography
                    variant="body2"
                    textAlign="justify"
                    color="text.primary"
                    component={"span"}
                  >
                    {details.description
                      ? parse(details.description)
                      : null}{" "}
                    {/* DESCRIPCION */}
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
                  className="ReqTit"
                  backgroundColor="primary.main"
                  variant="body1"
                  height={35}
                  color="white"
                >
                  Requeriments
                </Typography>
                <Typography
                  className="borderReq"
                  component={"div"}
                  backgroundColor="secondary.light"
                  variant="body2"
                  color="text.primary"
                  textAlign="start"
                >
                  {details.requirements
                    ? parse(details.requirements)
                    : null}
                </Typography>
              </Box>
              {status !== "guest" && <FloatingActionButtons />}
            </Box>
          </Paper>
          {/*---------------- SECCION RESEÑAS ---------------------*/}
          <section>
            <Box className="newComment">
              <form onSubmit={handleSubmit} className="formComment">
                <TextForm cb={setQuestionText} value={questionText} />
                <Button type="submit" sx={{ marginLeft: 5, marginY: 3 }} variant="outlined">
                  Submit
                </Button>
              </form>
            </Box>
            <Container sx={{display: 'flex', gap: 3}}>
              <Comments list={gameComments} type='review' />
              <Comments list={gameQuestions} />
            </Container>
          </section>
        </Container>
      </div>
      <Footer />
    </>
  );
}