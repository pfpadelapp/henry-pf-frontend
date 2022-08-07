import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu, FiHome, FiBell, FiFilter, FiClipboard, FiInfo } from "react-icons/fi";
import { Flex , Menu, Link, MenuButton, useDisclosure, Button, Icon, Avatar, ModalCloseButton, ModalFooter, ModalBody, Heading, Text, Modal, IconButton, ModalOverlay, ModalContent, Stack, Select, ModalHeader} from '@chakra-ui/react'
import NavItem from "../NavItem/NavItem"
import {filterByType, orderByPrice, orderByAvailability } from '../../redux/padelField/padelFieldSlice'

export default function Sidebar() {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [navSize, changeNavSize] = useState("large")

    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }
    
      function handleOrderPrice(e){
        e.preventDefault();
        dispatch(orderByPrice(e.target.value))
    }
      
      function handleOrderAvailability(e){
        e.preventDefault();
        dispatch(orderByAvailability(e.target.value))
    }

    return(
        <Flex 
            margin="5"
            pos="sticky" 
            h="95vh" 
            backgroundColor="#F8F8F8"
            borderRadius={navSize =="small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "400px"}
            flexDir="column" 
            justifyContent="space-between"
            height='100vh'
            >
            <Flex 
                p="5%" 
                flexDir="column" 
                align-items={navSize == "small" ? "center" : "flex-start"} 
                as="nav">
                <IconButton 
                    background="none" 
                    mt={5} 
                    _hover={{background:"#ffff"}}
                    icon={<FiMenu />}  
                    onClick={()=>{
                    if (navSize == "small") changeNavSize("large")
                    else changeNavSize("small")
                    }}
                />
                    <NavItem  navSize={navSize} icon={FiHome} title="Inicio" active/>
                    <NavItem navSize={navSize} icon={FiBell} title="Notificaciones"/>
                    <Flex
                        onClick={onOpen} 
                        mt={30}
                        flexDir="column"
                        w="100%"
                        aling-items={navSize == "small" ? "center" : "flex-start"}
                    >
                        <Menu placement='right'>
                            <Link 
                                backgroundColor={/*active &&*/ "none"}
                                p={3}
                                borderRadius={8}
                                _hover={{textDecor:"none", background:"#ffff"}}
                                w={navSize == "large" && "100%"}
                            >
                                <MenuButton w="100%">
                                    <Flex>
                                        <Icon as={FiFilter} fontSize="xl" color={/*active ? "#98D035" :*/ "gray.500"}/>
                                        <Text ml={5} color={/*active ? "#98D035" : */"gray.500"} display={navSize == "small" ? "none" : "flex"}>Filtrar</Text>
                                    </Flex>
                                </MenuButton>
                            </Link>
                        </Menu>
            
                    </Flex>
                    <NavItem navSize={navSize} icon={FiClipboard} title="Turnos"/>
                </Flex>
                    
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Filtro</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={3}>
                                <Select variant='filled' placeholder='Tipo' size='md' onChange={e => handleFilterType(e)}>
                                <option value='covered'>Techada</option>
                                <option value='uncovered'>Sin Techo</option>
                                </Select>
                                <Select variant='filled' placeholder='Price' size='md' onChange={e => handleOrderPrice(e)}>
                                <option value='1'>Ascendente</option>
                                <option value='-1'>Descendiente</option>
                                </Select>
                                <Select variant='filled' placeholder='Disponibilidad' size='md' onChange={e => handleOrderAvailability(e)}>
                                <option value='true'>Disponible</option>
                                <option value='false'>No disponible</option>
                                </Select>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose} bgColor="#98D035">
                                 Cerrar
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    aling-items={navSize == "small" ? "center" : "flex-start"} 
                    mb={4}
                >
                    <Flex mt={4} align-items="center">
                        <Avatar size="sm"/>
                        <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                            <Heading as="h3" size="sm"  color="gray.500">Mati Ferrari</Heading>
                            <Text color="gray">Admin</Text>
                        </Flex>
                    </Flex>
                </Flex>
        </Flex>
    )
}
