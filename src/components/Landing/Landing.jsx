import {
  Flex,
  HStack,
  Spacer,
  Button,
  Text,
  Center,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import LoginButton from '../LoginButton/LoginButton'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import { useAuth0 } from '@auth0/auth0-react'
import Contact from '../Contact/Contact'
import Slider from '../slider/slider'

export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode } = useColorMode()
  const { isAuthenticated, loginWithPopup } = useAuth0()

  const login = async () => {
    await loginWithPopup()
  }
  return (
    <>
      <Flex
        width='100%'
        height='10vh'
        padding='0 100px'
        backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}
        borderBottomColor='#F8F1F1'>
        <HStack as='nav' spacing='5'>
          {isAuthenticated
            ? (
            <Link to='/home'>
              <Button
                fontSize='15px'
                backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
                Inicio
              </Button>
            </Link>
              )
            : (
            <Button
              onClick={(e) => {
                login()
              }}
              fontSize='15px'
              backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
              Inicio
            </Button>
              )}
          <Button
            onClick={onOpen}
            fontSize='15px'
            backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
            Contacto
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textColor='gray.00'>Contacto</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Contact />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Link to='/nosotros'>
            <Button
              fontSize='15px'
              backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
              Acerca de Nosotros
            </Button>
          </Link>
        </HStack>
        <Spacer />
        <HStack as='nav' spacing='5'>
          <LoginButton />
          <ToggleColorMode />
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
        <Flex
          flexDirection='column'
          width={{ base: '80%', md: '80%', xl: '35%' }}
          gap='3rem'>
          <Center justifyContent='flex-start'>
            <Text
              fontWeight='bold'
              fontSize='6xl'
              textAlign={{ base: 'center', md: 'center', xl: 'left' }}>
              La mejor forma de{' '}
              <span style={{ color: '#98D035' }}>reservar</span> tu espacio
            </Text>
          </Center>
          <Center
            justifyContent='flex-start'
            textAlign={{ base: 'center', md: 'center', xl: 'left' }}>
            <Text fontSize='3xl'>
              Explorá las canchas disponibles en tu ciudad y reserva una cancha
              sin moverte de tu casa.
            </Text>
          </Center>
        </Flex>
        <Flex
          flexDirection='column'
          gap='2rem'
          marginTop={{ base: '5rem 0', md: '5rem 0', xl: '0' }}>
          <Center>
            <Slider />
          </Center>
        </Flex>
      </Flex>
    </>
  )
}
