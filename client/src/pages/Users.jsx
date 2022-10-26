import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, FormControl, Select, MenuItem, InputLabel, Input } from "@mui/material";
import { UsersContainer } from '../containers'
import { UsersList } from '../sections'

export default function Users() {
  // const [ users, setUsers ] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    admin: "",
    date: "",
  });

	const users = [
		{
			id: 1,
			username: 'Userjuju',
			email: 'ola2@gmail.com',
			admin: 'true'
		},
		{
			id: 2,
			username: 'asldkjasd',
			email: 'ola@gmail.com',
			admin: 'false'
		}
	]

	useEffect(() => {
    const queries = `filter[name]=${filters.name}`
		axios.get('http://localhost:3001/user?' + queries)
    // .then(response => setUsers(response.data))
	}, [])

  function handleFilters(e) {
    const value = e.target.value
    const name = e.target.name
      setFilters(prev => ({
        ...prev,
        [name] : value
      }))
  }

  return (
    <UsersContainer>
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
    </UsersContainer>
  )
}
