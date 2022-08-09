import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'

export default function ReservePadelField() {
  return (
    <>
    <NavBar/>
    <Flex>
      <Sidebar/>
      <Flex bg='red' width='100%' margin='12vh 10vw 0vh 10vw' justifyContent='center' flexDir="column" alignSelf='flex-start'>
        <Center>
          <Stack>
            <HStack>
              
            </HStack>
          </Stack>
        </Center>
        <Text>
          HOla
        </Text>
      </Flex>
    </Flex>
    </>
  )
}
