import { Flex, HStack, Spacer, Button, Text, Image, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginImage from '../../resources/assets/login.svg'
import turnoImage from '../../resources/assets/turno.svg'
import payImage from '../../resources/assets/pay.svg'
import playImage from '../../resources/assets/play.svg'

export function Landing() {
  const [slide, setSlide] = useState('login')
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
        <Button fontSize="15px" width="97px" height="35px" textColor="#98D035" backgroundColor="#E3FFB2;">Ingresar</Button>
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
    </Flex>
    </>
  )
}
