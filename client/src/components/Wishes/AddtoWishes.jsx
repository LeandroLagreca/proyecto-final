import { Box, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToWishes } from '../../redux/reducers/videoGame';
import Card from '../Cards/Card';



const Wishes = () => {
    const wishes = useSelector((state) => state.videogames.wishes);
    const dispatch = useDispatch()
    
    return(
        <div>
            <Box
            display= "flex"
            flexDirection={"row"}
            >
                {
                wishes.map((e, index) => {
                    return(
                        <Box key={index}>
                            <ul style={{  display: "flex", flexWrap: "wrap", justifyContent:"center", listStyle: "none"}} >
                                <li >{<Card name={e.name} description={e.description} background_image={e.background_image} price={e.price} />}
                                
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


export default Wishes;