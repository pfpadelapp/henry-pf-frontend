import {
  Input, Flex, HStack, Spacer, Button, Text,
  useDisclosure, Center, Table, InputGroup, Image, SimpleGrid, Box, VStack
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

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function BanneReviews() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [fieldName, setFieldName] = useState('')
  const [field, setField] = useState([])


  const handleInput = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setFieldName(e.target.value)
  }
  console.log(fieldName)

  async function handleSubmit() {
    const resF = await axios.get(`${urlDeploy}/field/search?name=${fieldName}`)
    console.log(resF.data)
    setField(resF.data)
    // setName('')
  }
  console.log(field)

  return (
        <>
          <NavBarAdmin onOpen = {onOpen}/>
            <Flex>
              <SideBarAdmin/>
                <Flex
                margin='12vh 10vw 0vh 10vw'
                width='100%'
                justifyContent='center'
                flexDir='column'
                alignSelf='flex-start'>
                  <Center gap='3rem'
                    bg='gray.700'
                    borderRadius='3xl'
                    alignItems='flex-start'
                    height='calc(100vh - 12vh)'
                    margin='2vh 0'>
                      <VStack justifyContent='center' width='100%'>
                        <HStack paddingTop='4%' paddingBottom='2%'>
                            <InputGroup height='40px' backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'} borderRadius='10px' >
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
                                onClick={() => handleSubmit()}
                                >
                            </Button>
                            </InputGroup>
                          </HStack>
                    <SimpleGrid
                      justifyItems='center'
                      margin='1vh 1vw 0vh 1vw'
                      paddingLeft='0px'
                      spacing={8}
                      columns={{ base: 1, lg: 2, xl: 5 }}>
                        {field && field.map(e => (
                          // eslint-disable-next-line react/jsx-key
                          <Box>
                            <HStack justifyContent='center'>
                              <Text
                              fontWeight='bold'
                              textTransform='capitalize'
                              >{e.name}</Text>
                            </HStack>
                          <Image
                              zIndex='-10'
                              transition='all 1s'
                              _hover={{ filter: 'brightness(0.7)', transition: 'all .5s ease' }}
                              borderRadius='xl'
                              width='150px'
                              height='100px'
                              fallbackSrc='https://via.placeholder.com/150'
                              src={e.image}
                              alt={e.id}
                            />
                            <HStack justifyContent='center' paddingTop='3%' >
                              <Link to= {`/deleteReviews/${e.id}`}>
                                  <Button height='30px' color='white' bg='#98D035'>Ver reviews</Button>
                              </Link>
                            </HStack>
                          </Box>
                        ))}
                    </SimpleGrid>
                    </VStack>
            </Center>
          </Flex>
        <ModalAdmin isOpen={isOpen} onClose={onClose}/>
        </Flex>
    </>
  )
}
