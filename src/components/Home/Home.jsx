import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import SearchBar from "../SearchBar/SearchBar";
import CardPadel from '../CardPadel/CardPadel.jsx'
import { FiMenu } from "react-icons/fi";
import { Flex , Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid} from '@chakra-ui/react'

export default function Home() {

  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields)
  console.table(allPadelField.padelField)
  useEffect(() => {
    dispatch(fetchAllOwners())
  }, [])

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  useEffect(() => {
    dispatch(fetchAllPadelFields())
  }, [])

  const [navSize, changeNavSize] = useState("large")

  return (
    <div>
      <Flex 
        pos="sticky" 
        left="5" 
        h="95" 
        marginTop="2.5vh" 
        w={navSize == "small" ? "75px" : "400px"}
        flexDir="column" 
        justifyContent="space-between">
        <Flex 
            p="5%" 
            flexDir="column" 
            alignItems="flex-start" 
            as="nav">
              <IconButton 
                backgroun="none" 
                mt={5} 
                _hover={{backgroun:"none"}}
                icon={<FiMenu />}  
                onClick={()=>{
                  if (navSize == "small") changeNavSize("large")
                  else changeNavSize("small")
                }}
          />
        </Flex>
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alingItems="flex-start"
          mb={4}
        >
          <Divider/>
          <Flex mt={4} align="center">
            <Avatar/>
            <Flex>
              <Heading as="h3" size="sm">Mati Ferrari</Heading>
              <Text color="gray">Admin</Text>
            </Flex>
          </Flex>
          
        </Flex>
      </Flex>
      <Center>
        <SimpleGrid columns={3} spacing={20}>
          {
            allPadelField.padelField.map((card) => (
              <CardPadel
                key={card.id}
                id={card.id}
                location={card.location}
                image={card.image}
                owner={card.owner}
              />
            ))
          }
        </SimpleGrid>
      </Center>
    </div>
  )
}
