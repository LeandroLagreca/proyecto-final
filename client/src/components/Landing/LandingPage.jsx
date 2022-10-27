import { Box, Button, IconButton } from '@mui/material';
import React from 'react';
import "./LandingPage.css"
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';








const LandingPage = () => {
    
    
    return(
        <Box className='landing'>
           <div className='btnContainer'>
                <Link to={"/home"}
                underline="none"
                >
                    <Button className="btn" color='secondary' sx={{
                        backgroundColor: "white"
                        }}>Get started 
                        <SportsEsportsIcon/>
                    </Button>
                </Link>
           </div>

        </Box>
    )

    }


export default LandingPage;