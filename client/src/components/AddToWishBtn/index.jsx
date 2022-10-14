import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

import { addWishes, removeWishes } from "../../redux/actions/videoGame";

const buttonStyles = {
  backgroundColor: 'rgba(65, 173, 56, .6)'
}

export default function AddToWishBtn({ name, image, id, price, styles }) {
  const wishes = useSelector((state) => state.videogames.wishes);
  const [already, setAlreadyIs] = useState(false);
  const dispatch = useDispatch();

  const addToWishes = () => {
    dispatch(
      addWishes({
        name,
        image,
        id,
        price
      })
    );
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
        <IconButton color='primary' sx={{...styles, ...buttonStyles}} onClick={addToWishes}>
          <FavoriteBorder />
        </IconButton>
      ) : (
        <IconButton color='primary' sx={{...styles, ...buttonStyles}} onClick={handleDelete}>
            <Favorite />
          
        </IconButton>
      )}
    </>
  );
}
