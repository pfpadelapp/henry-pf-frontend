import { FormControl, FormLabel, Input, Flex, HStack, Spacer, Button, Text, Image, Center, useDisclosure, Modal,  ModalCloseButton, ModalFooter, ModalBody, ModalOverlay, ModalContent, ModalHeader, Stack, Select, Divider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginImage from '../../resources/assets/login.svg'
import turnoImage from '../../resources/assets/turno.svg'
import payImage from '../../resources/assets/pay.svg'
import playImage from '../../resources/assets/play.svg'
import LoginButton from '../LoginButton/LoginButton'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from "@chakra-ui/color-mode"


export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [slide, setSlide] = useState(1)
  const {colorMode, toggleColorMode}= useColorMode();


  return (
    <>
    <Flex width='100%' height="10vh" padding='0 100px' backgroundColor={colorMode === "dark" ? "#2c313d" : "white"} borderBottomColor="#F8F1F1">
      <HStack as="nav" spacing="5">
        <Link to="/home">
        <Button fontSize="15px" backgroundColor={colorMode === "dark" ? "#2c313d" : "white"}>Inicio</Button>
        </Link>
        <Button fontSize="15px" backgroundColor={colorMode === "dark" ? "#2c313d" : "white"}>Contacto</Button>
        <Button fontSize="15px" backgroundColor={colorMode === "dark" ? "#2c313d" : "white"}>Acerca de Nosotros</Button>
      </HStack>
      <Spacer/>
      <HStack as="nav" spacing="5">
        <LoginButton/>
        <Button
          fontSize="15px"
          onClick={onOpen}
          width="118px"
          height="35px"
          textColor={colorMode === "dark" ? "#F8F8F8" : "#2c313d"}
          backgroundColor="#98D035"
          _hover={{ color: '#98D035', backgroundColor: '#E3FFB2' }}
          _active={{ color: '#98D035', backgroundColor: '#E3FFB2' }}
        >Registrarse</Button>
          <ToggleColorMode/>
      </HStack>
    </Flex>
    <Flex
      flexDirection={{ base: 'column', md: 'column', xl: 'row' }}
      width='100%'
      height='calc(100vh - 20vh)'
      justifyContent='center'
      alignItems='center'
      gap={{ xs: '1rem', base: '2rem', lg: '3rem', xl: '7rem' }}
      margin={{ base: '4rem 0', md: '3rem 0', xl: '0' }}>
      <Flex flexDirection='column' width={{ base: '80%', md: '80%', xl: '35%' }} gap='3rem'>
        <Center justifyContent='flex-start'>
          <Text fontWeight='bold' fontSize='6xl' textAlign={{ base: 'center', md: 'center', xl: 'left' }} >
            La mejor forma de <span style={{ color: '#98D035' }}>reservar</span> tu espacio
          </Text>
        </Center>
        <Center justifyContent='flex-start' textAlign={{ base: 'center', md: 'center', xl: 'left' }}>
          <Text fontSize='3xl'>
            Explorá las canchas disponibles en tu ciudad y reserva una cancha sin moverte de tu casa.
          </Text>
        </Center>
      </Flex>
      <Flex flexDirection='column' gap='2rem' marginTop={{ base: '5rem 0', md: '5rem 0', xl: '0' }}>
        <Center>
        {slide === 1
          ? (
            <Flex alignItems='center' justifyContent='space-around'>
              <Image height={{ sm: '16em', md: '20em', lg: '24em', xl: 'sm' }} width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }} src={loginImage} alt='Login' />
              <Stack width='30%'>
                <Text fontSize='xl' fontWeight='bold' color='gray.500' >Registrate</Text>
                <Text color='gray.500'>Crea una cuenta para comenzar a hacer reservas</Text>
              </Stack>
            </Flex>
            )
          : slide === 2
            ? (<Flex alignItems='center' justifyContent='space-around'>
                <Image height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }} width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }} src={turnoImage} alt='Turno' />
                <Stack width='30%'>
                  <Text fontSize='xl' fontWeight='bold' color='gray.500' >Reserva</Text>
                  <Text color='gray.500'>Selecciona la fecha y hora en la que deseas jugar</Text>
                </Stack>
              </Flex>)
            : slide === 3
              ? (<Flex alignItems='center' justifyContent='space-around'>
                  <Image height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }} width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }} src={payImage} alt='Pay' />
                  <Stack width='30%'>
                    <Text fontSize='xl' fontWeight='bold' color='gray.500' >Paga</Text>
                    <Text color='gray.500'>Selecciona el medio por el cual queres pagar</Text>
                  </Stack>
                </Flex>)
              : (<Flex alignItems='center' justifyContent='space-around'>
              <Image height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }} width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }} src={playImage} alt='Play' />
              <Stack width='30%'>
                <Text fontSize='xl' fontWeight='bold' color='gray.500' >Juga</Text>
                <Text color='gray.500'>¡Espera la confirmación de la pagina y listo!</Text>
              </Stack>
        </Flex>)
        }
        </Center>
        <Center>
          <HStack>
            <Button
              onClick={() => setSlide(1)}
              width='1px'
              height='10px'
              borderRadius='full'
              _focus={{ backgroundColor: '#98D035' }}
              _hover={{ backgroundColor: '#98D035' }}
            />
            <Button
              onClick={() => setSlide(2)}
              width='1px'
              height='10px'
              borderRadius='full'
              _focus={{ backgroundColor: '#98D035' }}
              _hover={{ backgroundColor: '#98D035' }}
            />
            <Button
              onClick={() => setSlide(3)}
              width='1px'
              height='10px'
              borderRadius='full'
              _focus={{ backgroundColor: '#98D035' }}
              _hover={{ backgroundColor: '#98D035' }}
            />
            <Button
              onClick={() => setSlide(4)}
              width='1px'
              height='10px'
              borderRadius='full'
              _focus={{ backgroundColor: '#98D035' }}
              _hover={{ backgroundColor: '#98D035' }}
            />
          </HStack>
        </Center>
      </Flex>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
    </>
  )
}
