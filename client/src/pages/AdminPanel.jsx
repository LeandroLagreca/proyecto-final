import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminContainer } from '../containers'
import { Users, AdminGames, AdminOrders } from './'
import { AdminNavBar } from '../components'

const paths = {
  admin: 'admin',
  users: '/users',
  games: '/games',
  orders: '/orders'
}

export default function AdminPanel() {
  return (
    <AdminContainer>
        <AdminNavBar />
        <Routes>
          <Route path={paths.users} element={<Users />} />
          <Route path={paths.games} element={<AdminGames />} />
          <Route path={paths.orders} element={<AdminOrders />} />
        </Routes>
    </AdminContainer>
  )
}
