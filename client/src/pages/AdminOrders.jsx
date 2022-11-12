import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, FormControl, Select, MenuItem, InputLabel, Input, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";

import { AdminLayout } from "../components";
import { Container } from "@mui/system";

const styles = {
  cardContainer: {
    width:'max-content',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    paddingTop: 2,
    mx:'auto'
},
  card: {
    maxWidth: 350,
    height: 'max-content',
    display: "flex",
    flexWrow:1,
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
  const [ orders, setOrders ] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    date: "",
  });
  const [prevValue, setPrevValue] = useState("");

  useEffect(() => {
    const queries = `filter[name]=${filters.name}&filter[status]=${filters.status}&filter[date]=`
    axios.get('http://localhost:3001/orders?' + queries)
    .then(response => setOrders(response.data))
    .catch(() => setOrders([]))
  }, [filters])

  function saveValue(e) {
    setPrevValue(e.target.value);
  }

  function changeStatus(id, e) {
    const value = e.target.value
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: true,
      title: `Seguro que quieres cambiar el estado de la orden ${id}?`,
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('http://localhost:3001/orders/' + id, {
          status: value
        } )
      } else if (result.isDismissed) {
        e.target.value = prevValue;
      }
    });
  }

  function handleFilters(e) {
    const value = e.target.value
    const name = e.target.name
      setFilters(prev => ({
        ...prev,
        [name] : value
      }))
  }

  return (
    <AdminLayout>
        <Container sx={{display:'flex'}} component={'form'}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Name</InputLabel>
            <Input onChange={handleFilters} name='name' />
          </FormControl>
        </Container>
        <Container sx={styles.cardContainer}>
          {orders.map((order) => (
            <Card key={order.id} sx={styles.card}>
              <CardContent sx={styles.content}>
                <div variant='h6' textAlign={'start'}>Id: {order.id}</div>
                <Typography variant='h6' textAlign={'start'}>User: {order.user.name}</Typography>
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
              <CardActions>
                <select
                  onClick={saveValue}
                  defaultValue={order.status}
                  onChange={(e) => changeStatus(order.id, e)}
                >
                  <option value="created">Creada</option>
                  <option value="inprocess">En proceso</option>
                  <option value="completed">Finalizada</option>
                  <option value="canceled">Cancelada</option>
                </select>
              </CardActions>
            </Card>
          ))}
        </Container>
    </AdminLayout>
  );
}
