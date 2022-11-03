import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import { Card, CardContent, Box, Typography, Container } from "@mui/material";

import { AdminOrdersContainer } from "../../containers";

const styles = {
  cardContainer: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    paddingTop: 2
},
  card: {
    width: 500,
    height: 'max-content',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingY: 3
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 1,
  },
};
export default function AdminOrders() {
	const { id } = useSelector(state => state.user)
  const [ orders, setOrders ] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/orders/user/'+ id)
    .then(response => setOrders(response.data.PurchaseOrders))
    .catch(() => setOrders([]))
  }, [id])

  return (
    <AdminOrdersContainer>
      <Container sx={styles.cardContainer}>
        {orders.map((order) => (
          <Card key={order.id} sx={styles.card}>
            <CardContent sx={styles.content}>
              <div variant='h6' textAlign={'start'}>Id: {order.id}</div>
              <div>Fecha: {order.date}</div>
              <div>
                <Typography variant='h6' textAlign={'start'}>Productos:</Typography>
                <Container sx={{display:'flex', flexDirection:'column', gap: 2}}>
                  {
                    order.games.map(el => (
                      <Box display='flex' flexDirection='column' alignItems={'flex-start'} >
                        <div>Name: {el.name}</div>
                        <div>Price: {el.price} x{el.cant}</div>
                      </Box>
                    ))
                  }
                </Container>
              </div>
              <Typography variant='h6' textAlign={'start'}>Total: {order.totalprice}</Typography>
              <div>Status: {order.status}</div>
            </CardContent>
          </Card>
        ))}
      </Container>
    </AdminOrdersContainer>
  );
}
