import { Heading, Avatar, Box, Button, Center, Flex, HStack, Stack, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, Tabs, Text, Thead, Tr, Td, Th, Tbody, Badge } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import iconT1 from '../../resources/assets/T1.png'
import iconT2 from '../../resources/assets/T2.png'
import iconT3 from '../../resources/assets/T3.png'

export default function Panel() {
  return (
    <>
      <NavBar/>
      <Flex>
        <Sidebar/>
        <Flex margin='12vh 10vw 0vh 10vw' width='100%' justifyContent='center' flexDir="column" alignSelf='flex-start'>
          <Center gap='3rem' bg='gray.700' borderRadius='3xl' alignItems='flex-start' height='calc(100vh - 12vh)' margin='2vh 0'>
            <Flex flexDirection='column' width='50%' gap= '3rem'>
              <Box bg= 'blue.500'>
                <Box>
                  <Flex flexDirection='column' paddingBottom='2rem'>
                    <Heading>Hola <span style={{ color: '#98D035' }}>NombreUsuario</span></Heading>
                    <Heading size='lg'>bienvenido de nuevo!</Heading>
                  </Flex>
                  <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae explicabo ab labore laborum neque voluptas placeat minima non.</Text>
                </Box>
              </Box>
              <Box bg= 'blue.500'>
                <Text>
                  Aca los filtros
                </Text>
                <Button>Agregar cancha</Button>
                <Button>Quitar cancha</Button>
                <Button>Actualizar cancha</Button> {/* para actualizar horario */}
                <Button>Ver reservas de canchas</Button>
                <Button>Organizar torneo</Button>
              </Box>
            </Flex>
            <Flex flexDirection='column' width='50%' gap= '3rem'>
              <Box>
                <Heading>Proximos torneos</Heading>
                <Box>
                  <HStack gap='1rem' marginTop='2rem' bg='gray.300'>
                    <Avatar src={iconT1}/>
                    <Text>Torneo 1 Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                    <Badge variant='solid' color='#98D035' > 12 miembros</Badge>
                  </HStack>
                  <HStack gap='1rem' marginTop='2rem'>
                    <Avatar src={iconT2}/>
                    <Text>Torneo 2 Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                    <Badge variant='solid' color='#98D035' > 8 miembros</Badge>
                  </HStack>
                  <HStack gap='1rem' margin='2rem 0'>
                    <Avatar src={iconT3}/>
                    <Text>Torneo 3 Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                    <Badge variant='solid' color='#98D035' > 7 miembros</Badge>
                  </HStack>
                </Box>
              </Box>
              <Box>
                <Text>
                  Ultimas actividades
                </Text>
                <TableContainer>
                  <Table variant='striped' colorScheme='#98D035'>
                    <TableCaption>Ver todos</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Usuario</Th>
                        <Th>Contacto</Th>
                        <Th>Detalle</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar size='sm' src='https://tn.com.ar/resizer/DTc339zZUnTPWVqchKDbvi-alm8=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/5JDMLPHLJDWSALLJN7SK5TUDAI.jpg'/>
                            HomeroJsimpson@gmail.com
                          </Flex>
                        </Td>
                        <Td>01166223377</Td>
                        <Td>17hs a 18hs el 22/08/2022</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar size='sm' src='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2022/05/simpson-krusty-payaso-2699729.jpg?itok=leRSayV5'/>
                            HerschelKrustofsky@gmail.com
                          </Flex>
                        </Td>
                        <Td>01112345678</Td>
                        <Td>9hs a 10hs el 25/08/2022</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar size='sm' src='https://pbs.twimg.com/media/ES3cH4QU8AALr8q.jpg'/>
                            TroyMcClure@gmail.com
                          </Flex>
                        </Td>
                        <Td>01198475214</Td>
                        <Td>15hs a 16hs el 22/08/2022</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex gap='1rem' alignItems='center'>
                            <Avatar size='sm' src='https://uploads.candelaestereo.com/1/2022/06/12-frases-de-Rafa-Gorgory-muy-graciosas-y-extranas.01.jpg'/>
                            rafaGorgory@gmail.com
                          </Flex>
                        </Td>
                        <Td>01168478814</Td>
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
