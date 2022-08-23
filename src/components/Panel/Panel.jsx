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
import { useDispatch } from 'react-redux'
import { removePadelfieldOwner } from '../../redux/padelField/padelFieldSlice'

export default function Panel() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const [input, setInput] = useState({
    password: '',
    contact: '',
    username: ''
  })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const validateName = /^[a-zA-Z\s]+$/
  const validatePass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
  function validate(input) {
    const errors = {}
    if (!input.username) {
      errors.username = 'Debes ingresar el nuevo username'
    } else if (input.username.length < 7) {
      errors.username = 'Debe tener al menos 7 caracteres'
    } else if (input.username.length > 20) {
      errors.username = 'Debe tener menos de 20 caracteres'
    } else if (!validateName.test(input.username)) {
      errors.username = 'Los caracteres especiales no estan permitidos'
    }
    if (!input.contact) {
      errors.contact = 'El celular es necesario'
    } else if (input.contact.length > 10) {
      errors.contact = 'El numero de celular no puede tener mas de 10 digitos'
    } else if (input.contact < 0) {
      errors.contact = 'El numero de celular no puede ser negativo'
    } else if (
      input.contact.toString().includes('.') ||
      input.contact.toString().includes(',')
    ) {
      errors.contact = 'Los valores decimales no estan permitidos'
    }
    if (!input.password) {
      errors.password = 'La contraseña es necesaria'
    } else if (!validatePass.test(input.password)) {
      errors.password =
        'Debe tener entre 8 y 16 caracteres, un digito, una minuscula, una mayuscula y un caracter especial'
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
    if (!input.contact && !input.password && !input.username) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes dejar los campos vacios',
        confirmButtonColor: '#F27474'
      })
    } else {
      setErrors(validate(input))
      dispatch(getUpdateOwner(idOwner, input))
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa!',
        text: 'Actualizaste los datos',
        confirmButtonColor: '#98D035'
      })
      setInput({
        password: '',
        contact: '',
        username: ''
      })
    }
  }
  function handleRemove(e) {
    e.preventDefault()
    dispatch(removePadelfieldOwner(idPadelfield))
  }
  return isAuthenticated
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
                  <Avatar size='xl' src={user.picture} />
                  <Flex flexDirection='column'>
                    <Heading>
                      Hola<span style={{ color: '#98D035' }}> {user.name}</span>
                    </Heading>
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
                        <Text padding='1rem 0'>
                          Nombre: {user.name} {user.lastName}
                        </Text>
                        <Text padding='1rem 0'>Usuario: {user.nickname}</Text>
                        <Text padding='1rem 0'>Email: {user.email}</Text>
                        <Text padding='1rem 0'>Teléfono: 1122339875</Text>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box lineHeight='2rem' marginBottom='3rem'>
                        <Stack>
                          <FormControl isRequired>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <Input
                              focusBorderColor='#98D035'
                              name='username'
                              value={input.username}
                              variant='flushed'
                              htmlSize={4}
                              size='md'
                              placeholder='Ingrese el nuevo nombre de usuario'
                              onChange={(e) => handleChange(e)}
                              type='text'
                            />
                            {errors.username && (
                              <FormHelperText color='red.400'>
                                {errors.username}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup size='md'>
                              <Input
                                focusBorderColor='#98D035'
                                type={show ? 'text' : 'password'}
                                name='password'
                                value={input.password}
                                variant='flushed'
                                htmlSize={4}
                                onChange={(e) => handleChange(e)}
                                placeholder='Ingrese la nueva contraseña'
                              />
                              <InputRightElement width='4.5rem'>
                                <Button
                                  height='1.75rem'
                                  onClick={handleShowPassword}>
                                  {show ? 'Ocultar' : 'Mostrar'}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            {errors.password && (
                              <FormHelperText width='70%' color='red.400'>
                                {errors.password}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Telefono</FormLabel>
                            <Input
                              focusBorderColor='#98D035'
                              name='contact'
                              value={input.contact}
                              variant='flushed'
                              htmlSize={4}
                              size='md'
                              placeholder='Ingrese el nuevo numero de celular'
                              onChange={(e) => handleChange(e)}
                              type='number'
                            />
                            {errors.contact && (
                              <FormHelperText color='red.400'>
                                {errors.contact}
                              </FormHelperText>
                            )}
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
                          input.username &&
                          input.contact &&
                          input.password)
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
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar
                              size='sm'
                              src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'
                            />
                            Super cancha de padel
                          </Flex>
                        </Td>
                        <Td textAlign='center'>
                          <Link to='/actualizarCancha'>
                            <IconButton icon={<BiUpload />} bg='#98D035' />
                          </Link>
                        </Td>
                        <Td onClick={onOpen} textAlign='center'>
                          <IconButton icon={<AiFillDelete />} bg='red.500' />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar
                              size='sm'
                              src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'
                            />
                            Padel Xtreme
                          </Flex>
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<BiUpload />} bg='#98D035' />
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<AiFillDelete />} bg='red.500' />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar
                              size='sm'
                              src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'
                            />
                            Me quedo sin ideas
                          </Flex>
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<BiUpload />} bg='#98D035' />
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<AiFillDelete />} bg='red.500' />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar
                              size='sm'
                              src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'
                            />
                            Ayuda
                          </Flex>
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<BiUpload />} bg='#98D035' />
                        </Td>
                        <Td textAlign='center'>
                          <IconButton icon={<AiFillDelete />} bg='red.500' />
                        </Td>
                      </Tr>
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
                    Organizar torneo
                  </Button>
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
