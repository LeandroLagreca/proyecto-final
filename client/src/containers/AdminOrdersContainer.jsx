import React from 'react'
import { Container } from '@mui/material'

const styles = {
    container: {
        minHeight: '80vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }
}

export default function AdminOrdersContainer({children}) {
  return (
    <Container sx={styles.container}>{children}</Container>
  )
}
