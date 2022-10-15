import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";

import { addToCart, deleteFromCart } from "../../redux/reducers/user";

const buttonStyles = {
	backgroundColor: 'rgba(196, 42, 8 , .6)'
  }

export default function AddToCartButton({ id, price, name, picture, styles }) {
  const cartList = useSelector((state) => state.user.cartList);
	const [ alreadyIs, setAlreadyIs ] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
		const find = cartList.some(el => el.id === id);
		if(find) setAlreadyIs(true)
		else setAlreadyIs(false)
	}, [cartList, id]);

  function handleAdd() {
    const data = {
      id,
      name,
      price,
      picture,
    };
    dispatch(addToCart(data));
  }

  function handleDelete() {
    dispatch(deleteFromCart(id));
  }

  return (
		<>
			{
				!alreadyIs 
					? (
						<IconButton sx={{...styles, color: "#32CD32"}} onClick={handleAdd}>
							<AddShoppingCart/>
						</IconButton>
					)
					: (
						<IconButton color='primary' sx={{...styles, color: "#32CD32"}} onClick={handleDelete}>
							<RemoveShoppingCart />
						</IconButton>
					)
			}
		</>
	);
}
