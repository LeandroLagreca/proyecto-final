import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DiscountsContainer } from '../containers'

import { getDiscounts } from '../redux/actions/videoGame'

import { Card } from '../components'
import { Container, Box, Input, Button } from '@mui/material'

const styles = {
  banner: {
    width: 40,
    height: 'auto'
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    justifyItems: "center",
    paddingX: 10,
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 220,
    height: 40,
    marginY: 2
  },
  input: {
    opacity: 0,
    width: '100%',
    height: '100%'
  },
  inputBox: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    width: 'max-content',
    height: 'max-content',
    padding: 1,
    border: '1px solid red',
    borderRadius: '9px'
  }
}

export default function Discounts() {
  const { discounts } = useSelector(state => state.videogames)
  const { admin } = useSelector(state => state.user)
  const [banner, setBanner] = useState(null)
  const [ inputValue, setInputValue ] = useState(null)

  const navigate = useNavigate()

  function loadBanner() {
    const { data } = axios.get()
    setBanner(data)
  }

  useEffect(() => {
    navigate('/home')
    getDiscounts()
    // loadBanner()
  }, [navigate])

  function handleInput(e) {
    setInputValue(e.target.files[0])
  }

  function handleUpload() {
    let blob = new Blob([inputValue], {type: inputValue.type})
    let reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function() {
      setBanner(reader.result)
    };
    setInputValue(null)
  }

  return (
    <DiscountsContainer>
      <div>
        <img className={styles.banner} src={banner} alt="Banner de descuentos" />
        {
          admin && (
            <>
              <Container sx={styles.inputContainer}>
                <Box sx={styles.inputBox}>{!inputValue ? 'Selecciona un archivo' : 'Archivo seleccionado'}</Box>
                <Input sx={styles.input} type={'file'} onChange={handleInput} />
              </Container>
              <Button onClick={handleUpload} variant='contained' color='success'>Subir imagen</Button>
            </>
         )
        }
      </div>
      <Box sx={styles.container}>
        {
          discounts.map(game => (
            <Card name={game.name} background_image={game.background_image} />
          ))
        }
      </Box>
    </DiscountsContainer>
  )
}
