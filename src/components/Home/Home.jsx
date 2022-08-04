import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from "../Sidebar/Sidebar"
import { Flex, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid} from '@chakra-ui/react'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields)
  // console.table(allPadelField.padelField)
  useEffect(() => {
    dispatch(fetchAllOwners())
  }, [])

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  useEffect(() => {
    dispatch(fetchAllPadelFields())
  }, [])

  return (
    <Flex>
      <Sidebar/>
    <Flex margin="2.5vh">
      <Center>
        <SimpleGrid columns={3} spacing={20}>
          {
            allPadelField.padelField.map((card) => (
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
