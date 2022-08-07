import { Flex, HStack, Spacer, Button, Text, Image, Center} from '@chakra-ui/react'
import iphone from '../Images/phone.png'
import { Link } from 'react-router-dom'

export function Landing() {
  return (
        <>
        <Flex height="60px" paddingLeft="100px" paddingRight="100px" backgroundColor="white" borderBottomColor="#F8F1F1" borderBottomStyle="solid" borderBottomWidth="1px">
            <HStack as="nav" spacing="5">
                <Link to="/home">
                    <Button fontSize="15px" backgroundColor="white">Inicio</Button>
                </Link>
                <Button fontSize="15px" backgroundColor="white" >Turno</Button>
                <Button fontSize="15px" backgroundColor="white">Contacto</Button>
                <Button fontSize="15px" backgroundColor="white">Acerca de Nosotros</Button>
            </HStack>
            <Spacer/>
            <HStack as="nav" spacing="5">
                <Button fontSize="15px" width="97px" height="35px" textColor="#98D035" backgroundColor="#E3FFB2;">Ingresar</Button>
                <Button fontSize="15px" width="118px" height="35px"  textColor="#ffff" backgroundColor="#98D035">Registrarse</Button>
            </HStack>
        </Flex>
        <Flex flexDir="column" h="95vh">
            <Center paddingTop="60px" justifyContent="center">
                <Text color= "#18191F" fontSize="45px" fontWeight="800" fontStyle="normal">Descarga la app</Text>
            </Center>
            <Center marginTop="30px">
                <Image src="https://dctfcu.com/wp-content/uploads/sites/63/2018/04/google-play-logo-1518163351.png" h="40px" />
            </Center >
            <Center  marginTop="200px" >
                <Image src={iphone}/>
            </Center >
        </Flex>
        </>
  )
}
