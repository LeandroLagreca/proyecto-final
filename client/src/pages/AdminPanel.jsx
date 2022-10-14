import React from 'react'

import { AdminContainer } from '../containers'
import { Users } from './'
import { AdminNavBar } from '../components'

export default function AdminPanel() {
  return (
    <AdminContainer>
        <AdminNavBar />
        <Users />
    </AdminContainer>
  )
}
