import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Cards/Card';

const Purchases = () => {
    const purchases = useSelector((state) => state.user.purchases);
    
    return(
        <div>
            <Box
            display= "flex"
            flexDirection={"row"}
            >
                {
                purchases.map((e, index) => {
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
        </div>
    )
}


export default Purchases;