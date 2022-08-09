import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu, FiHome, FiBell, FiFilter, FiClipboard, FiInfo } from "react-icons/fi";
import { Box, Flex, Menu, Link, MenuButton, useDisclosure, Button, Icon, Avatar, ModalCloseButton, ModalFooter, ModalBody, Heading, Text, Modal, IconButton, ModalOverlay, ModalContent, Stack, Select, ModalHeader, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Tooltip } from '@chakra-ui/react'
import NavItem from "../NavItem/NavItem"
import { getFilterPrice, filterByType, orderByPrice, orderByAvailability, fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'

export default function Sidebar({currentPage}) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [navSize, changeNavSize] = useState("large")
    const [limit, setLimit] = useState([500, 9000])
    const onChange = (val) => {
        setLimit(val)
    }

    function handleFilterType(e){
        e.preventDefault();
        if(!e.target.value){
            dispatch(fetchAllPadelFields())
        }else{
            dispatch(filterByType(e.target.value, currentPage))
        }
    }
    
      function handleOrderPrice(e){
        e.preventDefault();
        if(!e.target.value){
            dispatch(fetchAllPadelFields())
        }else{
        dispatch(orderByPrice(e.target.value, currentPage))
        }
    }
      
      function handleOrderAvailability(e){
        e.preventDefault();
        if(!e.target.value){
            dispatch(fetchAllPadelFields())
        }else{
        dispatch(orderByAvailability(e.target.value, currentPage))
        }
    }
    function handleFilterPrice() {
        dispatch(getFilterPrice(limit[0], limit[1], currentPage))
    }
    return(
        <Flex
            zIndex='2'
            marginTop='10vh'
            backgroundColor="#F8F8F8"
            borderRadius={navSize =="small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "400px"}
            flexDir="column"
            justifyContent="space-between"
            height='90vh'
            position='fixed'
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
                    <NavItem navSize={navSize} icon={FiHome} title="Inicio" active/>
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
                                    <Flex justifyContent={navSize == "small" ? "center" : "flex-start"}>
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
                        <ModalHeader>Filtros</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={5}>
                                <Select variant='filled' placeholder='Ordenar por' size='md' onChange={e => handleFilterType(e)}>
                                <option value='covered'>Techada</option>
                                <option value='uncovered'>Sin Techo</option>
                                </Select>
                                <Select variant='filled' placeholder='Ordenar precio' size='md' onChange={e => handleOrderPrice(e)}>
                                <option value='1'>Ascendente</option>
                                <option value='-1'>Descendiente</option>
                                </Select>
                                <Select variant='filled' placeholder='Filtrar por disponibilidad' size='md' onChange={e => handleOrderAvailability(e)}>
                                <option value='true'>Disponible</option>
                                <option value='false'>No disponible</option>
                                </Select>
                                <Text>Precio</Text>
                                <RangeSlider onChange={onChange} defaultValue={[500, 9000]} min={0} max={10000} step={500}>
                                    <RangeSliderTrack bg='#E3FFB2'>
                                        <RangeSliderFilledTrack bg='#98D035' />
                                    </RangeSliderTrack>
                                    <Tooltip
                                        label={`$${limit[0]}`}
                                        bg="white"
                                        borderRadius='full'
                                        color="gray.500"
                                        placement="bottom"
                                        pl={3}
                                        pr={3}
                                        isOpen
                                    >
                                        <RangeSliderThumb boxSize={6} index={0} onChange={(e) => handleFilterPrice(e)}/>
                                    </Tooltip>
                                    <Tooltip
                                        onChange={(e) => handleFilterPrice(e)}
                                        label={`$${limit[1]}`}
                                        bg="white"
                                        borderRadius='full'
                                        color="gray.500"
                                        placement="bottom"
                                        pl={3}
                                        pr={3}
                                        isOpen
                                    >
                                        <RangeSliderThumb boxSize={6} index={1} />
                                    </Tooltip>
                                </RangeSlider>
                                <Button textColor="#ffff" backgroundColor="#98D035" _hover={{ color: '#98D035', backgroundColor: '#E3FFB2' }} onClick={() => handleFilterPrice()}>Buscar</Button>
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
