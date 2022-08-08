import SearchBar from '../Searchbar/SearchBar'
import { Flex, Box, Spacer, Text} from '@chakra-ui/react'
export function NavBar() {
  return (
    <Flex
    padding='10px 100px'
    justifyContent='space-between'
    alignItems='center'
    borderBottomColor="#E3FFB2"
    borderBottomStyle="solid"
    borderBottomWidth="1px">
      <Text fontWeight='bold' fontSize='2xl'>
        PadelApp
      </Text>
      <Flex padding="30px 15px" height="45px" align="center" justifyContent="space.between" >
        <Spacer/>
        <Box>
          <SearchBar/>
        </Box>
      </Flex>
    </Flex>
  )
}
