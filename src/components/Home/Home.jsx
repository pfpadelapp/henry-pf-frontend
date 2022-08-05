import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields, filterByType, orderByPrice, orderByAvailability } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from "../Sidebar/Sidebar"
import SearchBar from "../SearchBar/SearchBar"
import { Flex, Stack, Select, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid} from '@chakra-ui/react'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields)
  //console.table(allPadelField.padelField)
 
  useEffect(() => {
    dispatch(fetchAllOwners())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPadelFields())
  }, [])

  function handleFilterType(e){
    e.preventDefault();
    dispatch(filterByType(e.target.value))
}

  function handleOrderPrice(e){
    e.preventDefault();
    dispatch(orderByPrice(e.target.value))
}
  
  function handleOrderAvailability(e){
    e.preventDefault();
    dispatch(orderByAvailability(e.target.value))
}

  return (
    <Flex>
      <Sidebar/>
      <Stack spacing={3}>
        <Select variant='filled' placeholder='Tipo' size='md' onChange={e => handleFilterType(e)}>
           <option value='covered'>Techada</option>
           <option value='uncovered'>Sin Techo</option>
        </Select>
        <Select variant='filled' placeholder='Price' size='md' onChange={e => handleOrderPrice(e)}>
           <option value='1'>Ascendente</option>
           <option value='min'>Descendiente</option>
        </Select>
        <Select variant='filled' placeholder='Disponibilidad' size='md' onChange={e => handleOrderAvailability(e)}>
           <option value='1'>Disponible</option>
           <option value='0'>No disponible</option>
        </Select>
      </Stack>
      <SearchBar/>
    <Flex margin="2.5vh">
      <Center>
        <SimpleGrid columns={3} spacing={20}>
          {
            allPadelField.padelField?.map((card) => (
              <CardPadel
                key={card.id}
                id={card.id}
                location={card.location}
                image={card.image}
                name={card.name}
                type={card.type}
              />
            ))
          }
        </SimpleGrid>
      </Center>
    </Flex>
    </Flex>
  )
}
