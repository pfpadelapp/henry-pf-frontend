import { Heading, Avatar, Box, Button, Center, Flex, HStack, Stack, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, Tabs, Text, Thead, Tr, Td, Th, Tbody, Badge, TabPanels, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'

export default function Perfil() {
  const userData = useSelector((state) => state.users.userDetail)
  console.log(userData)
  return (
    <>
      <NavBar/>
      <Flex>
        <Sidebar/>
        <Flex margin='12vh 10vw 0vh 10vw' width='100%' flexDir="column" alignItems='center'>
          <Center bg='gray.700' width='60%' borderRadius='3xl' alignItems='flex-start' height='calc(100vh - 16vh)' margin='1vh 0'>
            <Flex flexDirection='column' gap= '2.5rem' padding='3rem 2rem'>
              <Box>
                <Flex flexDirection='row' paddingBottom='2rem' alignItems='center' gap='1rem'>
                  <Avatar size='xl' src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'/>
                  <Flex flexDirection='column'>
                    <Heading>Hola<span style={{ color: '#98D035' }}> {userData.name}</span></Heading>
                    <Heading size='lg'>bienvenido de nuevo!</Heading>
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
                          <Text>Nombre: {userData.name} {userData.lastName}</Text>
                          <Text>Usuario:  {userData.username}</Text>
                          <Text>Email: {userData.email}</Text>
                          <Text>Teléfono: no hay numero de celular :c</Text>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box lineHeight='2rem'>
                          <HStack>
                            <Text>Nombre</Text>
                            <Input htmlSize={4} size='xs' width='md' placeholder='Ej: pepe'/>
                          </HStack>
                          <HStack>
                            <Text>Usuario</Text>
                            <Input htmlSize={4} size='xs' width='md' placeholder='Ej: usuario234'/>
                          </HStack>
                          <HStack>
                            <Text>Telefono</Text>
                            <Input htmlSize={4} size='xs' width='md' placeholder='Ej: 1125698744'/>
                          </HStack>
                        </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box>
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
              </Box>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}
