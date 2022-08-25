import {
  Heading,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  TabPanels,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import { useColorMode } from '@chakra-ui/color-mode'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { BiUpload } from 'react-icons/bi'
import { getUpdateUser } from '../../redux/users/usersSlice.js'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function Perfil() {
  const { user, isAuthenticated } = useAuth0()
  const dataRender = useSelector((state) => state.users.userDetail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { colorMode } = useColorMode()
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
      // console.log(imageUpload)
      setImage(imageUpload)
    } catch (error) {
      console.log(error)
    }
  }
  const [errors, setErrors] = useState({})
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
  return isAuthenticated ? (
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
            height='calc(100vh - 16vh)'
            margin='1vh 0'>
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
              {/* <Box>
                  <Heading size='md'>Ultimas actividades</Heading>
                  <TableContainer>
                    <Table variant='striped' colorScheme='#98D035'>
                      <TableCaption>Ver historial de reservas</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Detalles</Th>
                          <Th>Montos</Th>
                          <Th>Fechas</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>
                            <Flex gap='1rem' alignItems='center'>
                              Reservaste la cancha Field1c
                            </Flex>
                          </Td>
                          <Td>$2000</Td>
                          <Td>17hs a 18hs el 22/08/2022</Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex gap='1rem' alignItems='center'>
                              Reservaste la cancha Fieldtwo
                            </Flex>
                          </Td>
                          <Td>$1500</Td>
                          <Td>9hs a 10hs el 25/08/2022</Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex gap='1rem' alignItems='center'>
                              Reservaste la cancha FieldThree
                            </Flex>
                          </Td>
                          <Td>$120</Td>
                          <Td>15hs a 16hs el 22/08/2022</Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex gap='1rem' alignItems='center'>
                              Reservaste la cancha Prueba
                            </Flex>
                          </Td>
                          <Td>$2000</Td>
                          <Td>10hs a 11hs el 24/08/2022</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box> */}
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </>
  ) : (
    navigate('/')
  )
}
