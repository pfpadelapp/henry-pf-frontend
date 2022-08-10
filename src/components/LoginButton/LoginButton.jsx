import {useAuth0} from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'


const LoginButton = () => {

    const {loginWithRedirect, isAuthenticated,  user} = useAuth0()
    console.log(user)
    console.log(isAuthenticated)
        return(
            <Button 
            fontSize="15px"
            width="97px"
            height="35px"
            textColor="#98D035"
            backgroundColor="#E3FFB2"
            _hover={{ color: '#E3FFB2', backgroundColor: '#98D035' }} 
            onClick={() => loginWithRedirect()} >Ingresar</Button>
        )
}

export default LoginButton