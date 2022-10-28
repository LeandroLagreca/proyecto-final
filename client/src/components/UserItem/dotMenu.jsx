import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getGames} from '../../redux/actions/videoGame';
import {
  IconButton,
	MenuItem,
	Menu,
} from "@mui/material";
import { MoreVert, DeleteForever } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";
import{auth} from '../../firebase/credenciales';
import {OrderByStock} from '../../redux/reducers/videoGame';

export default function DotMenu({id}) {
  const allVideoGames = useSelector((state)=> state.games)
  const dispatch = useDispatch();
  const [/*order*/, setOrder]= useState('');
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    function requestNewPassword(email) {
      const actionCodeSettings = {
        url: 'http://localhost:3000/user/',
        handleCodeInApp: true,
      };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
	};

  useEffect(()=>{
    dispatch(getGames())
},[dispatch])


  const handleOrderStock =(e)=>{
    dispatch(OrderByStock(e.target.value))
    setOrder(e.target.value);
};


	function requestNewEmail() {
		// axios.put("http://localhost:3001/user/");
		alert('Cambiar email')
	}

    function handleDelete(id) {
        // axios.delete("http://localhost:3001/user/" + id);
        alert('Seguro que quieres eliminar este usuario?')
      }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				<MenuItem onClick={requestNewPassword}>
					Cambiar contraseña
				</MenuItem>
				<MenuItem onClick={requestNewEmail}>
					Cambiar email
				</MenuItem>
				<MenuItem onClick={handleDelete}>
                Eliminar usuario
                <DeleteForever />
				</MenuItem>
      </Menu>

        <div> 
          {allVideoGames.map((e)=>{
          return (
            <div key = {e.name}>
              name={e.name}
              stock={e.stock}
    </div>
          )
        })
        }
        </div>
        

        <select onChange={e => handleOrderStock(e)}>
                <option hidden>Stock</option>
                <option value='min'>Min</option>
                <option value='max'>Max</option>
      </select>
    </div>
  )
}
