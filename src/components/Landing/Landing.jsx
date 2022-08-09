import { FormControl, FormLabel, Input, Flex, HStack, Spacer, Button, Text, Image, Center, useDisclosure, Modal,  ModalCloseButton, ModalFooter, ModalBody, ModalOverlay, ModalContent, ModalHeader, Stack, Select, Divider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginImage from '../../resources/assets/login.svg'
import turnoImage from '../../resources/assets/turno.svg'
import payImage from '../../resources/assets/pay.svg'
import playImage from '../../resources/assets/play.svg'

import LoginGoogle from '../GoogleLogin/GoogleLogin'
import LogoutGoogle from '../GoogleLogin/GoogleLogout'
import {gapi} from 'gapi-script'
const clientId = "927003271837-l4b8egb4pilglgk1vumu8sjsvngbkkl3.apps.googleusercontent.com"



export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [slide, setSlide] = useState('login')
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    }
    gapi.load("client:auth2", start);
  })

  return (
    <>
    <Flex height="10vh" padding='0 100px' backgroundColor="white" borderBottomColor="#F8F1F1" borderBottomStyle="solid" borderBottomWidth="1px">
      <HStack as="nav" spacing="5">
        <Link to="/home">
          <Button fontSize="15px" backgroundColor="white">Inicio</Button>
        </Link>
        <Button fontSize="15px" backgroundColor="white">Contacto</Button>
        <Button fontSize="15px" backgroundColor="white">Acerca de Nosotros</Button>
      </HStack>
      <Spacer/>
      <HStack as="nav" spacing="5">
        <Button fontSize="15px" onClick={onOpen} width="97px" height="35px" textColor="#98D035" backgroundColor="#E3FFB2;">Ingresar</Button>
        <Button fontSize="15px" width="118px" height="35px" textColor="#ffff" backgroundColor="#98D035">Registrarse</Button>
      </HStack>
    </Flex>
    <Flex flexDir="column" h='calc(100vh - 10vh)' justifyContent='center' gap='3rem'>
      <Center>
        <Text fontWeight='bold' fontSize='4xl'>
          La mejor forma de reservar tu espacio
        </Text>
      </Center>
      <Center>
        <Text fontSize='2xl'>
          Reserva tu cancha de padel sin moverte de tu casa
        </Text>
      </Center>
      <Center>
        {slide === 'login'
          ? <Image height='sm' src={loginImage} alt='Login' />
          : slide === 'turno'
          ? <Image height='sm' src={turnoImage} alt='Turno' />
          : slide === 'pay'
          ? <Image height='sm' src={payImage} alt='Pay' />
          : <Image height='sm' src={playImage} alt='Play' />
        }
      </Center>
      <Center>
        <HStack>
          <Button
            onClick={() => setSlide('login')}
            width='1px'
            height='10px'
            borderRadius='full'
            _hover={{ backgroundColor: 'brand.primary' }}
          />
          <Button
            onClick={() => setSlide('turno')}
            width='1px'
            height='10px'
            borderRadius='full'
            _hover={{ backgroundColor: 'brand.primary' }}
          />
          <Button
            onClick={() => setSlide('pay')}
            width='1px'
            height='10px'
            borderRadius='full'
            _hover={{ backgroundColor: 'brand.primary' }}
          />
          <Button
            onClick={() => setSlide('play')}
            width='1px'
            height='10px'
            borderRadius='full'
            _hover={{ backgroundColor: 'brand.primary' }}
          />
        </HStack>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor="gray.00">Iniciar sesion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel textColor="gray.600">Usuario</FormLabel>
              <Input placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="gray.600">Contraseña</FormLabel>
              <Input type="password" placeholder='Last name' />
            </FormControl>
            <ModalFooter marginTop="20px">
              <Button bgColor="#98D035" textColor="#ffff" mr={3}>
                Ingresar
              </Button>
              <Button onClick={onClose} textColor="gray.700">Cancelar</Button>
            </ModalFooter>
            <Divider margin="20px"/>
            <Center textColor="gray.500">O ingresa con:</Center>
            <Center margin="20px">
              <LoginGoogle/>
            </Center>
          </ModalBody>

        </ModalContent>
      </Modal>
    </Flex>
    </>
  )
}
