import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardActions } from "@mui/material";
import Swal from "sweetalert2";

import { AdminOrdersContainer } from "../containers";

const styles = {
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
    name: '',
    status: "",
    date: "",
  });
  const [prevValue, setPrevValue] = useState("");


  useEffect(() => {
    const queries = `filter[name]=&filter[status]=${filters.status}&filter[date]=`
    axios.get('http://localhost:3001/orders?' + queries)
    .then(data => setOrders(data))
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

  return (
    <AdminOrdersContainer>
      {orders.map((order) => (
        <Card key={order.id} sx={styles.card}>
          <CardContent sx={styles.content}>
            <div>Id: {order.id}</div>
            <div>User: {order.user}</div>
            <div>Fecha: {order.date}</div>
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
    </AdminOrdersContainer>
  );
}
