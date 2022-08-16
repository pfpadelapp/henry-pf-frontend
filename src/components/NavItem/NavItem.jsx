import { Flex, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid, Menu, Link, MenuButton, Icon} from '@chakra-ui/react'
import React from 'react'
import { useColorMode } from "@chakra-ui/color-mode"

export default function NavItem({navSize, title, icon, active}) {
    
    const {colorMode, toggleColorMode}= useColorMode();

    return (
        <Link to="/inicio" style={{textDecoration:"none"}}>
            <Flex
                mt={30}
                flexDir="column"
                w="100%"
                aling-items={navSize == "small" ? "center" : "flex-start"}
            >
                <Menu placement='right'>
                    <Link 
                        backgroundColor={active && {colorMode: "dark" ? "#2c313d" : "#F8F8F8"}}
                        p={3}
                        borderRadius={8}
                        _hover={{textDecor:"none", background:(colorMode === "dark" ? "#3d414c" : "white")}}
                        w={navSize == "large" && "100%"}
                    >
                        <MenuButton w="100%" >
                            <Flex justifyContent={navSize == "small" ? "center" : "flex-start"}>
                                <Icon as={icon} fontSize="xl" color={active ? "#98D035" : "gray.500"}/>
                                <Text ml={5} color={active ? "#98D035" : "gray.500"} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                            </Flex>
                        </MenuButton>
                    </Link>
                </Menu>

            </Flex>
        
        </Link>

    )
}
