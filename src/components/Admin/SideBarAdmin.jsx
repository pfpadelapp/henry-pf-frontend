import { useState, useEffect } from 'react'
import { FiMenu, FiHome, FiBell } from 'react-icons/fi'
import { GrUserAdmin } from 'react-icons/gr'
import { RiAdminLine, RiChatDeleteLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link as Link2,
  Flex,
  Menu,
  MenuButton,
  useDisclosure,
  Button,
  Icon,
  Avatar,
  Heading,
  Text,
  IconButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import NavItem from '../NavItem/NavItem'
import { useColorMode } from '@chakra-ui/color-mode'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { getDataDetail, getUserById } from '../../redux/users/usersSlice'
import { useAuth0 } from '@auth0/auth0-react'

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [limit, setLimit] = useState([500, 9000])
  const { colorMode, toggleColorMode } = useColorMode()
  const [navSize, changeNavSize] = useState('small')
  const { logout, user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    // dispatch(fetchAllUsers())
    if (isLoading === false) {
      dispatch(getDataDetail(user.email))
    }
  }, [])

  const dataRender = useSelector((state) => state.users.userDetail)

  function handleGetDetailPerfil() {
    dispatch(getUserById())
  }

  return isLoading === true
    ? null
    : isAuthenticated
      ? (
    <Flex
      zIndex='2'
      marginTop='10vh'
      backgroundColor={colorMode === 'dark' ? '#2c313d' : '#F8F8F8'}
      w={navSize == 'small' ? '75px' : '400px'}
      flexDir='column'
      justifyContent='space-between'
      height='90vh'
      position='fixed'>
      <Flex
        p='5%'
        flexDir='column'
        align-items={navSize == 'small' ? 'center' : 'flex-start'}
        as='nav'>
        <IconButton
          background='none'
          mt={5}
          _hover={{ background: colorMode === 'dark' ? '#3d414c' : 'white' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large')
            else changeNavSize('small')
          }}
        />
        <Link to='/home'>
          <NavItem
            navSize={navSize}
            icon={ FiHome }
            title='Inicio'
          />
        </Link>
        <Link to='/admin'>
          {window.location.href.replace('http://127.0.0.1:5173', '') ===
          '/home'
            ? (
            <NavItem
              navSize={navSize}
              icon={GrUserAdmin}
              title='Lista de Administradores'
              link='/'
              active
            />
              )
            : (
            <NavItem
              navSize={navSize}
              icon={GrUserAdmin}
              link='/'
              title='Lista de Administradores'
            />
              )}
        </Link>
        <Link to='/banner'>
          <NavItem
            navSize={navSize}
            icon={RiAdminLine}
            title='Bannear usuarios/propietarios'
          />
        </Link>
        <Link to='/banneReviews'>
          <NavItem
            navSize={navSize}
            icon={RiChatDeleteLine}
            title='Eliminar canchas/reseñas'
          />
        </Link>
        <Flex
          onClick={onOpen}
          mt={30}
          flexDir='column'
          w='100%'
          aling-items={navSize == 'small' ? 'center' : 'flex-start'}></Flex>
      </Flex>
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        align-items={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}>
        <Flex
          mt={4}
          justifyContent={navSize == 'small' ? 'center' : 'flex-start'}>
          <Link to={dataRender?.user_metadata?.rol === 'player' ? '/perfil' : '/panel'}>
            <Flex>
              <Avatar size='sm' src={dataRender?.picture ? dataRender.picture : user.picture } />
              <Flex
                flexDir='column'
                ml={4}
                display={navSize == 'small' ? 'none' : 'flex'}>
                <Heading as='h3' size='sm' color='gray.500'>
                  {dataRender?.name}
                </Heading>
                <Text color='gray'>{dataRender?.user_metadata?.rol === 'player' ? 'Jugador' : dataRender?.user_metadata?.rol === 'owner' ? 'Propietario' : dataRender?.user_metadata?.rol === 'SuperAdmin' ? 'Super Admin' : 'Admin'}</Text>
              </Flex>
            </Flex>
          </Link>
          <Flex
            justifyContent={navSize == 'small' ? 'center' : 'flex-start'}
            marginLeft={navSize == 'small' ? 'center' : '40%'}>
            <Menu>
              <MenuButton
                as={IconButton}
                display={navSize === 'small' ? 'none' : 'flex'}
                aria-label='Options'
                icon={<IoMdArrowDropdown />}
                variant='outline'></MenuButton>
              <MenuList>
                <Link to={dataRender?.user_metadata?.rol === 'player' ? '/perfil' : '/panel'}>
                  <MenuItem onClick={() => handleGetDetailPerfil()}>
                    Mi perfil
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>Desconectarse</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      </Flex>
        )
      : (
          navigate('/')
        )
}
