import React from 'react'
import { Container } from '@mui/material'

const styles = {
    container: {
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        paddingTop: 2
    }
}

export default function AdminOrdersContainer({children}) {
  return (
    <Container sx={styles.container}>{children}</Container>
  )
}
