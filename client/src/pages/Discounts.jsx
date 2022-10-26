import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DiscountsContainer } from "../containers";

import { Container, Box, Input, Button } from "@mui/material";
import { Card, Loader } from "../components";

const styles = {
  banner: {
    width: 40,
    height: "auto",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    justifyItems: "center",
    paddingX: 10,
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 220,
    height: 40,
    marginY: 2,
  },
  input: {
    opacity: 0,
    width: "100%",
    height: "100%",
  },
  inputBox: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    width: "max-content",
    height: "max-content",
    padding: 1,
    border: "1px solid red",
    borderRadius: "9px",
  },
};

export default function Discounts() {
  const [ discounts, setDiscounts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const { admin } = useSelector(state => state.user)
  const [banner, setBanner] = useState('https://png.pngtree.com/png-vector/20190627/ourlarge/pngtree-special-offer-banner-png-image_1517551.jpg');
  const [inputValue, setInputValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // axios("http://localhost:3001/images/discounts")
    // .then(response => {
    //   setBanner(response.data)
    //   return axios("http://localhost:3001/discounts")
    // })
    axios("http://localhost:3001/discounts")
    .then(response => setDiscounts(response.data))
    .then(() => setLoading(false))
  }, [navigate]);

  function handleInput(e) {
    setInputValue(e.target.files[0]);
  }

  function handleUpload() {
    if (!inputValue) return alert("No se puede subir un archivo vacio");
    let blob = new Blob([inputValue], { type: inputValue.type });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      setBanner(reader.result);
      const url = "http://localhost:3001/images/discounts";
      axios.post(url, {image: reader.result});
      setInputValue(null);
    };

    
  }

  if(loading) return <Loader />

  return (
    <DiscountsContainer>
      <div>
        <img
          className={styles.banner}
          src={banner}
          alt="Banner de descuentos"
        />
        {admin && (
          <>
            <Container sx={styles.inputContainer}>
              <Box sx={styles.inputBox}>
                {!inputValue ? "Selecciona un archivo" : "Archivo seleccionado"}
              </Box>
              <Input
                name="discountBanner"
                sx={styles.input}
                type={"file"}
                onChange={handleInput}
              />
            </Container>
            <Button onClick={handleUpload} variant="contained" color="success">
              Subir imagen
            </Button>
          </>
        )}
      </div>
      <Box sx={styles.container}>
        {discounts.map((game) => (
          <Card 
            id={game.id}
            name={game.name} 
            background_image={game.background_image}
            price={game.price}
            discount={game.discount}
          />
        ))}
      </Box>
    </DiscountsContainer>
  );
}
