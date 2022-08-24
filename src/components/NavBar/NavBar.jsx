import SearchBar from '../Searchbar/SearchBar'
import { Flex, Box, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/color-mode'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'

export function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      zIndex='1'
      width='100%'
      position='fixed'
      top='0'
      height='10%'
      padding='10px 100px'
      justifyContent='space-between'
      backgroundColor={colorMode === 'dark' ? '#2c313d' : '#F8F8F8'}
      alignItems='center'
      borderBottomColor='none'
      borderBottomStyle='solid'
      borderBottomWidth='0px'>
      <Link to={'/home'}>
        <Text fontWeight='bold' fontSize='2xl'>
          PadelApp
        </Text>
      </Link>
      <Flex
        padding='30px 15px'
        height='45px'
        align='center'
        justifyContent='space.between'>
        <Spacer />

        <Box>
          <SearchBar />
        </Box>
        <ToggleColorMode />
      </Flex>
    </Flex>
  )
}
