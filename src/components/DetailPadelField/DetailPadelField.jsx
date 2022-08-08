import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPadelFieldsById, cleanDetailPadelField } from '../../redux/padelField/padelFieldSlice'
import { Flex, Image, Box, Divider, Text, Badge, HStack, Icon, Button, Center, Stack, Avatar } from '@chakra-ui/react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { NavBar } from '../NavBar/NavBar'

export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const padelField = useSelector((state) => state.padelFields.detailPadelField)
  useEffect(() => {
    dispatch(getPadelFieldsById(id))
    return () => {
      dispatch(cleanDetailPadelField())
    }
  }, [id, dispatch])
  return (
    <Flex flexDirection='column'>
      <NavBar/>
      <Flex width='100%'>
        <Sidebar/>
        <Flex flexDirection='column' width='100%' margin=' 3vh 4vw'>
          <Box width='max' margin='6vh' p='4' display={{ md: 'flex' }} align-items='top'>
            <Image
              borderRadius='xl'
              width='35rem'
              height='30rem'
              src={padelField.image}
              fallbackSrc='https://via.placeholder.com/150'
              objectFit='cover'
              margin='2rem'
            />
            <Flex flexDirection='column' margin='2rem 2rem' height='30rem' p='2rem 0'>
              <Text fontWeight='bold' fontSize='4xl' textTransform='capitalize'>
                {padelField.name}
              </Text>
              <HStack as='span' color='gray.500' fontSize='lg' fontWeight='medium' textTransform='capitalize' m='1rem 0'>
                <Icon verticalAlign='center' color='gray.500' as={FaMapMarkerAlt}/>
                <Text>
                  {padelField.location}
                </Text>
              </HStack>
              <HStack m='1rem 0'>
                <Text color='brand.primary' fontWeight='bolder' fontSize='lg'>
                  ${padelField.price}
                </Text>
                <Badge backgroundColor='brand.backgroundBox' textAlign='center' borderRadius='lg'>
                  <Text color='brand.textSecundary' p='0 10px' fontWeight='medium'>1 hora</Text>
                </Badge>
              </HStack>
              <Text color='gray.500' fontWeight='medium' fontSize='lg' m='1rem 0'>
                Tipo: {padelField.type === 'covered' ? 'Cerrada' : 'Descubierta'}
              </Text>
              <Text color='gray.500' fontWeight='medium' fontSize='lg' m='1rem 0'>
                Puntaje:
              </Text>
              <HStack color='brand.primary'>
                <Icon h='2rem' w='2rem' as={AiFillStar}/>
                <Icon h='2rem' w='2rem' as={AiFillStar}/>
                <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                <Text>117 reseñas</Text>
              </HStack>
              <Button
                zIndex='-10'
                marginTop='2rem'
                fontSize='xl'
                height='60px'
                width='120px'
                textColor='#ffff'
                borderRadius='2xl'
                transition='all 1s'
                _hover={{ color: '#98D035', transition: 'all .5s ease', backgroundColor: '#E3FFB2' }}
                backgroundColor='#98D035'>
                <Link to='/checkout'>
                  Reservar
                </Link>
              </Button>
            </Flex>
          </Box>
          <Center p='4'>
            <Divider zIndex='-10' height='2px' backgroundColor='brand.primary' width='90%'/>
          </Center>
          <Box width='90%' margin='6vh' p='4'>
              <Text color='brand.primary' margin='0 2rem' fontWeight='medium' fontSize='2xl'>
                Reseñas recientes
              </Text>
              <HStack margin='2rem'alignItems='top' spacing={10}>
                <Avatar zIndex='-10' size='lg' name='poro' src='https://images7.alphacoders.com/113/thumb-1920-1135835.jpg'/>
                <Stack>
                  <Text fontWeight='medium' fontSize='xl'>
                    Nombre de usuario
                  </Text>
                  <HStack color='brand.primary'>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                  </HStack>
                  <Text style={{ hyphens: 'auto' }} color='gray.500' fontSize='lg'>
                    Texto donde comenta una pequeña reseña de la cancha y ya no se que poner asi que voy a repetir esto 2 veces... Texto donde comenta una pequeña reseña de la cancha y ya no se que poner asi que voy a repetir esto 2 veces
                  </Text>
                </Stack>
              </HStack>
              <HStack margin='2rem'alignItems='top' spacing={10}>
                <Avatar zIndex='-10' size='lg' name='poro' src='https://images6.alphacoders.com/107/1077773.jpg'/>
                <Stack>
                  <Text fontWeight='medium' fontSize='xl'>
                    Otro usuario
                  </Text>
                  <HStack color='brand.primary'>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                  </HStack>
                  <Text style={{ hyphens: 'auto' }} color='gray.500' fontSize='lg'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti id tempora, at ad distinctio assumenda excepturi quis optio placeat dolore libero fugit amet neque odio expedita sint modi! Reprehenderit, debitis?
                  </Text>
                </Stack>
              </HStack>
              <HStack margin='2rem'alignItems='top' spacing={10}>
                <Avatar zIndex='-10' size='lg' name='poro' src='https://images2.alphacoders.com/106/1064322.jpg'/>
                <Stack>
                  <Text fontWeight='medium' fontSize='xl'>
                    ladjlasdalsdasd
                  </Text>
                  <HStack color='brand.primary'>
                    <Icon h='2rem' w='2rem' as={AiFillStar}/>
                    <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                    <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                    <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                    <Icon h='2rem' w='2rem' as={AiOutlineStar}/>
                  </HStack>
                  <Text style={{ hyphens: 'auto' }} color='gray.500' fontSize='lg'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti id tempora, at ad distinctio assumenda excepturi quis optio placeat dolore libero fugit amet neque odio expedita sint modi! Reprehenderit, debitis?
                  </Text>
                </Stack>
              </HStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
