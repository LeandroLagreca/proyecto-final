import { ForkLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Cards/Card';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Purchases = () => {
    const purchases = useSelector((state) => state.user.purchases);

    console.log(purchases)
    
    return(
        <div>
            {/* <Sidebar></Sidebar>
           
           
            <Container sx={{marginTop:"10px"}}>
            <Typography variant="caption" display="flex" mb={1}>
            <Link className="redir" to={"/home"}>
              HOME  {' >>'}
            </Link>
            <Typography
              variant="caption"
              ml={1}
              mr={1}
              color={"darkgray"}
            ></Typography>
            PURCHASES
          </Typography>
            <Box
            display= "flex"
            flexDirection={"row"}
            >
                {
                purchases.map((e, index) => {
                    return(
                        <Box key={index}>
                            <ul style={{  display: "flex", flexWrap: "wrap", justifyContent:"center", listStyle: "none", marginLeft:"5px", marginTop:"10px"}} >
                                <li >{<Card 
                                        name={e.name}
                                        description={e.description}
                                        background_image={e.picture}
                                        price={e.price}
                                        id={e.id}
                                    />}
                                
                                </li>
                            </ul>
                        </Box>
                        )
                    })
                }
            </Box>
            </Container>
            <Footer></Footer> */}
        </div>
    )
}


export default Purchases;