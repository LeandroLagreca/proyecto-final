import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, IconButton, TextField } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatQuote,
  FormatUnderlined,
  Link,
} from "@mui/icons-material";
import { Container } from "@mui/system";

export default function TextForm({ cb, value }) {
  const [localValue, setLocalValue] = useState('');
  //Estado local para enviar Comment con negritas y demas
  const [already, setAlready] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
    quote: false,
  });
  const userImage = useSelector((state) => state.user.image)
  const imgLink = userImage

  useEffect(() => {
    cb(localValue)
  }, [localValue, cb])

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
  };

  const handleBold = (e) => {
    if (already.bold === true) {
    } else {
      setLocalValue(`<b>${localValue}</b>`);
      setAlready({ ...already, bold: true });
    }
  };
  //Handle para ITALIC
  const handleItalic = (event) => {
    if (already.italic === true) {
    } else {
      setLocalValue(`<i>${localValue}</i>`);
      setAlready({ ...already, italic: true });
    }
  };
  //Handle para UNDERLINE
  const handleUnderline = (event) => {
    if (already.underline === true) {
    } else {
      setLocalValue(`<u>${localValue}</u>`);
      setAlready({ ...already, underline: true });
    }
  };
  //Handle para LINK
  const handleLink = (event) => {
    if (already.link === true) {
    } else {
      setLocalValue(`<a href="#">${localValue}`);
      setAlready({ ...already, link: true });
    }
  };
  //Handle para QUOTE
  const handleQuote = (event) => {
    if (already.quote === true) {
    } else {
      setLocalValue(`<blockquote>${localValue}</blockquote>`);
      setAlready({ ...already, quote: true });
    }
  };

  return (
    <Container sx={{ display: "flex", gap: 2} }>
      <Box display={{xs:'none', sm:'block'}}>
        <Avatar alt={"Profile picture"} src={imgLink} />
      </Box>
      <Box
        sx={{
          width:{xs: 300, md:500},
          bgcolor: "secondary.text",
          borderColor: "primary.main",
          border: 1,
          borderRadius: 1,
          display: "inline-block",
          boxShadow:"3"
        }}
      >
        <TextField
          onChange={handleChange}
          id="standard-multiline-static"
          fullWidth
          name="text"
          value={value}
          multiline={true}
          rows={4}
          placeholder="Escribe aqui..."
          variant="standard"
          InputProps={{ inputProps: { style: { color: 'black' }}}}
          sx={{color:"black",}}
        />
        <Box
          className="postActions"
          sx={{
            bgcolor: "#c0c0c0",
            borderColor: "secondary.main",
						display: 'flex',
						justifyContent: 'flex-start'
          }}
        >
            <IconButton onClick={handleBold}>
              <FormatBold className="iconitos" />
            </IconButton>
            <IconButton onClick={handleItalic}>
              <FormatItalic className="iconitos" />
            </IconButton>
            <IconButton onClick={handleUnderline}>
              <FormatUnderlined className="iconitos" />
            </IconButton>
            <IconButton onClick={handleLink}>
              <Link className="iconitos" />
            </IconButton>
            <IconButton onClick={handleQuote}>
              <FormatQuote className="iconitos" />
            </IconButton>
        </Box>
      </Box>
    </Container>
  );
}
