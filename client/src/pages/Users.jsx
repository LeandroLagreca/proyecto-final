import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, FormControl, Select, MenuItem, InputLabel, Input } from "@mui/material";
import { UsersContainer } from '../containers'
import { UsersList } from '../sections'
import { AdminLayout } from '../components';

export default function Users() {
  const [ users, setUsers ] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    admin: "",
    date: "",
  });

	useEffect(() => {
    const queries = `filter[name]=${filters.name}`
		axios.get('http://localhost:3001/user?' + queries)
    .then(response => {
      if(Array.isArray(response.data)) {
        setUsers(response.data)
      } else {
        setUsers([])
      }
    })
	}, [filters])

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
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.admin}
              onChange={handleFilters}
              name="status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='created'>Creada</MenuItem>
              <MenuItem value='inprocess'>En proceso</MenuItem>
              <MenuItem value='canceled'>Cancelada</MenuItem>
              <MenuItem value='finalized'>Finalizada</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Name</InputLabel>
            <Input value={filters.name} onChange={handleFilters} name='name' />
          </FormControl>
        </Container>
          <UsersList users={users} />
    </AdminLayout>
  )
}
