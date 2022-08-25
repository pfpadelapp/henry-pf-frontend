import {
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
  Divider,
  TableContainer,
  Table
} from '@chakra-ui/react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'
import SideBarAdmin from './SideBarAdmin'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBarAdmin from './NavBarAdmin'
import ModalAdmin from './ModalAdmin'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function Admin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const allUsers = useSelector((state) => state.users.users)
  // const [adminToDelete, setadminToDelete] = useState([])
  const allAdmins = allUsers?.filter(e => e.user_metadata.isAdmin === true)
  const { isAuthenticated, isLoading, user } = useAuth0()
  useEffect(() => {
    // dispatch(getAdmins())
    dispatch(fetchAllUsers())
  }, [])

  async function handleDelete(id) {
    await axios.delete(`${urlDeploy}/user/${id}`)
    // console.log('ADMIN BANEADO')
    dispatch(fetchAllUsers())
  }

  async function disableBanned(id) {
    await axios.put(`${urlDeploy}/user/able/${id}`)
    // console.log('ADMIN DESBANEADO')
    dispatch(fetchAllUsers())
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
            height='calc(100vh - 12vh)'
            margin='2vh 0'>
            <Flex></Flex>

            <TableContainer>
              <Flex justifyContent='center' height='50px' padding='2%'>
                <Text fontWeight='bold' >LISTA DE ADMINISTRADORES</Text>
              </Flex>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Habilitar/Deshabilitar</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {allAdmins &&
                    allAdmins.map((e) => (
                      // eslint-disable-next-line react/jsx-key
                      <Tr>
                        <Td>{e.id}</Td>
                        <Td>{e.email}</Td>
                        <Td>{e.user_metadata.rol}</Td>
                        {e.user_metadata.isActive === true
                          ? (
                            <Td>
                              <Button
                                backgroundColor='#98D035'
                                color='gray.500'
                                bg='none'
                                height='30px'
                                width='150px'
                                onClick={() => handleDelete(e.id)}>
                                Habilitar Admin.
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
                                width='150px'
                                onClick={() => disableBanned(e.id)}>
                                Deshabilitar Admin.
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
  ) : (
    navigate('/')
  )
}
