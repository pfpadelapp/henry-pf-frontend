import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import { getInfoLoginGoogle } from '../../redux/users/usersSlice.js'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const LoginButton = () => {
  const dispatch = useDispatch()
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0()
  const [infoUser, setInfoUser] = useState()
  console.log('user', user)
  console.log(isAuthenticated)
  useEffect(() => {
    const userLogged = localStorage.getItem('Usuario logeado')
    if (!isLoading) {
      if (isAuthenticated === true) {
        console.log('este es userlogged', userLogged)
        const user = JSON.parse(userLogged)
        setInfoUser(user)
        dispatch(getInfoLoginGoogle(user))
      }
    } else {
      console.log('no funca')
    }
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    const userInfo = user
    console.log('en el local, dentro del handle', userInfo)
    localStorage.setItem(
      'Usuario logeado', JSON.stringify(userInfo)
    )

    // dispatch(getInfoLoginGoogle(userFinal))
  }
  console.log('El estado del setuser es : ', infoUser)
  return (
    <Button
      fontSize="15px"
      width="118px"
      height="35px"
      backgroundColor="#98D035"
      _hover={{ color: '#98D035', backgroundColor: '#E3FFB2' }}
      _active={{ color: '#98D035', backgroundColor: '#E3FFB2' }}
      onClick={(e) => { loginWithRedirect(); handleLogin(e) }} >Ingresar</Button>
  )
}

export default LoginButton
