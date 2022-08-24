import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { InputGroup, Input, Button, Flex } from '@chakra-ui/react'
import { getInfoByName } from '../../redux/padelField/padelFieldSlice.js'
import { useColorMode } from '@chakra-ui/color-mode'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const { colorMode } = useColorMode()
  function handleInput(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getInfoByName(name))
    navigate('/home')
    setName('')
  }
  return (
    <Flex
      backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
      w='20vw'
      padding='7px'
      margin='10px'
      borderRadius='3xl'>
      <InputGroup
        maxWidth='26.5vw'
        borderColor='transparent'
        backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}>
        <Input
          padding='0 0.5rem'
          variant='unstyled'
          backgroundColor={colorMode === 'dark' ? '#3d414c' : 'white'}
          type='text'
          placeholder='Busqueda'
          value={name}
          onChange={(e) => handleInput(e)}
        />
        <Button
          _hover={{ color: 'brand.primary' }}
          _active={{ backgroundColor: 'white' }}
          color='gray.500'
          bg='none'
          children={<FiSearch />}
          borderRadius='3xl'
          onClick={(e) => handleSubmit(e)}
        />
      </InputGroup>
    </Flex>
  )
}
