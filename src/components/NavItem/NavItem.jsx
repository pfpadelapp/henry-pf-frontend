import { Flex, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid, Menu, Link, MenuButton, Icon} from '@chakra-ui/react'
import React from 'react'

export default function NavItem({navSize, title, icon, active}) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alingItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement='right'>
                <Link 
                    backgroundColor={active && "#ffff"}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecor:"none", background:"#ffff"}}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#98D035" : "gray.500"}/>
                            <Text ml={5} color={active ? "#98D035" : "gray.500"} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>

    )
}