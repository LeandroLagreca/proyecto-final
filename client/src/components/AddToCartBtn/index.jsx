import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";

import { addToCart, deleteFromCart } from "../../redux/reducers/user";
import Swal from "sweetalert2";

const buttonStyles = {
  bgcolor: "primary.main",
  color: "white",
};

export default function AddToCartButton({
  id,
  price,
  name,
  picture,
  styles,
  ...props
}) {
  const cartList = useSelector((state) => state.user.cartList);
  const user = useSelector((state) => state.user.status);
  const [alreadyIs, setAlreadyIs] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const find = cartList.some((el) => el.id === id);
    if (find) setAlreadyIs(true);
    else setAlreadyIs(false);
  }, [cartList, id]);

  function handleAdd() {
      const data = {
        id,
        name,
        price,
        picture,
        cant: 1,
      };

      dispatch(addToCart(data));

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Was added to the cart ",
        animation: false,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
  }

  function handleDelete() {
	Swal.fire({
        title: 'Estas seguro de borrar este producto?',
        icon: 'info',
        toast: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteFromCart(id))
          Swal.fire({
            toast: true,
            icon: "error",
            title: "Was deleted to the cart",
            animation: false,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
  }

  return (
    <>
      {!alreadyIs ? (
        <Button
          {...props}
          sx={{ ...styles, ...buttonStyles }}
          onClick={() => {
            handleAdd();
          }}
        >
          <AddShoppingCart />
        </Button>
      ) : (
        <Button
          {...props}
          color="primary"
          sx={{ ...styles, ...buttonStyles }}
          onClick={() => {
            handleDelete();
          }}
        >
          <RemoveShoppingCart />
        </Button>
      )}
    </>
  );
}
