import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { postReserveHourPadelField, cleanHoursByDate, getHoursByDate, getPadelFieldsById, cleanDetailPadelField } from '../../redux/padelField/padelFieldSlice'
import { Input, Flex, Image, Box, Divider, Text, Badge, HStack, Icon, Button, Center, Stack, Avatar, useDisclosure, Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { NavBar } from '../NavBar/NavBar'
import turnoImage from '../../resources/assets/turnDrawer.svg'

export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const padelField = useSelector((state) => state.padelFields.detailPadelField)
  const hourByDatePadelFiels = useSelector((state) => state.padelFields.hoursByDatePadelField)
  const menuRightModal = useDisclosure()
  const alertModal = useDisclosure()
  const cancelRef = useRef()
  const [date, setDate] = useState('')
  const [getHour, setGetHour] = useState()
  // console.log('horas disponibles', hourByDatePadelFiels)
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    }
  }, [id, dispatch])
  const [input, setInput] = useState({
    idUser: '62eab574cac7d39b3b7427c5',
    idField: '62eab82fb501f29111badcf4',
    date: '2022-08-25T18:00:00'
  })
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
    const dateToPost = getHour === 9 ? `0${getHour}:00:00` : `${getHour}:00:00` // 10:00:00
    const dateFormatToInput = dateFormat + 'T' + dateToPost // 2022-08-25T17:00:00
    setInput({
      ...input,
      date: dateFormatToInput
    })
  }
  function handlePostReserve(e) {
    e.preventDefault()
    console.log('cuarto', input)
    dispatch(postReserveHourPadelField(input))
  }
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
                  _hover={{ color: '#98D035', transition: 'all .5s ease', backgroundColor: '#E3FFB2' }}
                  _active={{ color: '#98D035', transition: 'all .5s ease', backgroundColor: '#E3FFB2' }}
                  backgroundColor='#98D035'
                >
                  Reservar
                </Button>
                <Drawer onClose={menuRightModal.onClose} isOpen={menuRightModal.isOpen} size='md' closeOnEsc={true} preserveScrollBarGap={true}>
                  <DrawerOverlay/>
                  <DrawerContent p='2rem'>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Reserva una cancha</DrawerHeader>
                    <DrawerBody>
                      <Text fontWeight='medium' margin='1rem 0' >
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
                      <Input bg='gray.100' type='date'onChange={(e) => handleDate(e)} marginBottom='4rem'/>
                      <Center>
                        <Stack w='100%'>
                          {hourByDatePadelFiels.length > 0
                            ? hourByDatePadelFiels?.map((element, i) => {
                              return (
                                <div key={i}>
                                  <Button width='100%' value={element} onClick={(e) => { handleHour(e); alertModal.onOpen() }}>
                                    {element} hs
                                  </Button>
                                  <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={alertModal.onClose}
                                    isOpen={alertModal.isOpen}
                                    isCentered
                                  >
                                    <AlertDialogContent>
                                      <AlertDialogHeader>Confirmar Turno</AlertDialogHeader>
                                      <AlertDialogCloseButton/>
                                      <AlertDialogBody>
                                        Seleccionaste la cancha {padelField.name} de {element}hs a {element + 1}hs el dia {date.split('-').reverse().join('/')}
                                      </AlertDialogBody>
                                      <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={alertModal.onClose}>
                                          No
                                        </Button>
                                        <Button color='white' bg='brand.primary' ml='3' onClick={(e) => { handleDateToPostBtn(e); alertModal.onClose() }} >
                                          Si
                                        </Button>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )
                            })
                            : (<Stack gap='2rem'>
                                <Image height='sx' width='sx' src={turnoImage} alt='Sacar turno'/>
                                <Text textAlign='center' color='gray.500'> Para poder visualizar los horarios disponibles primero debes seleccionar una fecha</Text>
                              </Stack>)
                          }
                        </Stack>
                      </Center>
                    </DrawerBody>
                    <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={(e) => { handleCleanHoursByDate(e); menuRightModal.onClose() }}>Cancelar</Button>
                    <Button onClick={(e) => handlePostReserve(e) } bg='brand.primary' _hover={{ color: '#98D035', backgroundColor: '#E3FFB2' }} _active={{ color: '#98D035', backgroundColor: '#E3FFB2' }} color='white'>Reservar</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
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
