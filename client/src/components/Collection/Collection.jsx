import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Cards/Card';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Collection = () => {
    const collection = useSelector((state) => state.user.collection);
    
    return(
        <div>
            <Sidebar></Sidebar>
            <Box
            display= "flex"
            flexDirection={"row"}
            >
                {
                collection.map((e, index) => {
                    return(
                        <Box key={index}>
                            <ul style={{  display: "flex", flexWrap: "wrap", justifyContent:"center", listStyle: "none"}} >
                                <li >{<Card 
                                        name={e.name}
                                        description={e.description}
                                        background_image={e.image}
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
            <Footer></Footer>
        </div>
    )
}


export default Collection;