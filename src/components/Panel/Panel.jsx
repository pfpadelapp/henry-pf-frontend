import { Avatar, Box, Button, Center, Flex, HStack, Stack, Tab, TabList, TabPanel, Tabs, Text } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'

export default function Panel() {
  return (
    <>
      <NavBar/>
      <Flex>
        <Sidebar/>
        <Flex bg='orange.300' margin='12vh 10vw 0vh 10vw' width='100%' justifyContent='center' flexDir="column" alignSelf='flex-start'>
          <Center gap='3rem' bg='green.400' alignItems='flex-start' height='calc(100vh - 12vh)'>
            <Flex bg='red.400' flexDirection='column' width='50%' gap= '3rem'>
              <Box bg= 'blue.500'>
                <Box>
                  <Text>Hola Nombre de Propietario</Text>
                  <Text>bienvenido de nuevo!</Text>
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
            <Flex bg='red.400' flexDirection='column' width='50%' gap= '3rem'>
              <Box bg= 'blue.500'>
                <Text>Aca van los torneos</Text>
                <Box>
                  <Text>Proximos torneos</Text>
                  <Text>Torneo 1</Text>
                  <Text>Torneo 2</Text>
                  <Text>Torneo 3</Text>
                </Box>
              </Box>
              <Box bg= 'blue.500'>
                <Text>
                  Ultimas actividades
                </Text>
                <Tabs>
                  <TabList>
                    <Tab>Reservas</Tab>
                    <Tab>Cancelado</Tab>
                  </TabList>
                  <TabPanel>
                    Hola
                  </TabPanel>
                  <TabPanel>
                    Adios
                  </TabPanel>
                </Tabs>
              </Box>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}
