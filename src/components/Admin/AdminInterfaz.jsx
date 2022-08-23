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
import { getAdmins } from '../../redux/admin/adminSlice'
import NavBarAdmin from './NavBarAdmin'
import ModalAdmin from './ModalAdmin'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function AdminInterfaz() {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const allAdmins = useSelector((state) => state.admins.admins)
  // const [adminToDelete, setadminToDelete] = useState([])

  console.log(allAdmins)
  useEffect(() => {
    dispatch(getAdmins())
  }, [])

  async function handleDelete(id) {
    await axios.delete(`${urlDeploy}/admin/${id}`)
    console.log('ADMIN BANEADO')
    dispatch(getAdmins())
  }

  async function disableBanned(id) {
    await axios.put(`${urlDeploy}/admin/able/${id}`)
    console.log('ADMIN DESBANEADO')
    dispatch(getAdmins())
  }

  return (
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
                <Text>LISTA DE ADMINISTRADORES</Text>
              </Flex>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Role</Th>
                    <Th>Banear/Desbanear</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {allAdmins &&
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
                              backgroundColor='#98D035'
                              color='gray.500'
                              bg='none'
                              height='30px'
                              width='150px'
                              onClick={() => handleDelete(e.id)}>
                              Banear admin
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
                              Desbanear admin
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
  )
}
