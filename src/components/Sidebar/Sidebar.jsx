import { useEffect, useState } from 'react'
import { FiMenu, FiHome, FiBell, FiFilter, FiClipboard, FiInfo } from "react-icons/fi";
import { Flex , Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid} from '@chakra-ui/react'
import NavItem from "../NavItem/NavItem"

export default function Sidebar() {

    const [navSize, changeNavSize] = useState("large")

    return(
        <Flex 
            margin="5"
            pos="sticky" 
            h="95vh" 
            backgroundColor="#F8F8F8"
            // marginTop="2.5vh" 
            borderRadius={navSize =="small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "400px"}
            flexDir="column" 
            justifyContent="space-between"
            height='100vh'
            margin='0'
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
                    <NavItem navSize={navSize} icon={FiFilter} title="Filtrar"/>
                    <NavItem navSize={navSize} icon={FiClipboard} title="Turnos"/>
                    <NavItem navSize={navSize} icon={FiInfo} title="Contacto"/>
                    <NavItem navSize={navSize} icon={FiHome} title="Acerca de nosotros"/>
                </Flex>
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
<<<<<<< HEAD
                    aling-items={navSize == "small" ? "center" : "flex-start"} 
=======
                    aling-Items={navSize == "small" ? "center" : "flex-start"} 
>>>>>>> 7d7e184ba4ac12f85d92c3844b46367350261429
                    mb={4}
                >
                    <Flex mt={4} align="center">
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