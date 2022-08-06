import { Flex, HStack, Spacer, Button, Text, Image} from '@chakra-ui/react'
import iphone from '../Images/phone.png'
import { Link } from 'react-router-dom'

export function Landing() {
  return (
        <>
        <Flex height="60px" paddingLeft="100px" paddingRight="100px" backgroundColor="white" borderBottomColor="grey" borderBottomStyle="solid" borderBottomWidth="1px">
            <HStack as="nav" spacing="5">
                <Link to="/home">
                    <Button fontSize="15px" backgroundColor="white">Home</Button>
                </Link>
                <Button fontSize="15px" backgroundColor="white">Turno</Button>
                <Button fontSize="15px" backgroundColor="white">Contacto</Button>
                <Button fontSize="15px" backgroundColor="white">Acerca de</Button>
            </HStack>
            <Spacer/>
            <HStack as="nav" spacing="5">
                <Button fontSize="15px" width="97px" height="35px" backgroundColor="#E3FFB2;">Login</Button>
                <Button fontSize="15px" width="118px" height="35px" backgroundColor="#98D035;">Sign Up</Button>
            </HStack>
        </Flex>
        <Flex paddingTop="60px" justifyContent="center">
            <Text color= "#18191F" fontSize="45px" fontWeight="800" fontStyle="normal">Descarga la app</Text>
        </Flex>
        <Flex justifyContent="center" paddingTop="20px">
            <Image src="https://dctfcu.com/wp-content/uploads/sites/63/2018/04/google-play-logo-1518163351.png" h="40px" />
        </Flex>
        <Flex justifyContent="center" paddingTop="20px">
            <Image src={iphone} height="355px" width="780px"/>
        </Flex>
        </>
  )
}
