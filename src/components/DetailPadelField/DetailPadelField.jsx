import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import {
  getPaymentPadelField,
  postReserveHourPadelField,
  cleanHoursByDate,
  getHoursByDate,
  getPadelFieldsById,
  cleanDetailPadelField,
  postReviewss
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
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  Textarea,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Heading
} from '@chakra-ui/react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { useColorMode } from '@chakra-ui/color-mode'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlinePayments } from 'react-icons/md'
import { NavBar } from '../NavBar/NavBar'
import turnoImage from '../../resources/assets/turnDrawer.svg'
import { useAuth0 } from '@auth0/auth0-react'
import Swal from 'sweetalert2'

export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { colorMode } = useColorMode()
  const { idPadelField } = useParams()
  const { isAuthenticated, isLoading, user } = useAuth0()
  const dataRender = useSelector((state) => state.users.userDetail)
  const padelField = useSelector((state) => state.padelFields.detailPadelField)
  const reviews = padelField.review
  const recentReviews = reviews?.slice(reviews?.length - 3)
  const inputPayment = {
    idField: idPadelField,
    cost: padelField.price
  }
  const hourByDatePadelFiels = useSelector(
    (state) => state.padelFields.hoursByDatePadelField
  )
  const linkPaymentPaypal = useSelector((state) => state.padelFields.payReserve)
  const menuRightModal = useDisclosure()
  const alertModal = useDisclosure()
  const reviewsModal = useDisclosure()
  const cancelRef = useRef()
  const [date, setDate] = useState('')
  const [getHour, setGetHour] = useState()
  const navigate = useNavigate()
  const [renderMsg, setRenderMsg] = useState(1)
  const msgRenderHourInDrawer = Number(getHour)
  useEffect(() => {
    dispatch(getPadelFieldsById(idPadelField))
    return () => {
      dispatch(cleanDetailPadelField())
    }
  }, [dispatch])

  const [input, setInput] = useState(null)
  function handleDate(e) {
    e.preventDefault()
    setDate(e.target.value)
    const dateFormat = e.target.value.split('-').reverse().join('/')
    const aux = new Date().toISOString().slice(0, 10)
    const dateFormatDay = dateFormat.slice(0, 2)
    const today = aux.split('-').reverse().join('/').slice(0, 2)
    const dateFormatMonth = dateFormat.slice(3, 5)
    const todayMonth = aux.split('-').reverse().join('/').slice(3, 5)
    if (Number(dateFormatMonth) > Number(todayMonth) || Number(dateFormatMonth) === Number(todayMonth)) {
      if (Number(dateFormatDay) > Number(today) || Number(dateFormatDay) === Number(today)) {
        dispatch(getHoursByDate(idPadelField, dateFormat))
      }
    } else {
      console.log('INGRESA BIEN LA FECHAAAAAAAAAAA')
    }
  }
  function handleHour(e) {

    setGetHour(e.target.value) // 10
    const horaaa = e.target.value
    console.log(horaaa)
    const dateFormat = date.split('/').reverse().join('-')
    console.log('dateFormat', dateFormat)
    const dateToPost =
      Number(horaaa) === 9 ? `0${Number(horaaa)}:00:00` : `${horaaa}:00:00` // 10:00:00
    console.log('dateToPost', dateToPost)
    const dateFormatToInput = dateFormat + 'T' + dateToPost // 2022-08-25T17:00:00
    console.log('dateFormatToInput', dateFormatToInput)
    dispatch(postReserveHourPadelField({
      idUser: dataRender.id,
      idField: idPadelField,
      date: dateFormatToInput
    }))
    setInput({
      ...input,
      date: dateFormatToInput
    })
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
    console.log(input)
    setInput({
      ...input,
      date: dateFormatToInput
    })
    console.log('en el handle es', getHour)
  }
  function handlePostReserve(e) {
    e.preventDefault()
    // console.log('cuarto', input)
    dispatch(postReserveHourPadelField(input))
  }
  function handlePaymentReserve(e) {
    e.preventDefault()
    // console.log('handlePaymentReserve react', inputPayment)
    dispatch(getPaymentPadelField(inputPayment))
  }

  const [inputReview, setInputReview] = useState({
    userMail: dataRender?.email || user?.email,
    name: dataRender?.name || user?.name,
    rating: 0,
    review: ''
  })
  const handleClickStarValue = (e) => {
    setInputReview({ ...inputReview, rating: parseInt(e.target.value) })
    // console.log(e.target.value)
  }

  function handleChange(e) {
    e.preventDefault()
    setInputReview({
      ...inputReview,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!inputReview.rating) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar una puntuacion',
        confirmButtonColor: '#F27474'
      })
    } else {
      dispatch(postReviewss(idPadelField, { ...inputReview }))
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa!',
        text: 'Publicaste una reseña',
        confirmButtonColor: '#98D035'
      })
      window.location.reload()
    }
  }
  // console.log('inputtttt', dataRender.id)
  // console.log('inputtttt', date, 'T', getHour)
  return isLoading === true ? null : isAuthenticated
    ? (<Flex flexDirection='column'>
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
                <Text color='#98D035' fontWeight='bolder' fontSize='lg'>
                  ${padelField.price}
                </Text>
                <Badge
                  backgroundColor='brand.backgroundBox'
                  textAlign='center'
                  borderRadius='lg'>
                  <Text
                    bg={colorMode === 'dark' ? '#3d414c' : '#FFEBF0'}
                    color={colorMode === 'dark' ? null : '#9E45BD'}
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
              {padelField.ratingsAverage === 1
                ? (
                  <HStack color='#98D035'>
                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Text color='white'> {padelField.review?.length} Reseñas</Text>
                  </HStack>
                )
                : padelField.ratingsAverage === 2
                  ? (
                    <HStack color='#98D035'>
                      <Icon h='2rem' w='2rem' as={AiFillStar} />
                      <Icon h='2rem' w='2rem' as={AiFillStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Text color='white'>{padelField.review?.length} Reseñas</Text>
                    </HStack>
                  )
                  : padelField.ratingsAverage === 3
                    ? (
                      <HStack color='#98D035'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Text color='white'>{padelField.review?.length} Reseñas</Text>
                      </HStack>
                    )
                    : padelField.ratingsAverage === 4
                      ? (
                        <HStack color='#98D035'>
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Text color='white'>{padelField.review?.length} Reseñas</Text>
                        </HStack>
                      )
                      : padelField.ratingsAverage === 5
                        ? (
                          <HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Text color='white'>{padelField.review?.length} Reseñas</Text>
                          </HStack>
                        )
                        : (
                          <HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Text color='white'>0 Reseñas</Text>
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
                  closeOnOverlayClick={false}
                  preserveScrollBarGap={true}>
                  <DrawerOverlay />
                  <DrawerContent p='2rem'>
                    <DrawerHeader borderBottomWidth='1px'>
                      Reserva una cancha
                    </DrawerHeader>
                    <DrawerBody>
                      <Text fontWeight='medium' margin='1rem 0'>
                        Selecciona el dia:
                      </Text>
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
                          {hourByDatePadelFiels.length > 0
                            ? (
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
                            )
                            : (
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
                                      !linkPaymentPaypal.length
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
                          {renderMsg === 2
                            ? (<Text
                              fontWeight='medium'
                              color='gray.500'
                              paddingTop='3rem'>
                              Seleccionaste la cancha {padelField.name} de{' '}
                              {msgRenderHourInDrawer}hs a{' '}
                              {msgRenderHourInDrawer + 1}hs el dia{' '}
                              {date.split('-').reverse().join('/')}
                            </Text>)
                            : null}
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
                        isDisabled={input === null}
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
            {recentReviews?.reverse().map((recents, index) => {
              return (
                <HStack key={index} margin='2rem' alignItems='top' spacing={10}>
                  <Avatar
                    zIndex='-10'
                    size='lg'
                    name='poro'
                    src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                  />
                  <Stack>
                    <Text fontWeight='medium' fontSize='xl'>
                      {recents.name}
                    </Text>
                    {recents.rating === 1
                      ? (<HStack color='#98D035'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>)
                      : recents.rating === 2
                        ? (<HStack color='#98D035'>
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        </HStack>)
                        : recents.rating === 3
                          ? (<HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          </HStack>)
                          : recents.rating === 4
                            ? (<HStack color='#98D035'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            </HStack>)
                            : (<HStack color='#98D035'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                            </HStack>)}
                    <Text
                      style={{ hyphens: 'auto' }}
                      color='gray.500'
                      fontSize='lg'>
                      {recents.review?.length > 1
                        ? recents.review
                        : 'El usuario no dejo un comentario.'}
                    </Text>
                  </Stack>
                </HStack>
              )
            })}
            <Button bg='#98D035'
              _hover={{
                color: '#98D035',
                backgroundColor: '#E3FFB2'
              }}
              _active={{
                color: '#98D035',
                backgroundColor: '#E3FFB2'
              }}
              marginTop='3rem'
              onClick={reviewsModal.onOpen}
              color='white'
              marginLeft='1.5rem'>Ver todas las reseñas</Button>
            <Modal scrollBehavior='inside' size='3xl' isCentered closeOnOverlayClick={false} isOpen={reviewsModal.isOpen} onClose={reviewsModal.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Todas las reseñas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {padelField.review?.map((review, index) => {
                    return (
                      <HStack key={index} margin='2rem' alignItems='top' spacing={10}>
                        <Avatar
                          zIndex='-10'
                          size='lg'
                          name='poro'
                          src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                        />
                        <Stack>
                          <Text fontWeight='medium' fontSize='xl'>
                            {review.name}
                          </Text>
                          {review.rating === 1
                            ? (<HStack color='brand.primary'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            </HStack>)
                            : review.rating === 2
                              ? (<HStack color='brand.primary'>
                                <Icon h='2rem' w='2rem' as={AiFillStar} />
                                <Icon h='2rem' w='2rem' as={AiFillStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              </HStack>)
                              : review.rating === 3
                                ? (<HStack color='brand.primary'>
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                </HStack>)
                                : review.rating === 4
                                  ? (<HStack color='brand.primary'>
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                  </HStack>)
                                  : (<HStack color='brand.primary'>
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  </HStack>)}
                          <Text
                            style={{ hyphens: 'auto' }}
                            color='gray.500'
                            fontSize='lg'>
                            {review.review?.length > 1
                              ? review.review
                              : 'El usuario no dejo un comentario.'}
                          </Text>
                        </Stack>
                      </HStack>
                    )
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button
                    bg='#98D035'
                    _hover={{
                      color: '#98D035',
                      backgroundColor: '#E3FFB2'
                    }}
                    _active={{
                      color: '#98D035',
                      backgroundColor: '#E3FFB2'
                    }}
                    onClick={reviewsModal.onClose}
                    color='white' >
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex flexDirection='column' alignItems='flex-start' justifyContent='flex-start' marginTop='3rem' gap='5'>
              <Text
                color='brand.primary'
                margin='0 1.5rem'
                fontWeight='medium'
                fontSize='2xl'>Dejar una reseña</Text>
              <Text margin='0 2rem' color='gray.500'>Comparte tu experiencia para ayudar a otros usuarios</Text>
              <HStack margin='0 2rem'>
                <Avatar size='lg' src={dataRender?.picture || user?.picture} />
                <Stack>
                  <Text>{dataRender?.name || user?.name}</Text>
                  <HStack color='#98D035'>
                    <Button onClick={handleClickStarValue} value={1}>★</Button>
                    <Button onClick={handleClickStarValue} value={2}>★</Button>
                    <Button onClick={handleClickStarValue} value={3}>★</Button>
                    <Button onClick={handleClickStarValue} value={4}>★</Button>
                    <Button onClick={handleClickStarValue} value={5}>★</Button>
                  </HStack>

                </Stack>
              </HStack>
              <FormControl maxWidth='50%' margin='5'>
                <Textarea
                  placeholder='Escribe un comentario'
                  name='review'
                  value={inputReview.review}
                  onChange={(e) => handleChange(e)} />
                <Link to='/'>
                  <Button
                    bgColor='#98D035'
                    textColor='#ffff'
                    mr={3}
                    onClick={(e) => handleSubmit(e)}>
                    Publicar
                  </Button>
                </Link>
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>)
    :
    user.email_verified ? (<Flex flexDirection='column'>
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
                <Text color='#98D035' fontWeight='bolder' fontSize='lg'>
                  ${padelField.price}
                </Text>
                <Badge
                  backgroundColor='brand.backgroundBox'
                  textAlign='center'
                  borderRadius='lg'>
                  <Text
                    bg={colorMode === 'dark' ? '#3d414c' : '#FFEBF0'}
                    color={colorMode === 'dark' ? null : '#9E45BD'}
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
              {padelField.ratingsAverage === 1
                ? (
                  <HStack color='#98D035'>
                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                    <Text color='white'> {padelField.review?.length} Reseñas</Text>
                  </HStack>
                )
                : padelField.ratingsAverage === 2
                  ? (
                    <HStack color='#98D035'>
                      <Icon h='2rem' w='2rem' as={AiFillStar} />
                      <Icon h='2rem' w='2rem' as={AiFillStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      <Text color='white'>{padelField.review?.length} Reseñas</Text>
                    </HStack>
                  )
                  : padelField.ratingsAverage === 3
                    ? (
                      <HStack color='#98D035'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Text color='white'>{padelField.review?.length} Reseñas</Text>
                      </HStack>
                    )
                    : padelField.ratingsAverage === 4
                      ? (
                        <HStack color='#98D035'>
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Text color='white'>{padelField.review?.length} Reseñas</Text>
                        </HStack>
                      )
                      : padelField.ratingsAverage === 5
                        ? (
                          <HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Text color='white'>{padelField.review?.length} Reseñas</Text>
                          </HStack>
                        )
                        : (
                          <HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Text color='white'>0 Reseñas</Text>
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
                  closeOnOverlayClick={false}
                  preserveScrollBarGap={true}>
                  <DrawerOverlay />
                  <DrawerContent p='2rem'>
                    <DrawerHeader borderBottomWidth='1px'>
                      Reserva una cancha
                    </DrawerHeader>
                    <DrawerBody>
                      <Text fontWeight='medium' margin='1rem 0'>
                        Selecciona el dia:
                      </Text>
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
                          {hourByDatePadelFiels.length > 0
                            ? (
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
                            )
                            : (
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
                                      !linkPaymentPaypal.length
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
                          {renderMsg === 2
                            ? (<Text
                              fontWeight='medium'
                              color='gray.500'
                              paddingTop='3rem'>
                              Seleccionaste la cancha {padelField.name} de{' '}
                              {msgRenderHourInDrawer}hs a{' '}
                              {msgRenderHourInDrawer + 1}hs el dia{' '}
                              {date.split('-').reverse().join('/')}
                            </Text>)
                            : null}
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
                        isDisabled={input === null}
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
            {recentReviews?.reverse().map((recents, index) => {
              return (
                <HStack key={index} margin='2rem' alignItems='top' spacing={10}>
                  <Avatar
                    zIndex='-10'
                    size='lg'
                    name='poro'
                    src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                  />
                  <Stack>
                    <Text fontWeight='medium' fontSize='xl'>
                      {recents.name}
                    </Text>
                    {recents.rating === 1
                      ? (<HStack color='#98D035'>
                        <Icon h='2rem' w='2rem' as={AiFillStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                      </HStack>)
                      : recents.rating === 2
                        ? (<HStack color='#98D035'>
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiFillStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                        </HStack>)
                        : recents.rating === 3
                          ? (<HStack color='#98D035'>
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiFillStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                          </HStack>)
                          : recents.rating === 4
                            ? (<HStack color='#98D035'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            </HStack>)
                            : (<HStack color='#98D035'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                            </HStack>)}
                    <Text
                      style={{ hyphens: 'auto' }}
                      color='gray.500'
                      fontSize='lg'>
                      {recents.review?.length > 1
                        ? recents.review
                        : 'El usuario no dejo un comentario.'}
                    </Text>
                  </Stack>
                </HStack>
              )
            })}
            <Button bg='#98D035'
              _hover={{
                color: '#98D035',
                backgroundColor: '#E3FFB2'
              }}
              _active={{
                color: '#98D035',
                backgroundColor: '#E3FFB2'
              }}
              marginTop='3rem'
              onClick={reviewsModal.onOpen}
              color='white'
              marginLeft='1.5rem'>Ver todas las reseñas</Button>
            <Modal scrollBehavior='inside' size='3xl' isCentered closeOnOverlayClick={false} isOpen={reviewsModal.isOpen} onClose={reviewsModal.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Todas las reseñas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {padelField.review?.map((review, index) => {
                    return (
                      <HStack key={index} margin='2rem' alignItems='top' spacing={10}>
                        <Avatar
                          zIndex='-10'
                          size='lg'
                          name='poro'
                          src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                        />
                        <Stack>
                          <Text fontWeight='medium' fontSize='xl'>
                            {review.name}
                          </Text>
                          {review.rating === 1
                            ? (<HStack color='brand.primary'>
                              <Icon h='2rem' w='2rem' as={AiFillStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                            </HStack>)
                            : review.rating === 2
                              ? (<HStack color='brand.primary'>
                                <Icon h='2rem' w='2rem' as={AiFillStar} />
                                <Icon h='2rem' w='2rem' as={AiFillStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                              </HStack>)
                              : review.rating === 3
                                ? (<HStack color='brand.primary'>
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                  <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                </HStack>)
                                : review.rating === 4
                                  ? (<HStack color='brand.primary'>
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiOutlineStar} />
                                  </HStack>)
                                  : (<HStack color='brand.primary'>
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                    <Icon h='2rem' w='2rem' as={AiFillStar} />
                                  </HStack>)}
                          <Text
                            style={{ hyphens: 'auto' }}
                            color='gray.500'
                            fontSize='lg'>
                            {review.review?.length > 1
                              ? review.review
                              : 'El usuario no dejo un comentario.'}
                          </Text>
                        </Stack>
                      </HStack>
                    )
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button
                    bg='#98D035'
                    _hover={{
                      color: '#98D035',
                      backgroundColor: '#E3FFB2'
                    }}
                    _active={{
                      color: '#98D035',
                      backgroundColor: '#E3FFB2'
                    }}
                    onClick={reviewsModal.onClose}
                    color='white' >
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex flexDirection='column' alignItems='flex-start' justifyContent='flex-start' marginTop='3rem' gap='5'>
              <Text
                color='brand.primary'
                margin='0 1.5rem'
                fontWeight='medium'
                fontSize='2xl'>Dejar una reseña</Text>
              <Text margin='0 2rem' color='gray.500'>Comparte tu experiencia para ayudar a otros usuarios</Text>
              <HStack margin='0 2rem'>
                <Avatar size='lg' src={user.picture} />
                <Stack>
                  <Text>{user.email}</Text>
                  <HStack color='#98D035'>
                    <Button onClick={handleClickStarValue} value={1}>★</Button>
                    <Button onClick={handleClickStarValue} value={2}>★</Button>
                    <Button onClick={handleClickStarValue} value={3}>★</Button>
                    <Button onClick={handleClickStarValue} value={4}>★</Button>
                    <Button onClick={handleClickStarValue} value={5}>★</Button>
                  </HStack>
                </Stack>
              </HStack>
              <FormControl maxWidth='50%' margin='5'>
                <Textarea
                  placeholder='Escribe un comentario'
                  name='review'
                  value={inputReview.review}
                  onChange={(e) => handleChange(e)} />
                <Link to='/'>
                  <Button
                    bgColor='#98D035'
                    textColor='#ffff'
                    mr={3}
                    onClick={(e) => handleSubmit(e)}>
                    Publicar
                  </Button>
                </Link>
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>) : null
}
