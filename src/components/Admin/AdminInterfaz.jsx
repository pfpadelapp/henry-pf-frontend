import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  HStack,
  Spacer,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Stack,
  Select,
  RadioGroup,
  Radio,
  Divider
} from '@chakra-ui/react'
import { useState } from 'react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
// import SideBarAdmin from './components/Admin/SideBarAdmin'
// import { getUsers } from '../../redux/admin/adminSlice'
import axios from 'axios'

export default function AdminInterfaz() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setName] = useState('')
  const [userToDelete, setUserToDelete] = useState([])
  const [filtered, setFiltered] = useState([])
  const [box, setBox] = useState('')

  const handleInput = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setName(e.target.value)
  }

  async function handleSubmit() {
    const resU = await axios.get(
      `http://127.0.0.1:3000/admin/searchU?username=${username}`
    )
    const resO = await axios.get(
      `http://127.0.0.1:3000/admin/searchO?username=${username}`
    )
    const resT = [...resU.data, ...resO.data]
    console.log(resT)
    setFiltered(resT)
    setUserToDelete(resT)
    // setName('')
  }

  async function handleDelete(id, role) {
    console.log(id)
    if (role === 'user') {
      await axios.delete(`http://127.0.0.1:3000/user/${id}`)
    } else {
      await axios.delete(`http://127.0.0.1:3000/owner/${id}`)
    }
    console.log('USUARIO BANEADO')
    handleSubmit()
    setName('')
  }

  async function disableBanned(id, role) {
    console.log(id)
    if (role === 'user') {
      await axios.put(`http://127.0.0.1:3000/user/able/${id}`)
    } else {
      await axios.put(`http://127.0.0.1:3000/owner/able/${id}`)
    }
    console.log('USUARIO DESBANEADO')
    handleSubmit()
    setName('')
  }

  function p(value) {
    setBox(value)
    handleFilter()
  }
  const handleFilter = () => {
    const filteredRoles = userToDelete.filter(e => e.role === box)
    setFiltered(filteredRoles)
  }

  return (
    <>
      <Flex
        width='100%'
        height='10vh'
        padding='0 100px'
        backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}
        borderBottomColor='#F8F1F1'>
        <HStack as='nav' spacing='5'>
          <Button
            fontSize='15px'
            onClick={onOpen}
            backgroundColor={colorMode === 'dark' ? '#2c313d' : 'white'}>
            Crear Admin
          </Button>
          <Button
            fontSize='15px'
            backgroundColor={
              colorMode === 'dark' ? '#2c313d' : 'white'
            }></Button>
        </HStack>
        <Spacer />
        <HStack as='nav' spacing='5'>
          <ToggleColorMode />
        </HStack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor='gray.00'>Crear administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Name</FormLabel>
              <Input type='Name' placeholder='Name' />
            </FormControl>
            <FormControl>
              <FormLabel textColor='gray.600'>Email</FormLabel>
              <Input placeholder='Email' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Contraseña</FormLabel>
              <Input type='password' placeholder='Contraseña' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Username</FormLabel>
              <Input type='username' placeholder='Username' />
            </FormControl>
            <ModalFooter marginTop='20px'>
              <Button bgColor='#98D035' textColor='#ffff' mr={3}>
                Crear
              </Button>
              <Button onClick={onClose} textColor='gray.700'>
                Cancelar
              </Button>
            </ModalFooter>
            <Divider margin='20px' />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex>
        <InputGroup maxWidth='26.5vw'>
          <Input
            color='black'
            backgroundColor='white'
            value={username}
            onChange={(e) => handleInput(e)}
          />
          <Button
            backgroundColor='blue'
            color='gray.500'
            bg='none'
            onClick={() => handleSubmit()}>
            Search
          </Button>
        </InputGroup>
      </Flex>
      <Flex>
      <RadioGroup onChange={(value) => p(value)} value={box}>
      <Stack direction='row'>
        <Radio value='user'>Usuario</Radio>
        <Radio value='owner'>Propietario</Radio>
      </Stack>
    </RadioGroup>
      </Flex>
      <Flex>
        { filtered &&
          filtered.map((e) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <Text>Id: {e._id}</Text>
              <Text>email: {e.email}</Text>
              <Text>Username: {e.username}</Text>
              <Text>Role: {e.role}</Text>
              {e.isActive === true
                ? (
                <Button
                  backgroundColor='yellow'
                  color='gray.500'
                  bg='none'
                  onClick={() => handleDelete(e._id, e.role)}>
                  Banear usuario
                </Button>
                  )
                : (
                <Button
                  backgroundColor='yellow'
                  color='gray.500'
                  bg='none'
                  onClick={() => disableBanned(e._id, e.role)}>
                  Desbanear usuario
                </Button>
                  )}
            </div>
          ))}
      </Flex>
    </>
  )
}
