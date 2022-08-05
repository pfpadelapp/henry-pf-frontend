import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { InputGroup, InputLeftElement, Input, Avatar, Heading, Text, Divider, IconButton, Center, SimpleGrid, Button} from '@chakra-ui/react'
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
    <InputGroup maxWidth="22.5vw">
      <InputLeftElement
      pointerEvents='none'
      children={<FiSearch color='gray.300'/>}
      />
      <Input backgroundColor="white" type='text' placeholder='Search' value={name} onChange={(e) => handleInput(e)}/>
      <Button onClick={(e) => handleSubmit(e)}>
          Search
      </Button>
    </InputGroup>
  )
}
