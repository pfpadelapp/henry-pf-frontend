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
    <Flex backgroundColor="#F8F8F8" w="20vw" padding="12px" borderRadius="50px">
      <InputGroup maxWidth="26.5vw" borderColor="transparent" backgroundColor="transparent">
        <Input variant='unstyled' backgroundColor="#F8F8F8" type='text' placeholder='Search' value={name} onChange={(e) => handleInput(e)}/>
        <Button bg="none" children={<FiSearch color='gray.300'/>} borderRadius="70px" onClick={(e) => handleSubmit(e)}/>
      </InputGroup>
    </Flex>
    )

}
