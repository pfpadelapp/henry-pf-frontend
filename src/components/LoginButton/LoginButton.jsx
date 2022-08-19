import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const LoginButton = () => {
  const dispatch = useDispatch()
  const { loginWithPopup, isAuthenticated, user } = useAuth0()
  const [infoUser, setInfoUser] = useState()
  console.log('user', user)
  console.log(isAuthenticated)

  // useEffect(() => {
  //   const userLogged = localStorage.getItem('Usuario logeado')
  //   if (userLogged !== 'undefined') {
  //     console.log('este es userlogged', userLogged)
  //     const user = JSON.parse(userLogged)
  //     setInfoUser(user)
  //     dispatch(getInfoLoginGoogle(user))
  //   } else {
  //     console.log('no funca')
  //   }
  // }, [])

  // function handleLogin(e) {
  //   e.preventDefault()
  //   const userInfo = user
  //   console.log('en el local, dentro del handle', userInfo)
  //   localStorage.setItem(
  //     'Usuario logeado', JSON.stringify(userInfo)
  //   )

  //   // dispatch(getInfoLoginGoogle(userFinal))
  // }
  //console.log('El estado del setuser es : ', infoUser)
  const login = async () => {
    await loginWithPopup()
  }

  return (
    <Button
      fontSize='15px'
      width='97px'
      height='35px'
      textColor="#fff"
      backgroundColor="#98D035"
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
