import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { addWishes, removeWishes } from "../../redux/actions/videoGame";
import Swal from "sweetalert2";

const buttonStyles = {
	bgcolor: 'primary.main',
	color: 'white'
}

export default function AddToWishBtn({ name, image, id, price, styles, ...props}) {
  const wishes = useSelector((state) => state.videogames.wishes);
  const user = useSelector((state) => state.user.status);
  const [already, setAlreadyIs] = useState(false);
  const dispatch = useDispatch();

  const addToWishes = () => {
    if(user === "guest"){
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'You cannot add to the wish list if you are not registered',
        animation: false,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
      })
    }else{

      dispatch(
        addWishes({
          name,
          image,
          id,
          price
        })
        
        );
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Was added to the wish list',
          animation: false,
          position: 'bottom-right',
          showConfirmButton: false,
          timer: 3000,
        })
    }
    
  };

  function handleDelete() {
    dispatch(removeWishes(name));
  }

  useEffect(() => {
      const find = wishes.some((el) => el.name === name);
    if (find) setAlreadyIs(true);
    else setAlreadyIs(false);
  }, [wishes, name]);

  return (
    <>
      {!already ? (
        <Button {...props}  sx={{...styles, ...buttonStyles}} onClick={() => {
          addToWishes();          
          }}>
        <FavoriteBorder />
        </Button>
      ) : (
        <Button {...props} sx={{...styles, ...buttonStyles}} onClick={() => {
          handleDelete();
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Was deleted to the wish list',
            animation: false,
            position: 'bottom-right',
            showConfirmButton: false,
            timer: 3000,
          })
          }}>
        <Favorite />
          
        </Button>
      )}
    </>
  );
}
