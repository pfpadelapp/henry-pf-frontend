import {
  Input,
  InputGroup,
  Flex,
  Button,
  Text,
  useDisclosure,
  Center,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
  TableCaption
} from '@chakra-ui/react'
import { useState } from 'react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import SideBarAdmin from './SideBarAdmin'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'
import NavBarAdmin from './NavBarAdmin'
import ModalAdmin from './ModalAdmin'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function Banner() {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [userToDelete, setUserToDelete] = useState([])
  const { isAuthenticated, isLoading, user } = useAuth0()

  const handleInput = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  async function handleSubmit() {
    const resU = await axios.get(`${urlDeploy}/admin/searchU?name=${name}`)
    const resT = resU.data
    console.log(resT)
    setUserToDelete(resT)
    // setName('')
  }

  async function handleDelete(id, role) {
    console.log(id)
    if (role === 'jugador' || role === 'player' || role === 'owner') {
      await axios.delete(`${urlDeploy}/user/${id}`)
    } else {
      await axios.delete(`${urlDeploy}/owner/${id}`)
    }
    console.log('USUARIO BANEADO')
    handleSubmit()
    // setName('')
  }

  async function disableBanned(id, role) {
    console.log(id)
    if (role === 'jugador' || role === 'player' || role === 'owner') {
      await axios.put(`${urlDeploy}/user/able/${id}`)
    } else {
      await axios.put(`${urlDeploy}/owner/able/${id}`)
    }
    console.log('USUARIO DESBANEADO')
    handleSubmit()
    // setName('')
  }

  return isLoading === true ? null : isAuthenticated ? (
    <>
      <NavBarAdmin onOpen={onOpen} />
      <Flex>
        <SideBarAdmin />
        <Flex
          margin='12vh 10vw 0vh 10vw'
          width='100%'
          justifyContent='center'
          flexDir='column'
          alignSelf='flex-start'>
          <Center
            gap='3rem'
            bg='gray.700'
            borderRadius='3xl'
            alignItems='flex-start'
            height='calc(230vh - 12vh)'
            margin='2vh 0'>
              

            <TableContainer>
              <Flex padding='3%' justifyContent='center'>
                <Flex justifyContent='center'>
                  <InputGroup
                    height='40px'
                    backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
                    borderRadius='10px'>
                    <Input
                      padding='0 0.5rem'
                      variant='unstyled'
                      backgroundColor={
                        colorMode === 'dark' ? '#3d414c' : 'white'
                      }
                      type='text'
                      placeholder='Buscar por name o email'
                      value={name}
                      onChange={(e) => handleInput(e)}
                    />
                    <Button
                      color='gray.500'
                      bg='none'
                      children={<FiSearch />}
                      onClick={() => handleSubmit()}></Button>
                  </InputGroup>
                </Flex>
              </Flex>
              <Table>
                <TableCaption>HABILITAR/DESHABILITAR USUARIOS Y PROPIETARIOS</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Role</Th>
                    <Th>Habilitar/Deshabilitar</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {userToDelete &&
                    userToDelete.map((e) => (
                      // eslint-disable-next-line react/jsx-key
                      <Tr>
                        <Td>{e._id}</Td>
                        <Td>{e.email}</Td>
                        <Td>{e.name}</Td>
                        <Td>{e.role}</Td>
                        {e.isActive === true
                          ? (
                          <Td>
                            <Button
                              backgroundColor='#98D035'
                              color='gray.500'
                              bg='none'
                              height='30px'
                              width='130px'
                              onClick={() => handleDelete(e._id, e.role)}>
                              Deshabilitar
                            </Button>
                          </Td>
                            )
                          : (
                          <Td>
                            <Button
                              backgroundColor='#95302f'
                              color='white'
                              bg='none'
                              height='30px'
                              width='130px'
                              onClick={() => disableBanned(e._id, e.role)}>
                              Habilitar
                            </Button>
                          </Td>
                            )}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </Flex>
        <ModalAdmin isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  ): (
    navigate('/')
  )
}
