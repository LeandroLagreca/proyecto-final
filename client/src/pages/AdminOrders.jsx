import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardActions, Box } from '@mui/material'
export default function AdminOrders() {
  const [ orders, setOrders ] = useState([
    {
      id: 'asdasdkuh3i3',
      user: 'user1pro',
      date: '27/09/2022',
      status: 'finalizada'
    },
    {
      id: 'bvmp23958nb',
      user: 'userComprando',
      date: '18/10/2022',
      status: 'recibida'
    },
    {
      id: 'afgh23ewe2fcv5n',
      user: 'userDeejemplogamer',
      date: '17/10/2022',
      status: 'en proceso'
    }
  ])

  async function getOrders() {
    const allOrders = await axios.get('http://localhost:3001/orders')
    setOrders(allOrders)
  }

  // useEffect(() => {
  //   getOrders()
  // }, [])

  function changeStatus(id, e) {
    const value = e.target.value
    // axios.put('http://localhost:3001/orders/' + id, {
    //   status: value
    // } )
  }

  return (
    <Box>
      {
        orders.map((order) => (
            <Card key={order.id} sx={{ width: 275 }}>
              <CardContent>
                <div>
                  <div>Id: {order.id}</div>
                  <div>User: {order.user}</div>
                  <div>Fecha: {order.date}</div>
                  <div>Status: {order.status}</div>
                </div>
              </CardContent>
              <CardActions>
                <select defaultValue={order.status} onChange={(e) => changeStatus(order.id, e)}>
                  <option value="recibida">Recibida</option>
                  <option value="en proceso">En proceso</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </CardActions>
            </Card>
        ))
      }
    </Box>
  )
}
