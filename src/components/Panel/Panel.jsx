import { Flex, Text } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'

export default function Panel() {
  return (
    <>
      <NavBar/>
      <Flex>
        <Sidebar/>
        <Flex width='100%' justifyContent='center' flexDir="column" alignSelf='flex-start'>
          <Text>Hola</Text>
        </Flex>
      </Flex>
    </>
  )
}
