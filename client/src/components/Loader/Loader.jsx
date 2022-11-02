import React from 'react'
import { Box } from '@mui/material'
import gif from '../../assets/loader.gif'

const Loader = () => {
  return (
    <Box sx={{width: '100%', height:'100%'}} >
      <img src={gif} alt='cargando...'/>
    </Box>
  )
}

export default Loader