import { Link, Divider, SimpleGrid, Flex, Heading, Stack, Text, IconButton, Center } from '@chakra-ui/react'
import { FaUserFriends, FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneVolume } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiCustomerService2Fill } from 'react-icons/ri'

export default function Footer() {
  return (
    <>
      <Divider height='2px' backgroundColor='brand.primary' width='100%' padding='2rem 0' />
      <SimpleGrid
        columns={{ base: 1, lg: 2, xl: 3 }}
        justifyItems='center'
        margin={{ base: '0 0 0 8vw', lg: '0 0 0 6vw', xl: '0 0 0 6vw' }} padding='3rem 0'>
        <Stack width={{ base: 'xs', lg: 'sm', xl: 'base' }} margin={{ base: '2rem 0', lg: '2rem 0', xl: '0' }}>
          <Heading size='md' paddingBottom='2rem'>
            Contactanos
          </Heading>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<FaMapMarkerAlt />} />
            <Text fontSize='medium' color='gray.500'>Calle falsa 123 Av. siempre viva 742</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<FaPhoneVolume />} />
            <Text fontSize='medium' color='gray.500'>011-2345-6789</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<IoIosMail />} />
            <Text fontSize='medium' color='gray.500'>PadelfieldApp@proyectohenry.com</Text>
          </Flex>
        </Stack>
        <Stack width={{ base: 'xs', lg: 'sm', xl: 'base' }} margin={{ base: '2rem 0', lg: '2rem 0', xl: '0' }}>
          <Heading size='md' paddingBottom='2rem'>
            Quienes somos
          </Heading>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<BsFillPersonFill />} />
            <Text fontSize='medium' color='gray.500'>Servicios</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<FaUserFriends />} />
            <Text fontSize='medium' color='gray.500'>Miembros del equipo</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <IconButton variant='outline' color='#98D035' icon={<RiCustomerService2Fill />} />
            <Text fontSize='medium' color='gray.500'>Soporte tecnico</Text>
          </Flex>
        </Stack>
        <Stack width={{ base: 'xs', lg: 'sm', xl: 'base' }} margin={{ base: '2rem 0', lg: '2rem 0', xl: '0' }}>
          <Heading size='md' paddingBottom='2rem'>
            Redes sociales
          </Heading>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <Link href='https://www.facebook.com/PadelField-App-106412448851655' isExternal>
              <IconButton variant='outline' color='#98D035' icon={<FaFacebookF />} />
            </Link>
            <Text fontSize='medium' color='gray.500'>Facebook</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <Link to='https://www.instagram.com/' isExternal>
              <IconButton variant='outline' color='#98D035' icon={<FaInstagram />} />
            </Link>
            <Text fontSize='medium' color='gray.500'>Instagram</Text>
          </Flex>
          <Flex flexDirection='row' alignItems='center' gap='10px'>
            <Link href='https://twitter.com/ProyectoFinal13' isExternal>
              <IconButton variant='outline' color='#98D035' icon={<FaTwitter />} />
            </Link>
            <Text fontSize='medium' color='gray.500'>Twitter</Text>
          </Flex>
        </Stack>
      </SimpleGrid>
      <Divider height='2px' backgroundColor='brand.primary' width='100%' />
      <Center>
        <Text padding='2rem 0' fontSize='medium' color='gray.500'>Copyright © 2022 PadelfieldApp. Todos los derechos reservados</Text>
      </Center>
    </>
  )
}
