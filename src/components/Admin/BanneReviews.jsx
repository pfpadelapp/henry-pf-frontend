import {
  Input,
  Flex,
  HStack,
  Spacer,
  Button,
  Text,
  useDisclosure,
  Center,
  Table,
  InputGroup,
  Image,
  SimpleGrid,
  Box,
  VStack
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SideBarAdmin from './SideBarAdmin'
import NavBarAdmin from './NavBarAdmin'
import { useColorMode } from '@chakra-ui/color-mode'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
// import { getInfoByName } from '../../redux/admin/adminSlice'
import axios from 'axios'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ModalAdmin from './ModalAdmin'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function BanneReviews() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [fieldName, setFieldName] = useState('')
  const [field, setField] = useState([])
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, user } = useAuth0()

  const handleInput = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    setFieldName(e.target.value)
  }
  // console.log(fieldName)

  async function handleSubmit() {
    // const resF = await axios.get(`http://localhost:3000/field/panel/search?name=${fieldName}`)
    const resF = await axios.get(
      `${urlDeploy}/field/panel/search?name=${fieldName}`
    )
    setField(resF.data)
    // setName('')
  }

  async function disableField(id) {
    await axios.delete(`${urlDeploy}/field/${id}`)
    // console.log('CANCHA INHABILITADA')
    // console.log('des', field)
    handleSubmit()
  }

  console.log('now', field)

  async function enableField(id) {
    // await axios.put(`http://localhost:3000/field//enable/${id}`)
    await axios.put(`${urlDeploy}/field/enable/${id}`)
    // console.log('CANCHA INHABILITADA')
    // console.log('hab', field)
    handleSubmit()
  }

  return isLoading === true ? null : isAuthenticated ? (
    <>
      <NavBarAdmin onOpen={onOpen} />
      <Flex>
        <SideBarAdmin />
        <Flex
          margin='12vh 10vw 0vh 10vw'
          width='100%'
          justifyContent='center'
          flexDir='column'
          alignSelf='flex-start'>
          <Center
            gap='3rem'
            bg='gray.700'
            borderRadius='3xl'
            alignItems='flex-start'
            height='calc(100vh - 12vh)'
            margin='2vh 0'>
            <VStack justifyContent='center' width='100%' >
              <Text paddingTop='3%' fontWeight='bold' >LISTA DE CANCHAS</Text>
              <HStack paddingTop='2%' paddingBottom='2%'>
                <InputGroup
                  height='40px'
                  backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
                  borderRadius='10px'>
                  <Input
                    padding='0 0.5rem'
                    variant='unstyled'
                    backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
                    type='text'
                    width='230px'
                    placeholder='Buscar por nombre de cancha'
                    value={fieldName}
                    onChange={(e) => handleInput(e)}
                  />
                  <Button
                    color='gray.500'
                    bg='none'
                    children={<FiSearch />}
                    onClick={() => handleSubmit()}></Button>
                </InputGroup>
              </HStack>
              <SimpleGrid
                justifyItems='center'
                margin='1vh 1vw 0vh 1vw'
                paddingLeft='0px'
                spacing={8}
                columns={{ base: 1, lg: 2, xl: 4 }}>
                {field &&
                  field.map((e) => (
                    // eslint-disable-next-line react/jsx-key
                    <Box>
                      <HStack justifyContent='center'>
                        <Text fontWeight='bold' textTransform='capitalize'>
                          {e.name}
                        </Text>
                      </HStack>
                      <Image
                        zIndex='-10'
                        transition='all 1s'
                        _hover={{
                          filter: 'brightness(0.7)',
                          transition: 'all .5s ease'
                        }}
                        borderRadius='xl'
                        width='200px'
                        height='100px'
                        fallbackSrc='https://via.placeholder.com/150'
                        src={e.image}
                        alt={e.id}
                      />
                      <HStack justifyContent='center' paddingTop='3%'>
                        <Link to={`/deleteReviews/${e.id}`}>
                          <Button
                            width='170px'
                            height='30px'
                            color='white'
                            bg='#98D035'>
                            Ver reviews
                          </Button>
                        </Link>
                      </HStack>
                      <HStack justifyContent='center' paddingTop='3%'>
                        {e.isActive === true
                          ? (
                            <Button
                              bg='#98D035'
                              alignContent='center'
                              alignItems='center'
                              width='170px'
                              height='30px'
                              onClick={() => disableField(e.id)}>
                              Deshabilitar cancha
                            </Button>
                          )
                          : (
                            <Button
                              bg='#95302f'
                              alignContent='center'
                              alignItems='center'
                              width='170px'
                              height='30px'
                              onClick={() => enableField(e.id)}>
                              Habilitar cancha
                            </Button>
                          )}
                      </HStack>
                    </Box>
                  ))}
              </SimpleGrid>
            </VStack>
          </Center>
        </Flex>
        <ModalAdmin isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  ) : (
    navigate('/')
  )
}
