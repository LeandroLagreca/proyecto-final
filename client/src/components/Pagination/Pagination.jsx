import { Pagination, Box } from '@mui/material';
import {React, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../Cards/Card';
import { getGames } from '../../redux/actions/videoGame';


const Paginated = () => {
    const allGames = useSelector((state) => state.videogames.games)

//     j

    
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(5);
    const indexOfLastGame = gamesPerPage * page; // 10
    const indexOfFirtsGame = indexOfLastGame - gamesPerPage // 0
    const currentGames = allGames.slice(indexOfFirtsGame, indexOfLastGame)
    
    
    // let pageNumbers = 0;
    

    // for (let i = 1; i <= Math.ceil(allGames/gamesPerPage)  ; i++) {
    //     pageNumbers ++;
    // };
    
    const Paginated = (e, p) => {
        setGamesPerPage(5)
        setPage(p)
    }
    
    useEffect(() => {
        dispatch(getGames())
    })
    
    
    
    
    return(
        <div style={{textAling: "center", justifyContent: "center"}} >
            <Pagination style={{ display: "flex", textAling: "center", justifyContent: "center"}} count={5} variant="outlined" shape="rounded" onChange={Paginated}/>
            <Box 
              display= "flex"
              flexDirection={"row"}
            >

             {currentGames?.map((e, index) => {
                return(
                    <Box key={index}>
                        <ul style={{  display: "flex", flexWrap: "wrap", justifyContent:"center", listStyle: "none"}} >
                            <li >{<Card  background_image={e.background_image} name={e.name} price={e.price} description={e.description}  />}</li>
                        </ul>
                    </Box>
                    )
            })}
            </Box>
        </div>
    )
}

export default Paginated;