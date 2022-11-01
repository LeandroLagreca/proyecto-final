import React from 'react'
import { Box } from '@mui/material'
import gif from '../../assets/loader.gif'

const Loader = () => {
  return (
    <Box sx={{minWidth:"700px", maxWidth:"700px", minHeight:"1200px", maxHeigth:"600px"}} >
      <img src={gif} alt='cargando...'/>
    </Box>
  )
}

export default Loader