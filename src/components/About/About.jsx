import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  useDisclosure,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Flex,
  SimpleGrid,
  HStack,
  Spacer
} from '@chakra-ui/react'
import Footer from '../Footer/Footer'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import { NavLink } from 'react-router-dom'

import LoginButton from '../LoginButton/LoginButton'

const developers = [
  {
    nombre: 'Yamila Belen Lair',
    team: 'Backend',
    imagen: 'http://gafadeportiva.com/img/cms/Blogs/Yaroslava%20Shedova.jpg',
    linkedin: 'https://www.linkedin.com/in/yamila-belen-lair/'
  },
  {
    nombre: 'Abigail Sarzuri',
    team: 'Frontend',
    imagen:
      'https://www.saludalia.com/Uploads/saludalia.com/ImagenesGrandes/utilizar-gafas-para-jugar-a-padel.jpg',
    linkedin: 'https://www.linkedin.com/in/abigail-sarzuri-5a4b58174/'
  },
  {
    nombre: 'Matias Ferrari',
    team: 'Full Stack',
    imagen: 'https://mejoratupadel.com/wp-content/uploads/2021/01/Imagen-2.png',
    linkedin: 'https://www.linkedin.com/in/matias-emanuel-ferrari/'
  },
  {
    nombre: 'Paul Andres Andia',
    team: 'Backend',
    imagen:
      'https://www.padeladdict.com/wp-content/uploads/2017/05/uso-gafas-deportivas.jpg',
    linkedin: 'https://www.linkedin.com/in/paulandia/'
  },
  {
    nombre: ' Diego Cano Mera',
    team: 'Full Stack',
    imagen:
      'https://www.lens-sport.com/wp-content/uploads/2018/02/gafas-padel-y-gafas-proteccion-padel-1.jpg',
    linkedin: 'https://www.linkedin.com/in/diego-cano-mera-556998146/'
  },
  {
    nombre: 'Cristian Gonzalez Fuentes',
    team: 'Full Stack',
    imagen:
      'https://wptchallenger.com/wp-content/uploads/2022/01/marcello_jardim_destacada_logos_860x650.jpg',
    linkedin:
      'https://www.linkedin.com/in/cristian-gonzalez-fuentes-developerfullstack/'
  },
  {
    nombre: 'Eduardo Rios Jaen',
    team: 'Backend',
    imagen:
      'https://imagenes.20minutos.es/files/image_990_v3/files/fp/uploads/imagenes/2020/06/01/alejandro-gama.r_d.558-282.jpeg',
    linkedin: 'https://www.linkedin.com/in/eduardo-rios-jaen/'
  }
]
export default function SocialProfileSimple() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Flex
        width='100%'
        height='10vh'
        padding='0 100px'
        backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}
        borderBottomColor='#F8F1F1'>
        <HStack as='nav' spacing='5'>
          <NavLink to='/home'>
            <Button
              fontSize='15px'
              backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
              Inicio
            </Button>
          </NavLink>
          <Button
            fontSize='15px'
            backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
            Contacto
          </Button>
          <NavLink to='/about'>
            <Button
              fontSize='15px'
              backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
              Acerca de Nosotros
            </Button>
          </NavLink>
        </HStack>
        <Spacer />
        <HStack as='nav' spacing='5'>
          <LoginButton />
          <ToggleColorMode />
        </HStack>
      </Flex>
      <br></br>
      <Flex
        width='100%'
        justifyContent='center'
        flexDir='column'
        alignSelf='flex-start'>
        <SimpleGrid
          margin='12vh 10vw 0vh 10vw'
          paddingLeft='75px'
          spacing={20}
          columns={{ base: 1, lg: 2, xl: 3 }}>
          {developers.map((e) => (
            <Box
              columns={{ base: 1, md: 3 }}
              spacing={10}
              // columns={{ base: 1, lg: 2, xl: 3 }}
              maxW={'500px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={4}
              textAlign={'center'}>
              <Avatar
                size={'xl'}
                src={e.imagen}
                alt={'Avatar Alt'}
                mb={8}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3
                }}
              />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {e.nombre}
              </Heading>
              <Text
                textAlign={'center'}
                color={useColorModeValue('gray.700', 'gray.400')}
                px={3}>
                Full stack developer{' '}
              </Text>

              <Stack
                align={'center'}
                justify={'center'}
                direction={'row'}
                mt={7}>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  fontWeight={'400'}>
                  #{e.team}
                </Badge>
              </Stack>
              <Stack mt={7}  spacing={6}>
                <Link href={e.linkedin} color={'gray.50'}>
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  paddingLeft={10}
                  paddingRight={10}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500'
                  }}
                  _focus={{
                    bg: 'blue.500'
                  }}>
                    LinkedIn
                </Button>
                  </Link>{' '}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
      <Footer />
    </>
  )
}
