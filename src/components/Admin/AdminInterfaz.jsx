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
  Center,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  TableContainer,
  Table
} from '@chakra-ui/react'
import { useState } from 'react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import SideBarAdmin from './SideBarAdmin'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'

export default function AdminInterfaz() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setName] = useState('')
  const [userToDelete, setUserToDelete] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  })

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

  // -------- CREATE ADMIN ------------//
  function handleInputChangeAdmin (e) {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    const formInfo = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      username: formData.username
    }
    if (formInfo.name === '' || formInfo.email === '' || formInfo.password === '' || formInfo.username === '') {
      alert('Por favor todos los campos deben ser llenados')
    } else {
      await axios.post('http://127.0.0.1:3000/admin', formInfo)
        .then((res) => {
          if (res.data.msg) alert(res.data.msg)
          else alert('Un nuevo administrador fue creado')
        })
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      username: ''
    })
  }

  return (
    <>
     <Flex
        zIndex='1'
        width='100%'
        position='fixed'
        top='0'
        height='10%'
        padding='10px 100px'
        justifyContent='space-between'
        backgroundColor={colorMode === 'dark' ? '#2c313d' : '#F8F8F8'}
        alignItems='center'
        borderBottomColor='none'
        borderBottomStyle='solid'
        borderBottomWidth='0px'>
        <HStack as='nav' spacing='5'>
          <Text>DASHBOARD ADMIN</Text>
        </HStack>
        <Spacer />
        <HStack as='nav' spacing='5'>
            <Flex>
                <InputGroup maxWidth='26.5vw' backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'} borderRadius='10px' >
                  <Input
                    padding='0 0.5rem'
                    variant='unstyled'
                    backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
                    type='text'
                    placeholder='Buscar por username'
                    value={username}
                    onChange={(e) => handleInput(e)}
                  />
                  <Button
                    color='gray.500'
                    bg='none'
                    children={<FiSearch />}
                    onClick={() => handleSubmit()}
                    >
                  </Button>
              </InputGroup>
          </Flex>
        </HStack>
        <Spacer />
        <HStack as='nav' spacing='5'>
          <ToggleColorMode />
          <Button
            fontSize='15px'
            onClick={onOpen}
            backgroundColor={colorMode === 'dark' ? '#98D035' : '#98D035'}>
            + Crear Admin
          </Button>
        </HStack>
      </Flex>
     <Flex>
      <SideBarAdmin />
      <Flex
      margin='12vh 10vw 0vh 10vw'
      width='100%'
      justifyContent='center'
      flexDir='column'
      alignSelf='flex-start'>
      <Center gap='3rem'
            bg='gray.700'
            borderRadius='3xl'
            alignItems='flex-start'
            height='calc(100vh - 12vh)'
            margin='2vh 0'>
      <Flex>
      </Flex>

      <TableContainer>
        <Flex justifyContent='center' height='50px' padding='2%'>
          <Text >BANEAR USUARIOS</Text>
        </Flex>
        <Table>
              <Thead>
              <Tr>
              <Th>Id</Th>
              <Th>Email</Th>
              <Th >Username</Th>
              <Th >Role</Th>
              <Th >Banear/Desbanear</Th>
              </Tr>
              </Thead>

            <Tbody>
            { userToDelete &&
          userToDelete.map((e) => (
                // eslint-disable-next-line react/jsx-key
                <Tr>
              <Td>{e._id}</Td>
                <Td>{e.email}</Td>
                <Td>{e.username}</Td>
                <Td>{e.role}</Td>
                {e.isActive === true
                  ? (
                    <Td>
                    <Button
                      backgroundColor='#95302f'
                      color='gray.500'
                      bg='none'
                      height='30px'
                      width='150px'
                      onClick={() => handleDelete(e._id, e.role)}>
                      Banear usuario
                    </Button>
                    </Td>)
                  : (<Td>
                    <Button
                      backgroundColor='#98D035'
                      color='white'
                      bg='none'
                      height='30px'
                      width='150px'
                      onClick={() => disableBanned(e._id, e.role)}>
                      Desbanear usuario
                    </Button>
                    </Td>)}
              </Tr>
          ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Center>
        </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor='gray.00'>Crear administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Name</FormLabel>
              <Input required='true' type='Name' name='name' placeholder='Name' value={formData.name} onChange={handleInputChangeAdmin}/>
            </FormControl>
            <FormControl>
              <FormLabel textColor='gray.600'>Email</FormLabel>
              <Input required placeholder='Email' name='email' value={formData.email} onChange={handleInputChangeAdmin} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Contraseña</FormLabel>
              <Input required type='password' name='password' placeholder='Contraseña' value={formData.password} onChange={handleInputChangeAdmin} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Username</FormLabel>
              <Input required type='username' name='username' value={formData.username} onChange={handleInputChangeAdmin} placeholder='Username' />
            </FormControl>
            <ModalFooter marginTop='20px'>
              <Button bgColor='#98D035' textColor='#ffff' mr={3} onClick={handleCreateAdmin}>
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
      </Flex>
    </>
  )
}
