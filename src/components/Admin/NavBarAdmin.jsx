import { Flex, HStack, Spacer, Button, Text } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function NavBarAdmin({ onOpen }) {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { logout, user, isAuthenticated, isLoading } = useAuth0()
  // const [superA, setSuperA] = useState(false)
  console.log('El user email es', user)
  const allUsers = useSelector((state) => state.users.users)
  const navigate = useNavigate()

  if (isLoading === false) {
    const find = allUsers.filter((e) => { return e.email === user.email })
    var superA = find[0]?.user_metadata.isSuperAdmin
    var admin = find[0]?.user_metadata.isAdmin
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return isLoading === true ? null : isAuthenticated ? (
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
        <Text fontWeight='bold' fontSize='20px'>DASHBOARD ADMIN</Text>
      </HStack>
      <Spacer />
      <HStack as='nav' spacing='5'>
        <ToggleColorMode />
        {
          superA === true  && (
              <Button
              fontSize='15px'
              onClick={onOpen}
              backgroundColor={colorMode === 'dark' ? '#98D035' : '#98D035'}>
              + Crear Admin
            </Button>
            )
          }
      </HStack>
    </Flex>
  ): (
    navigate('/')
  )
}
