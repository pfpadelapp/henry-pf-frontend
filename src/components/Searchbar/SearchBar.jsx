import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { InputGroup, InputLeftElement, Input, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid, Button, Flex} from '@chakra-ui/react'
import { getInfoByName } from '../../redux/padelField/padelFieldSlice.js'

export default function SearchBar () {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  function handleInput(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getInfoByName(name))
    setName("")
  }
  return (
  <Flex backgroundColor="#F8F8F8" w="20vw" padding="12px" borderRadius="3xl">
    <InputGroup maxWidth="26.5vw" borderColor="transparent" backgroundColor="transparent">
      <Input padding='0 0.5rem' variant='unstyled' backgroundColor="#F8F8F8" type='text' placeholder='Busqueda' value={name} onChange={(e) => handleInput(e)}/>
      <Button _hover={{ color: 'brand.primary' }} _active={{ backgroundColor: '#F8F8F8' }} color='gray.500' bg="none" children={<FiSearch/>} borderRadius="3xl" onClick={(e) => handleSubmit(e)}/>
    </InputGroup>
  </Flex>
  )
}
