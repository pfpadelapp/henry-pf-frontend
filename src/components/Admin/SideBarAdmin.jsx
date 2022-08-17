// import { useEffect, useState } from 'react'
// import { FiMenu, FiHome, FiBell, FiFilter, FiClipboard, FiInfo } from "react-icons/fi";
// import { Link as Link2, Flex, Menu, MenuButton, useDisclosure, Button, Icon, Avatar, ModalCloseButton, ModalFooter, ModalBody, Heading, Text, Modal, IconButton, ModalOverlay, ModalContent, Stack, Select, ModalHeader, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Tooltip, MenuList, MenuItem } from '@chakra-ui/react'
// import NavItem from "../NavItem/NavItem"
// import { useColorMode } from "@chakra-ui/color-mode"
// import { IoMdArrowDropdown } from 'react-icons/io'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Sidebar() {
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const [limit, setLimit] = useState([500, 9000])

//   return (
//       <Flex
//         zIndex='2'
//         marginTop='10vh'
//         backgroundColor={colorMode === "dark" ? "#2c313d" : "#F8F8F8"}
//         w={navSize == "small" ? "75px" : "400px"}
//         flexDir="column"
//         justifyContent="space-between"
//         height='90vh'
//         position='fixed'
//       >
//         <Flex
//           p="5%"
//           flexDir="column"
//           align-items={navSize == "small" ? "center" : "flex-start"}
//           as="nav">
//           <IconButton
//             background="none"
//             mt={5}
//             _hover={{ background: (colorMode === "dark" ? "#3d414c" : "white") }}
//             icon={<FiMenu />}
//             onClick={() => {
//               if (navSize == "small") changeNavSize("large")
//               else changeNavSize("small")
//             }}
//           />
//           <Link to='/home'>
//             {window.location.href.replace("http://127.0.0.1:5173", "") === "/home" ? <NavItem navSize={navSize} icon={FiHome} title="Inicio" link="/" active /> : <NavItem navSize={navSize} icon={FiHome} link="/" title="Inicio" />}
//           </Link>
//           <NavItem navSize={navSize} icon={FiBell} title="Notificaciones" />
//           <Flex
//             onClick={onOpen}
//             mt={30}
//             flexDir="column"
//             w="100%"
//             aling-items={navSize == "small" ? "center" : "flex-start"}
//           >
//             <Menu placement='right'>
//               {/* Link to ??? */}
//               <Link2
//                 backgroundColor={/*active &&*/ "none"}
//                 p={3}
//                 borderRadius={8}
//                 _hover={{ textDecor: "none", background: (colorMode === "dark" ? "#3d414c" : "white") }}
//                 w={navSize == "large" && "100%"}
//               >
//                 <MenuButton w="100%">
//                   <Flex justifyContent={navSize == "small" ? "center" : "flex-start"}>
//                     <Icon as={FiFilter} fontSize="xl" color={/*active ? "#98D035" :*/ "gray.500"} />
//                     <Text ml={5} color={/*active ? "#98D035" : */"gray.500"} display={navSize == "small" ? "none" : "flex"}>Filtrar</Text>
//                   </Flex>
//                 </MenuButton>
//               </Link2>
//             </Menu>

//           </Flex>
//           <Link to='/notification'>
//             {window.location.href.replace("http://127.0.0.1:5173", "") === "/notification" ? <NavItem navSize={navSize} icon={FiClipboard} title="Turnos" link="/" active /> : <NavItem navSize={navSize} icon={FiClipboard} link="/" title="Turnos" />}
//           </Link>
//         </Flex>

//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Filtros</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Stack spacing={5}>
//                 <Select variant='filled' placeholder='Ordenar por' size='md' onChange={e => handleFilterType(e)}>
//                   <option value='covered'>Techada</option>
//                   <option value='uncovered'>Sin Techo</option>
//                 </Select>
//                 <Select variant='filled' placeholder='Ordenar precio' size='md'>
//                   <option value='1'>Ascendente</option>
//                   <option value='-1'>Descendiente</option>
//                 </Select>
//                 <Select variant='filled' placeholder='Filtrar por disponibilidad' size='md'>
//                   <option value='true'>Disponible</option>
//                   <option value='false'>No disponible</option>
//                 </Select>
//                 <Text>Precio</Text>
//                 <RangeSlider onChange={onChange} defaultValue={[500, 9000]} min={0} max={10000} step={500}>
//                   <RangeSliderTrack bg='#E3FFB2'>
//                     <RangeSliderFilledTrack bg='#98D035' />
//                   </RangeSliderTrack>
//                   <Tooltip
//                     label={`$${limit[0]}`}
//                     bg="white"
//                     borderRadius='full'
//                     color="gray.500"
//                     placement="bottom"
//                     pl={3}
//                     pr={3}
//                     isOpen
//                   >
//                     <RangeSliderThumb boxSize={6} index={0}/>
//                   </Tooltip>
//                   <Tooltip
//                     label={`$${limit[1]}`}
//                     bg="white"
//                     borderRadius='full'
//                     color="gray.500"
//                     placement="bottom"
//                     pl={3}
//                     pr={3}
//                     isOpen
//                   >
//                     <RangeSliderThumb boxSize={6} index={1} />
//                   </Tooltip>
//                 </RangeSlider>
//                 <Button textColor="#ffff" backgroundColor="#98D035" _hover={{ color: '#98D035', backgroundColor: '#E3FFB2' }} _active={{ color: '#98D035', backgroundColor: '#E3FFB2' }}>Buscar</Button>
//               </Stack>
//             </ModalBody>

//             <ModalFooter>
//               <Button colorScheme='blue' mr={3} onClick={onClose} bgColor="#98D035">
//                 Cerrar
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>

//         <Flex
//           p="5%"
//           flexDir="column"
//           w="100%"
//           align-items={navSize == "small" ? "center" : "flex-start"}
//           mb={4}
//         >
//           <Flex mt={4} justifyContent={navSize == "small" ? "center" : "flex-start"} >
//             <Link to='/perfil'>
//               <Flex>
//                 <Avatar size="sm" src={user ? user.picture : null} />
//                 <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
//                   <Heading as="h3" size="sm" color="gray.500">{user.name}</Heading>
//                   <Text color="gray">Admin</Text>
//                 </Flex>
//               </Flex>
//             </Link>
//             <Flex justifyContent={navSize == "small" ? "center" : "flex-start"}
//               marginLeft={navSize == "small" ? "center" : "40%"}>
//               <Menu>
//                 <MenuButton
//                   as={IconButton}
//                   display={navSize === 'small' ? 'none' : 'flex'}
//                   aria-label='Options'
//                   icon={<IoMdArrowDropdown />}
//                   variant='outline'>
//                 </MenuButton>
//                 <MenuList>
//                   <Link to='/perfil'>
//                     <MenuItem >
//                       Mi perfil
//                     </MenuItem>
//                   </Link>
//                   <MenuItem>Desconectarse</MenuItem>
//                 </MenuList>
//               </Menu>
//             </Flex>
//           </Flex>
//         </Flex>
//       </Flex>
//   )
// }
