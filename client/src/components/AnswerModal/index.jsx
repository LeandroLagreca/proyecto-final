import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextForm } from "..";

export default function AnswerModal({userId, questionId, game}) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios.put('http://localhost:3001/answer/' + questionId, {
      text: answer
    })
    .then(() => axios.put(`http://localhost:3001/user/notifications/${userId}`, {
      text: `Recibiste una respuesta en tu pregunta sobre el juego: ${game}`
    }))
  };
  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Responder
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Responder Pregunta</DialogTitle>
          <DialogContent>
            <form style={{ paddingTop: 40 }}>
              <TextForm cb={setAnswer} value={answer} />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
