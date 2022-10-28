import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, FormControl, Select, MenuItem, InputLabel, Input, Box } from "@mui/material";
import Swal from "sweetalert2";

import { AdminOrdersContainer } from "../containers";
import { Container } from "@mui/system";

const styles = {
  cardContainer: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    paddingTop: 2
},
  card: {
    width: 275,
    height: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
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
  console.log(orders)

  useEffect(() => {
    console.log(filters)
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
    <AdminOrdersContainer>
      <Container sx={{display:'flex'}} component={'form'}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={handleFilters}
            name="status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='created'>Creada</MenuItem>
            <MenuItem value='inprocess'>En proceso</MenuItem>
            <MenuItem value='canceled'>Cancelada</MenuItem>
            <MenuItem value='completed'>Finalizada</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Name</InputLabel>
          <Input onChange={handleFilters} name='name' />
        </FormControl>
      </Container>
      <Container sx={styles.cardContainer}>
        {orders.map((order) => (
          <Card key={order.id} sx={styles.card}>
            <CardContent sx={styles.content}>
              <div>Id: {order.id}</div>
              <div>User: {order.user.name}</div>
              <div>Fecha: {order.date}</div>
              <div>Productos: {
                  order.games.map(el => (
                    <Box sx={{display: 'flex'}}>
                      <div>Name: {el.name}</div>
                      <div>Price: {el.price} x{el.cant}</div>
                    </Box>
                  ))
                }</div>
              <div>Total: {order.totalprice}</div>
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
    </AdminOrdersContainer>
  );
}
