import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields, filterByType, orderByPrice, orderByAvailability } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from "../Sidebar/Sidebar"
import { Flex, HStack, Box, Button, Stack, Select, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid, Spacer} from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields)
  const [currentPage, setCurrentPage] = useState(1)
  // console.table(allPadelField.padelField)
  useEffect(() => {
    dispatch(fetchAllOwners())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPadelFields(currentPage))
  }, [])

  return (
    <>
    <NavBar/>
    <Flex>
      <Sidebar currentPage={currentPage}/>
      <Flex width='100%' margin='12vh 10vw 0vh 10vw' justifyContent='center' flexDir="column" alignSelf='flex-start'>
        <SimpleGrid marginLeft='75px' spacing={20} columns={{ base: 1, lg: 2, xl: 3 }}>
          {
            allPadelField.padelField?.map((card) => (
              <CardPadel
                key={card.id}
                id={card.id}
                location={card.location}
                image={card.image}
                name={card.name}
                type={card.type}
                price={card.price}
              />
            ))
          }
        </SimpleGrid>
      </Flex>
    </Flex>
    </>
  )
}
