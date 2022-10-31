import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import ComposedTextField from './CreateForm';
import { Drawer } from '@mui/material';

export default function FloatingActionButtons() {

    const [state, setState] = React.useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
          role="presentation"
          onClick={toggleDrawer(anchor, true)}
          onKeyDown={toggleDrawer(anchor, true)}
        >
            <ComposedTextField/> 
        </Box>
      );
    
      return (
        <div>
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
            <Fab color="secondary" aria-label="edit">
             <EditIcon onClick={toggleDrawer(anchor, true)}>{anchor}
            </EditIcon>
            </Fab>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      );


















//     const [open, setOpen] = useState(false);
//     function handleIconButton() {
//         setOpen(true);
//       }
    
//       function handleOut() {
//         setOpen(false);
//       }
//   return (

//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <Fab color="secondary" aria-label="edit">
//         <EditIcon onClick={handleIconButton}>
//         </EditIcon>
//       </Fab>
//       {open===true ? <ComposedTextField/> 
//       : null}
//     </Box>
//   );
}










