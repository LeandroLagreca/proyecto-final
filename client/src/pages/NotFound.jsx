import React from 'react'
import { Footer } from '../components'
import ErrorNotFound from '../components/ErrorNotFound/ErrorNotFound'
import Sidebar from '../components/Sidebar/Sidebar'
const NotFound = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <ErrorNotFound/>
      <Footer></Footer>
      </div>
  )
}

export default NotFound