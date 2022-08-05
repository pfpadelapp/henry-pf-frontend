import SearchBar from '../Searchbar/SearchBar'
import { Flex, Box, Spacer} from '@chakra-ui/react'
export function NavBar() {
    return (
       <Flex padding="30px 15px" height="45px" align="center" justifyContent="space.between" bgGradient='linear(to-l, #051937, #004d7a, #008793, #00bf72, #a8eb12)'>
       <Box fontSize="25px">
            LOGO
       </Box>
       <Spacer/>
        <Box>
            <SearchBar/>
        </Box>
        </Flex>
    )
}
