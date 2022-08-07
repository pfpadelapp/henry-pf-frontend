import SearchBar from '../Searchbar/SearchBar'
import { Flex, Box, Spacer} from '@chakra-ui/react'
export function NavBar() {
    return (
       <Flex padding="30px 15px" height="45px" align="center" justifyContent="space.between" >
       <Spacer/>
        <Box>
            <SearchBar/>
        </Box>
        </Flex>
    )
}
