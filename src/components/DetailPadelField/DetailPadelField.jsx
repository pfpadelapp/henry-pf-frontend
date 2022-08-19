import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import {
  getPaymentPadelField,
  postReserveHourPadelField,
  cleanHoursByDate,
  getHoursByDate,
  getPadelFieldsById,
  cleanDetailPadelField
} from '../../redux/padelField/padelFieldSlice'
import {
  Link,
  Input,
  Flex,
  Image,
  Box,
  Divider,
  Text,
  Badge,
  HStack,
  Icon,
  Button,
  Center,
  Stack,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { useColorMode } from '@chakra-ui/color-mode'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlinePayments } from 'react-icons/md'
import { NavBar } from '../NavBar/NavBar'
import turnoImage from '../../resources/assets/turnDrawer.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import PostReview from './PostReview'
import Review from './Review.jsx' 


export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { id } = useParams()
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const padelField = useSelector((state) => state.padelFields.detailPadelField)
  // const [countReview, setCountReview] = useState()
  const inputPayment = {
    idField: id,
    cost: padelField.price
  }
  // console.log(inputPayment)
  const hourByDatePadelFiels = useSelector(
    (state) => state.padelFields.hoursByDatePadelField
  )
  const linkPaymentPaypal = useSelector((state) => state.padelFields.payReserve)
  // console.log('Link de pago desde el detail', linkPaymentPaypal)
  const menuRightModal = useDisclosure()
  const alertModal = useDisclosure()
  const cancelRef = useRef()
  const [date, setDate] = useState('')
  const [getHour, setGetHour] = useState()
  const [renderMsg, setRenderMsg] = useState(1)
  const msgRenderHourInDrawer = Number(getHour)
  // console.log('horas disponibles', hourByDatePadelFiels)
  // const date = new Date()
  // const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()
  // const output2 = new Date()
  // // const diaNumActual = date.getDate()
  // const diaStringActual = date.getDay()
  // const arrayDatesByWeek = []
  // // console.log(output)
  // function sumarDias(fecha, dias) {
  //   fecha.setDate(fecha.getDate() + dias)
  //   fecha = String(fecha.getDate()).padStart(2, '0') + '/' + String(fecha.getMonth() + 1).padStart(2, '0') + '/' + fecha.getFullYear()
  //   return fecha
  // }
  // const [dias, setDias] = useState({
  //   output,
  //   output2: sumarDias(output2, 1),
  //   output3: sumarDias(output2, 1),
  //   output4: sumarDias(output2, 1),
  //   output5: sumarDias(output2, 1),
  //   output6: sumarDias(output2, 2)
  // })
  // console.log(dias)
  // diaStringActual === 1
  // ? arrayDatesByWeek.push('Hoy', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado')
  //   : diaStringActual === 2
  //   ? arrayDatesByWeek.push('Hoy', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Lunes')
  //     : diaStringActual === 3
  //     ? arrayDatesByWeek.push('Hoy', 'Jueves', 'Viernes', 'Sabado', 'Lunes', 'Martes')
  //     : diaStringActual === 4
  //         ? arrayDatesByWeek.push('Hoy', 'Viernes', 'Sabado', 'Lunes', 'Martes', 'Miercoles')
  //         : diaStringActual === 5
  //         ? arrayDatesByWeek.push('Hoy', 'Sabado', 'Lunes', 'Martes', 'Miercoles', 'Jueves')
  //         : arrayDatesByWeek.push('Hoy', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes')
  // console.log(arrayDatesByWeek)
  // console.log(output) => 09/08/2022
  // console.log(diaNumActual) //fecha '9' / 08 / 2022
  // console.log(diaStringActual) //0 dom - 1 lun - 2 mar - 3 mie - 4 jue - 5 vie - 6 sab
  useEffect(() => {
    dispatch(getPadelFieldsById(id))
    return () => {
      dispatch(cleanDetailPadelField())
      // navigate('/resultadoPago')
    }
  }, [id, dispatch])
  const [input, setInput] = useState(null)
  function handleDate(e) {
    e.preventDefault()
    setDate(e.target.value)
    const dateFormat = e.target.value.split('-').reverse().join('/')
    dispatch(getHoursByDate(id, dateFormat))
  }
  function handleHour(e) {
    e.preventDefault()
    setGetHour(e.target.value) // 10
    // console.log(e.target.value)
  }
  function handleCleanHoursByDate(e) {
    e.preventDefault()
    dispatch(cleanHoursByDate())
  }

  function handleDateToPostBtn(e) {
    e.preventDefault()
    const dateFormat = date.split('/').reverse().join('-') // 2022-08-25
    const dateToPost =
      Number(getHour) === 9 ? `0${Number(getHour)}:00:00` : `${getHour}:00:00` // 10:00:00
    // console.log(dateToPost)
    const dateFormatToInput = dateFormat + 'T' + dateToPost // 2022-08-25T17:00:00
    setInput({
      ...input,
      date: dateFormatToInput
    })
  }
  // function handlePostReserve(e) {
  //   e.preventDefault()
  //   // console.log('cuarto', input)
  //   dispatch(postReserveHourPadelField(input))
  // }
  function handlePaymentReserve(e) {
    e.preventDefault()
    // console.log(inputPayment)
    dispatch(getPaymentPadelField(inputPayment))
  }
  // console.log('EL INPUT ES', input)
  return isAuthenticated ? (
    <Flex flexDirection='column'>
      <NavBar />
      <Flex width='100%'>
        <Sidebar />
        <Flex flexDirection='column' width='100%' margin=' 3vh 4vw'>
          <Box
            width='max'
            margin='6vh'
            p='4'
            display={{ md: 'flex' }}
            align-items='top'>
            <Image
              borderRadius='xl'
              width='35rem'
              height='30rem'
              src={padelField.image}
              fallbackSrc='https://via.placeholder.com/150'
              objectFit='cover'
              margin='2rem'
            />
            <Flex
              flexDirection='column'
              margin='2rem 2rem'
              height='30rem'
              p='2rem 0'>
              <Text fontWeight='bold' fontSize='4xl' textTransform='capitalize'>
                {padelField.name}
              </Text>
              <HStack
                as='span'
                color='gray.500'
                fontSize='lg'
                fontWeight='medium'
                textTransform='capitalize'
                m='1rem 0'>
                <Icon
                  verticalAlign='center'
                  color='gray.500'
                  as={FaMapMarkerAlt}
                />
                <Text>{padelField.location}</Text>
              </HStack>
              <HStack m='1rem 0'>
                <Text color='brand.primary' fontWeight='bolder' fontSize='lg'>
                  ${padelField.price}
                </Text>
                <Badge
                  backgroundColor='brand.backgroundBox'
                  textAlign='center'
                  borderRadius='lg'>
                  <Text
                    color='brand.textSecundary'
                    p='0 10px'
                    fontWeight='medium'>
                    1 hora
                  </Text>
                </Badge>
              </HStack>
              <Text
                color='gray.500'
                fontWeight='medium'
                fontSize='lg'
                m='1rem 0'>
                Tipo:{' '}
                {padelField.type === 'covered' ? 'Cerrada' : 'Descubierta'}
              </Text>
              <Text
                color='gray.500'
                fontWeight='medium'
                fontSize='lg'
                m='1rem 0'>
                Puntaje:
              </Text>
              {padelField.ratingsAverage === 1 ? (
                <HStack color='brand.primary'>
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Text>{padelField.review.length} Reseñas</Text>
                </HStack>
              ) : padelField.ratingsAverage === 2 ? (
                <HStack color='brand.primary'>
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Text>{padelField.review.length} Reseñas</Text>
                </HStack>
              ) : padelField.ratingsAverage === 3 ? (
                <HStack color='brand.primary'>
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Text>{padelField.review.length} Reseñas</Text>
                </HStack>
              ) : padelField.ratingsAverage === 4 ? (
                <HStack color='brand.primary'>
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                  <Text>{padelField.review.length} Reseñas</Text>
                </HStack>
              ) : (
                <HStack color='brand.primary'>
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                  <Text>{padelField.review.length} Reseñas</Text>
                </HStack>
              )}
              <>
                <Button
                  marginTop='2rem'
                  fontSize='xl'
                  height='60px'
                  width='120px'
                  textColor='#ffff'
                  borderRadius='2xl'
                  transition='all 1s'
                  onClick={menuRightModal.onOpen}
                  _hover={{
                    color: '#98D035',
                    transition: 'all .5s ease',
                    backgroundColor: '#E3FFB2'
                  }}
                  _active={{
                    color: '#98D035',
                    transition: 'all .5s ease',
                    backgroundColor: '#E3FFB2'
                  }}
                  backgroundColor='#98D035'>
                  Reservar
                </Button>
                <Drawer
                  onClose={menuRightModal.onClose}
                  isOpen={menuRightModal.isOpen}
                  size='md'
                  closeOnEsc={true}
                  preserveScrollBarGap={true}>
                  <DrawerOverlay />
                  <DrawerContent p='2rem'>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                      Reserva una cancha
                    </DrawerHeader>
                    <DrawerBody>
                      <Text fontWeight='medium' margin='1rem 0'>
                        Selecciona el dia:
                      </Text>
                      {/* <Stack>
                        <Button onClick={() => handleDate(output)} >{arrayDatesByWeek[0]}</Button>
                        <Button>{arrayDatesByWeek[1]}</Button>
                        <Button>{arrayDatesByWeek[2]}</Button>
                        <Button>{arrayDatesByWeek[3]}</Button>
                        <Button>{arrayDatesByWeek[4]}</Button>
                        <Button>{arrayDatesByWeek[5]}</Button>
                      </Stack> */}
                      <Input
                        backgroundColor={
                          colorMode === 'dark' ? '#3d414c' : 'white'
                        }
                        type='date'
                        onChange={(e) => handleDate(e)}
                        marginBottom='4rem'
                      />
                      <Center>
                        <Stack w='100%'>
                          {hourByDatePadelFiels.length > 0 ? (
                            hourByDatePadelFiels?.map((element, i) => {
                              return (
                                <div key={i}>
                                  <Button
                                    width='100%'
                                    value={element}
                                    onClick={(e) => {
                                      handleHour(e)
                                      setRenderMsg(2)
                                      handleDateToPostBtn(e)
                                    }}>
                                    {element} hs
                                  </Button>
                                </div>
                              )
                            })
                          ) : (
                            <Stack gap='2rem'>
                              <Image
                                height='sx'
                                width='sx'
                                src={turnoImage}
                                alt='Sacar turno'
                              />
                              <Text textAlign='center' color='gray.500'>
                                {' '}
                                Para poder visualizar los horarios disponibles
                                primero debes seleccionar una fecha
                              </Text>
                            </Stack>
                          )}
                          <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={alertModal.onClose}
                            isOpen={alertModal.isOpen}
                            isCentered>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                Generando Link de pago
                              </AlertDialogHeader>
                              <AlertDialogCloseButton />
                              <AlertDialogBody>
                                Ingrese al link para ser re-dirigido al portal
                                de pago
                              </AlertDialogBody>
                              <AlertDialogFooter>
                                <Link href={linkPaymentPaypal} isExternal>
                                  <Button
                                    isLoading={
                                      linkPaymentPaypal.length ? false : true
                                    }
                                    leftIcon={<MdOutlinePayments />}
                                    color='white'
                                    bg='#98D035'
                                    _hover={{
                                      color: '#98D035',
                                      backgroundColor: '#E3FFB2'
                                    }}
                                    _active={{
                                      color: '#98D035',
                                      backgroundColor: '#E3FFB2'
                                    }}
                                    onClick={(e) => {
                                      alertModal.onClose()
                                      setRenderMsg(1)
                                    }}>
                                    Pagar
                                  </Button>
                                </Link>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          {renderMsg === 2 ? (
                            <Text
                              fontWeight='medium'
                              color='gray.500'
                              paddingTop='3rem'>
                              Seleccionaste la cancha {padelField.name} de{' '}
                              {msgRenderHourInDrawer}hs a{' '}
                              {msgRenderHourInDrawer + 1}hs el dia{' '}
                              {date.split('-').reverse().join('/')}
                            </Text>
                          ) : null}
                        </Stack>
                      </Center>
                    </DrawerBody>
                    <DrawerFooter>
                      <Button
                        variant='outline'
                        mr={3}
                        onClick={(e) => {
                          handleCleanHoursByDate(e)
                          menuRightModal.onClose()
                          setRenderMsg(1)
                        }}>
                        Cancelar
                      </Button>
                      <Button
                        bg='#98D035'
                        isDisabled={input !== null ? false : true}
                        onClick={(e) => {
                          alertModal.onOpen()
                          handlePaymentReserve(e)
                          handleCleanHoursByDate(e)
                        }}
                        _hover={{
                          color: '#98D035',
                          backgroundColor: '#E3FFB2'
                        }}
                        _active={{
                          color: '#98D035',
                          backgroundColor: '#E3FFB2'
                        }}
                        color='white'>
                        Reservar
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            </Flex>
          </Box>
          <Center p='4'>
            <Divider
              zIndex='-10'
              height='2px'
              backgroundColor='brand.primary'
              width='90%'
            />
          </Center>
          <Box width='90%' margin='6vh' p='4'>
            <Text
              color='brand.primary'
              margin='0 2rem'
              fontWeight='medium'
              fontSize='2xl'>
              Reseñas recientes
            </Text>
            {padelField.review?.map((review, index) => {
              return (
                <HStack key={index} margin='2rem' alignItems='top' spacing={10}>
                  <Avatar
                    zIndex='-10'
                    size='lg'
                    name='poro'
                    src='https://images7.alphacoders.com/113/thumb-1920-1135835.jpg'
                  />
                  <Stack>
                    <Text fontWeight='medium' fontSize='xl'>
                    Nombre de usuario
                    </Text>
                    {review.rating === 1 ? (
                      <HStack color='brand.primary'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>
                    ) : review.rating === 2 ? (
                      <HStack color='brand.primary'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>
                    ) : review.rating === 3 ? (
                      <HStack color='brand.primary'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>
                    ) : review.rating === 4 ? (
                      <HStack color='brand.primary'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>
                    ) : (
                      <HStack color='brand.primary'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                      </HStack>
                    )}
                    <Text
                      style={{ hyphens: 'auto' }}
                      color='gray.500'
                      fontSize='lg'>
                      {review.review
                        ? review.review
                        : 'El usuario no dejo un comentario'}
                    </Text>
                  </Stack>
                </HStack>
              )
            })}   
             <Review></Review>
             <PostReview></PostReview>  
          </Box>
        </Flex>
      </Flex>
    
    </Flex>
  ) : null





  
}
