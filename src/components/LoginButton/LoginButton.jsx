import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

const LoginButton = () => {
  const { loginWithPopup } = useAuth0()

  const login = async () => {
    await loginWithPopup()
  }

  return (
    <Button
      fontSize='15px'
      width='97px'
      height='35px'
      textColor='#fff'
      backgroundColor='#98D035'
      _hover={{ color: '#fff', backgroundColor: '#E3FFB2' }}
      _active={{ color: '#fff', backgroundColor: '#E3FFB2' }}
      onClick={(e) => {
        login()
      }}>
      Ingresar
    </Button>
  )
}

export default LoginButton
