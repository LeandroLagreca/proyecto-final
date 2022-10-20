import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { DiscountsContainer } from '../containers'

import { getDiscounts } from '../redux/actions/videoGame'

import { Card } from '../components'
import { Container, Box, Input } from '@mui/material'

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
    width: 990,
    height: 10
  },
  input: {
    opacity: 0
  },
  inputBox: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  }
}

export default function Discounts() {
  // const { discounts } = useSelector(state => state.videogames)
  const [banner, setBanner] = useState(null)

  const discounts = [
    {
      name: 'Juegooo',
      background_image: 'aaa',
      discount: {
        state: true,
        prevPrice: 2800,
        currentPrice: 1300
      }
    },
    {
      name: 'ola',
      background_image: 'aaa',
      discount: {
        state: false,
        prevPrice: null,
        currentPrice: null
      }
    },
    {
      name: 'ola',
      background_image: 'aaa',
      discount: {
        state: true,
        prevPrice: 1600,
        currentPrice: 1200
      }
    },
    {
      name: 'ola',
      background_image: 'aaa',
      discount: {
        state: true,
        prevPrice: 2800,
        currentPrice: 1300
      }
    },
  ]

  function loadBanner() {
    const { data } = axios.get()
    setBanner(data)
  }

  useEffect(() => {
    getDiscounts()
    // loadBanner()
  }, [])

  function handleInput(e) {
    const value = e.target.files[0]
    let blob = new Blob([value], {type: value.type})
    let reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function() {
      setBanner(reader.result)
    };
  }

  return (
    <DiscountsContainer>
      <div>
        <img className={styles.banner} src={banner} alt="Banner de descuentos" />
        <Container sx={styles.inputContainer}>
          <Box sx={styles.inputBox}>{!banner ? 'Selecciona un archivo' : 'Archivo seleccionado'}</Box>
          <Input sx={styles.input} type={'file'} onChange={handleInput} />
        </Container>
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
