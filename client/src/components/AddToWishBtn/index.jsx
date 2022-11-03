import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { addNewWish, deleteWish } from "../../redux/actions/user";
import Swal from "sweetalert2";

const buttonStyles = {
	bgcolor: 'primary.main',
	color: 'white'
}

export default function AddToWishBtn({ name, image, id, price, styles, ...props}) {
  const {wishes} = useSelector((state) => state.user);
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
        addNewWish({
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
    dispatch(deleteWish(id));
  }

  useEffect(() => {
      const find = wishes.some((el) => el.name === name);
    if (find) setAlreadyIs(true);
    else setAlreadyIs(false);
  }, [wishes, name]);

  return (
    <>
      {!already ? (
        <Button variant="contained"  {...props}  sx={{...styles, bgcolor: 'primary.main'}} onClick={() => {
          addToWishes();          
          }}>
        <FavoriteBorder />
        </Button>
      ) : (
        <Button variant="contained" {...props} sx={{...styles, bgcolor: 'secondary.main'}} onClick={() => {
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
        <Favorite  />
          
        </Button>
      )}
    </>
  );
}
