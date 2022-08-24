import {
  Heading,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  Tabs,
  Text,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Badge,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  TabPanels,
  FormHelperText,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  InputLeftElement,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate, Link } from 'react-router-dom'
import { BiUpload } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { useRef, useState } from 'react'
import { useColorMode } from '@chakra-ui/color-mode'
import { getUpdateOwner } from '../../redux/owner/ownerSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { removePadelfieldOwner } from '../../redux/padelField/padelFieldSlice'
import { getUpdateUser } from '../../redux/users/usersSlice'
import axios from 'axios'

export default function Panel() {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const dataRender = useSelector((state) => state.users.userDetail)
  const [input, setInput] = useState({
    name: '',
    telephone: '',
    pic: ''
  })
  const [image, setImage] = useState(null)
  const uploadImage = async (files) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'wtm3pwuj')
    try {
      const aux = await axios.post(
        'https://api.cloudinary.com/v1_1/dbhb8sohh/image/upload',
        formData
      )
      const imageUpload = aux.data
      console.log(imageUpload)
      setImage(imageUpload)
    } catch (error) {
      console.log(error)
    }
  }
  const [errors, setErrors] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const validateName = /^[a-zA-Z\s]+$/
  function validate(input) {
    const errors = {}
    if (!input.name) {
      errors.name = 'Debes ingresar el nuevo nombre'
    } else if (input.name.length < 7) {
      errors.name = 'Debe tener al menos 7 caracteres'
    } else if (input.name.length > 20) {
      errors.name = 'Debe tener menos de 20 caracteres'
    } else if (!validateName.test(input.name)) {
      errors.name = 'Los caracteres especiales no estan permitidos'
    }
    if (!input.telephone) {
      errors.telephone = 'El celular es necesario'
    } else if (input.telephone.length > 10) {
      errors.telephone = 'El numero de celular no puede tener mas de 10 digitos'
    } else if (input.telephone < 0) {
      errors.telephone = 'El numero de celular no puede ser negativo'
    } else if (
      input.telephone.toString().includes('.') ||
      input.telephone.toString().includes(',')
    ) {
      errors.telephone = 'Los valores decimales no estan permitidos'
    }
    return errors
  }
  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (!input.telephone && !input.name) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes dejar los campos vacios',
        confirmButtonColor: '#F27474'
      })
    } else {
      if (image !== null) {
        input.pic = image.secure_url
      }
      setErrors(validate(input))
      dispatch(getUpdateUser(dataRender.id, input))
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa!',
        text: 'Actualizaste los datos',
        confirmButtonColor: '#98D035'
      })
      setInput({
        telephone: '',
        name: '',
        pic: ''
      })
    }
  }
  function handleRemove(e) {
    e.preventDefault()
    dispatch(removePadelfieldOwner(dataRender.id))
  }
  return isLoading === true ? null : isAuthenticated
    ? (

      <>
        <NavBar />
        <Flex>
          <Sidebar />
          <Flex
            marginTop='12vh'
            marginLeft='75px'
            width='100%'
            flexDir='column'
            alignItems='center'
            padding={{ base: '', lg: '0 5rem', xl: '0 15rem' }}>
            <Center
              backgroundColor={colorMode == 'dark' ? '#2C313D' : '#F8F8F8'}
              width='80%'
              borderRadius='3xl'
              alignItems='flex-start'
              margin='2vh 0'>
              <Flex
                flexDirection='column'
                gap='2.5rem'
                padding='5rem 0'
                width='70%'>
                <Box>
                  <Flex
                    flexDirection='row'
                    paddingBottom='2rem'
                    alignItems='center'
                    gap='1rem'>
                    <Avatar size='xl' src={dataRender?.picture ? dataRender.picture : user.picture} />
                    <Flex flexDirection='column'>
                      <Heading>Hola<span style={{ color: '#98D035' }}> {dataRender.name}</span></Heading>
                      <Heading size='lg'>bienvenid@ de nuevo!</Heading>
                    </Flex>
                  </Flex>
                </Box>
                <Box>
                  <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                      <Tab>Datos de la cuenta</Tab>
                      <Tab>Modificar datos</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Box lineHeight='2rem'>
                          <Text padding='1rem 0'>Usuario: {dataRender.name}</Text>
                          <Text padding='1rem 0'>Email: {dataRender.email}</Text>
                          <Text padding='1rem 0'>Telefono: {dataRender.user_metadata?.telePhone ? dataRender.user_metadata?.telePhone : dataRender.user_metadata?.telephone}</Text>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box lineHeight='2rem' marginBottom='3rem'>
                          <Stack>
                            <FormControl isRequired>
                              <FormLabel>Nombre de usuario</FormLabel>
                              <Input
                                focusBorderColor='#98D035'
                                name='name'
                                value={input.name}
                                variant='flushed'
                                htmlSize={4}
                                size='md'
                                placeholder='Ingrese el nuevo nombre de usuario'
                                onChange={(e) => handleChange(e)}
                                type='text'
                              />
                              {errors.name && (
                                <FormHelperText color='red.400'>
                                  {errors.name}
                                </FormHelperText>
                              )}
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel>Telefono</FormLabel>
                              <Input
                                focusBorderColor='#98D035'
                                name='telephone'
                                value={input.telephone}
                                variant='flushed'
                                htmlSize={4}
                                size='md'
                                placeholder='Ingrese el nuevo numero de celular'
                                onChange={(e) => handleChange(e)}
                                type='number'
                              />
                              {errors.telephone && (
                                <FormHelperText color='red.400'>
                                  {errors.telephone}
                                </FormHelperText>
                              )}
                            </FormControl>
                            <FormControl>
                              <FormLabel>Imagen</FormLabel>
                              <InputGroup>
                                <Input
                                  focusBorderColor='#98D035'
                                  name='image'
                                  value={input.pic}
                                  variant='flushed'
                                  htmlSize={4}
                                  size='md'
                                  onChange={(e) => uploadImage(e.target.files)}
                                  type='file'
                                />
                              </InputGroup>
                            </FormControl>
                          </Stack>
                        </Box>
                        <Button
                          leftIcon={<BiUpload />}
                          color='#ffffff'
                          bg='#98D035'
                          onClick={(e) => handleSubmit(e)}
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
                          backgroundColor='#98D035'
                          isDisabled={
                            !(Object.keys(errors).length === 0 &&
                              input.name &&
                              input.telephone)
                          }>
                          Actualizar datos
                        </Button>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                <Divider />
                <Box>
                  <Heading margin='1rem 0'>Tus canchas</Heading>
                  <TableContainer>
                    <Table variant='striped' colorScheme='#98D035'>
                      <Thead>
                        <Tr>
                          <Th>Nombre</Th>
                          <Th textAlign='center'>Actualizar datos</Th>
                          <Th textAlign='center'>Eliminar cancha</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataRender.padelFields?.length > 0
                          ? dataRender.padelFields?.map((padelfield) => {
                            return (
                              <>
                                <Tr>
                                  <Td>
                                    <Flex gap='1rem' alignItems='center'>
                                      <Avatar size='sm' src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg' />
                                      Super cancha de padel
                                    </Flex>
                                  </Td>
                                  <Td textAlign='center'>
                                    <Link to='/actualizarCancha'>
                                      <IconButton icon={<BiUpload />} bg='#98D035' />
                                    </Link>
                                  </Td>
                                  <Td onClick={onOpen} textAlign='center'><IconButton icon={<AiFillDelete />} bg='red.500' /></Td>
                                </Tr>
                              </>
                            )
                          })
                          : (<Tr>
                            <Td>
                              No hay info
                            </Td>
                            <Td>
                              No hay info
                            </Td>
                            <Td>
                              No hay info
                            </Td>
                          </Tr>)}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Divider />
                  <HStack
                    width='100%'
                    justifyContent='space-between'
                    paddingTop='3rem'
                    margin='2rem 0'>
                    <Link to='/crearCancha'>
                      <Button
                        color='#ffffff'
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
                        backgroundColor='#98D035'
                        bg='#98D035'>
                        Crear cancha
                      </Button>
                    </Link>
                    <Button
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
                      Ver todas las canchas
                    </Button>
                  </HStack>
                </Box>
              </Flex>
            </Center>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Eliminar cancha
                </AlertDialogHeader>
                <AlertDialogBody>
                  Estas seguro de que quieres eliminar esta cancha?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    bg='red.500'
                    color='white'
                    ml={3}
                    onClick={(e) => {
                      onClose()
                      handleRemove(e)
                    }}>
                    Eliminar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        </Flex>
      </>
    )
    : (
      navigate('/')
    )
}
