import { Flex, HStack, Spacer, Button, Text } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'

export default function NavBarAdmin({ onOpen }) {
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
      <HStack as='nav' spacing='5'>
        <Text>DASHBOARD ADMIN</Text>
      </HStack>
      <Spacer />
      <HStack as='nav' spacing='5'>
        <ToggleColorMode />
        <Button
          fontSize='15px'
          onClick={onOpen}
          backgroundColor={colorMode === 'dark' ? '#98D035' : '#98D035'}>
          + Crear Admin
        </Button>
      </HStack>
    </Flex>
  )
}
