import {
  Input, InputGroup, Flex, Button, Text,
  useDisclosure, Center, Thead, Tbody, Tr, Th, Td, TableContainer,
  Table, TableCaption
} from '@chakra-ui/react'
import { useState } from 'react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import SideBarAdmin from './SideBarAdmin'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'
import NavBarAdmin from './NavBarAdmin'
import ModalAdmin from './ModalAdmin'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function Banner() {
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
        `${urlDeploy}/admin/searchU?username=${username}`
    )
    const resO = await axios.get(
        `${urlDeploy}/admin/searchO?username=${username}`
    )
    const resT = [...resU.data, ...resO.data]
    console.log(resT)
    setUserToDelete(resT)
    // setName('')
  }

  async function handleDelete(id, role) {
    console.log(id)
    if (role === 'user') {
      await axios.delete(`${urlDeploy}/user/${id}`)
    } else {
      await axios.delete(`${urlDeploy}/owner/${id}`)
    }
    console.log('USUARIO BANEADO')
    handleSubmit()
    setName('')
  }

  async function disableBanned(id, role) {
    console.log(id)
    if (role === 'user') {
      await axios.put(`${urlDeploy}/user/able/${id}`)
    } else {
      await axios.put(`${urlDeploy}/owner/able/${id}`)
    }
    console.log('USUARIO DESBANEADO')
    handleSubmit()
    setName('')
  }

  return (
    <>
     <NavBarAdmin onOpen={onOpen}/>
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
        <Flex>
        </Flex>
      <TableContainer>
        <Flex padding='2%' justifyContent='center'>
                <Flex justifyContent='center'>
                    <InputGroup height='40px' backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'} borderRadius='10px' >
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
        </Flex>
        <Table>
            <TableCaption>BANEAR USUARIOS Y PROPIETARIOS</TableCaption>
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
                      backgroundColor='#98D035'
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
                      backgroundColor='#95302f'
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
        <ModalAdmin isOpen={isOpen} onClose={onClose}/>

      </Flex>
    </>
  )
}
