import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { addWishes, removeWishes } from "../../redux/actions/videoGame";
import Swal from "sweetalert2";

const buttonStyles = {
  backgroundColor: 'red'
}

export default function AddToWishBtn({ name, image, id, price, styles,  }) {
  const wishes = useSelector((state) => state.videogames.wishes);
  const user = useSelector((state) => state.user.role);
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
        <IconButton  sx={{...styles, color:"#FF0000"}} onClick={() => {
          addToWishes();
          // Swal.fire({
          //   toast: true,
          //   icon: 'success',
          //   title: 'Was added to the wish list',
          //   animation: false,
          //   position: 'bottom-right',
          //   showConfirmButton: false,
          //   timer: 3000,
          // })
          
          }}>
        <FavoriteBorder />
        </IconButton>
      ) : (
        <IconButton color='primary' sx={{...styles, color:"#FF0000"}} onClick={() => {
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
          
        </IconButton>
      )}
    </>
  );
}
