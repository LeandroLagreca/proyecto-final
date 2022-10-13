import React from 'react'
import { Container } from '@mui/material'

export default function AdminContainer({children, ...props}) {
  return (
    <Container {...props}>
        {children}
    </Container>
  )
}
