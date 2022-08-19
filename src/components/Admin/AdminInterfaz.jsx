import {
  FormControl, FormLabel, Input, InputGroup, Flex, HStack, Spacer, Button, Text,
  useDisclosure, Modal, ModalCloseButton, ModalFooter, ModalBody, ModalOverlay,
  ModalContent, ModalHeader, Center, Thead, Tbody, Tr, Th, Td, Divider, TableContainer,
  Table
} from '@chakra-ui/react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import SideBarAdmin from './SideBarAdmin'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdmins } from '../../redux/admin/adminSlice'

export default function AdminInterfaz() {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setName] = useState('')
  const allAdmins = useSelector((state) => state.admins.admins)
  // const [adminToDelete, setadminToDelete] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  })

  console.log(allAdmins)
  useEffect(() => {
    dispatch(getAdmins())
  }, [])

  async function handleDelete(id) {
    await axios.delete(`http://127.0.0.1:3000/admin/${id}`)
    console.log('ADMIN BANEADO')
    setName('')
  }

  async function disableBanned(id) {
    await axios.put(`http://127.0.0.1:3000/admin/able/${id}`)
    console.log('ADMIN DESBANEADO')
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
          <Text >LISTA DE ADMINISTRADORES</Text>
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
            { allAdmins &&
          allAdmins.map((e) => (
                // eslint-disable-next-line react/jsx-key
                <Tr>
              <Td>{e.id}</Td>
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
                      onClick={() => handleDelete(e.id)}>
                      Banear admin
                    </Button>
                    </Td>)
                  : (<Td>
                    <Button
                      backgroundColor='#98D035'
                      color='white'
                      bg='none'
                      height='30px'
                      width='150px'
                      onClick={() => disableBanned(e.id)}>
                      Desbanear admin
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
