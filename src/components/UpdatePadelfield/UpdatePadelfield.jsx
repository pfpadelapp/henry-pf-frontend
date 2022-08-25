import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { updatePadelfieldOwner } from '../../redux/padelField/padelFieldSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export default function UpdatePadelfield() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useAuth0()
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: '',
    location: '',
    image: '',
    type: '',
    price: 0,
    availability: true,
    isActive: true
  })
  const [errors, setErrors] = useState({})
  const validateName = /^[a-zA-Z\s]+$/
  const idFromRtk = useSelector((state) => state.padelFields.idPadelfieldTemp)
  // console.log(idFromRtk)
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
  function validate(input) {
    const errors = {}
    if (!input.name) {
      errors.name = 'Debes ingresar un nombre'
    } else if (input.name.length < 7) {
      errors.name = 'Debe tener al menos 7 caracteres'
    } else if (input.name.length > 30) {
      errors.name = 'Debe tener menos de 30 caracteres'
    } else if (!validateName.test(input.name)) {
      errors.name = 'Los caracteres especiales no estan permitidos'
    }
    if (!input.location) {
      errors.location = 'La dirección es necesaria'
    } else if (input.location.length > 20) {
      errors.location = 'Debe tener menos de 20 caracteres'
    } else if (input.location < 7) {
      errors.location = 'Debe tener al menos 7 caracteres'
    }
    if (!input.price) {
      errors.price = 'Debe ingresar el precio de su cancha'
    } else if (input.price > 15000) {
      errors.price = 'El precio no debe ser superior a $15000'
    } else if (input.price < 0) {
      errors.price = 'El precio no puede ser negativo'
    }
    return errors
  }
  function handleCheckbox(e) {
    e.preventDefault()
    setInput({
      ...input,
      type: e.target.value
    })
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
    if (!input.name || !input.location || !input.type || !input.price) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Completa los campos obligatorios',
        confirmButtonColor: '#F27474'
      })
    } else {
      if (image !== null) {
        input.image = image.url
      }
      setErrors(validate(input))
      dispatch(updatePadelfieldOwner(idFromRtk, input))
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa!',
        text: 'Actualizaste los datos',
        confirmButtonColor: '#98D035'
      })
      setInput({
        name: '',
        location: '',
        image: '',
        type: '',
        price: 0,
        availability: true,
        isActive: true
      })
      navigate('/home')
    }
  }
  console.log(input)
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
              height='calc(100vh - 16vh)'
              margin='1vh 0'>
              <Flex
                flexDirection='column'
                gap='2.5rem'
                padding='5rem 0'
                width='70%'>
                <Heading>Actualiza tu cancha!</Heading>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    focusBorderColor='#98D035'
                    name='name'
                    value={input.name}
                    variant='flushed'
                    htmlSize={4}
                    size='md'
                    placeholder='Ingrese el nombre de la cancha'
                    onChange={(e) => handleChange(e)}
                    type='text'
                  />
                  {errors.name && (
                    <FormHelperText color='red.400'>{errors.name}</FormHelperText>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      focusBorderColor='#98D035'
                      type='text'
                      name='location'
                      value={input.location}
                      variant='flushed'
                      htmlSize={4}
                      onChange={(e) => handleChange(e)}
                      placeholder='Ingrese la localidad en la que se encuentra'
                    />
                  </InputGroup>
                  {errors.location && (
                    <FormHelperText width='70%' color='red.400'>
                      {errors.location}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Imagen</FormLabel>
                  <InputGroup>
                    <Input
                      focusBorderColor='#98D035'
                      name='image'
                      value={input.image}
                      variant='flushed'
                      htmlSize={4}
                      size='md'
                      onChange={(e) => uploadImage(e.target.files)}
                      type='file'
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tipo de cancha</FormLabel>
                  <RadioGroup>
                    <HStack>
                      <Radio
                        value='covered'
                        onChange={(e) => {
                          handleCheckbox(e)
                        }}>
                        Cubierta
                      </Radio>
                      <Radio
                        value='uncovered'
                        onChange={(e) => {
                          handleCheckbox(e)
                        }}>
                        Descubierta
                      </Radio>
                    </HStack>
                  </RadioGroup>
                  {errors.type && (
                    <FormHelperText color='red.400'>{errors.type}</FormHelperText>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Precio</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input
                      focusBorderColor='#98D035'
                      name='price'
                      value={input.price}
                      variant='flushed'
                      htmlSize={4}
                      size='md'
                      onChange={(e) => handleChange(e)}
                      placeholder='Ingrese el precio de la cancha'
                      type='number'
                    />
                  </InputGroup>
                  {errors.price && (
                    <FormHelperText color='red.400'>
                      {errors.price}
                    </FormHelperText>
                  )}
                </FormControl>
                <HStack>
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
                    backgroundColor='#98D035'
                    onClick={(e) => handleSubmit(e)}>
                    Agregar
                  </Button>
                  <Link to='/panel'>
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
                      Cancelar
                    </Button>
                  </Link>
                </HStack>
              </Flex>
            </Center>
          </Flex>
        </Flex>
      </>
    )
    : (
      navigate('/')
    )
}
