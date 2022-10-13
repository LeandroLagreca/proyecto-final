import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";

import { addToCart, deleteFromCart } from "../../redux/reducers/user";

export default function AddToCartButton({ id, price, name, picture }) {
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
						<IconButton onClick={handleAdd}>
							<AddShoppingCart/>
						</IconButton>
					)
					: (
						<IconButton onClick={handleDelete}>
							<RemoveShoppingCart />
						</IconButton>
					)
			}
		</>
	);
}
