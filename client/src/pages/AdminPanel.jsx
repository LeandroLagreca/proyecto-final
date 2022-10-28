import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AdminContainer } from '../containers'
import { Users, AdminGames, AdminOrders } from './'
import { AdminNavBar, Footer, Loader } from '../components'
import { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

const paths = {
  admin: 'admin',
  users: '/users',
  games: '/games',
  orders: '/orders'
}

export default function AdminPanel() {
  const { admin } = useSelector(state => state.user)

  // if(!admin) return <h1>No tienes los permisos necesarios</h1>

  return (
    <AdminContainer>
      {/* {
        !admin ? <></> : <AdminNavBar />
      } */}
      <AdminNavBar />
      <Sidebar></Sidebar>
        <Routes>
          <Route path={paths.users} element={<Users />} />
          <Route path={paths.games} element={<AdminGames />} />
          <Route path={paths.orders} element={<AdminOrders />} />
        </Routes>
        <Footer></Footer>
    </AdminContainer>
  )
}
