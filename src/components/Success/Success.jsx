import { Center, Flex, Image, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPaymentCheckout } from '../../redux/padelField/padelFieldSlice'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import successImage from '../../resources/assets/success.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function Success() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  useEffect(() => {
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    const tokenId = params.get('token')
    const tokenFinal = tokenId.split('&').join()
    // console.log('Este es el token ', tokenFinal)
    dispatch(setPaymentCheckout(tokenFinal))
  }, [])

  return isAuthenticated
    ? (
      <>
        <NavBar />
        <Flex>
          <Sidebar />
          <Center
            width='100%'
            marginTop='10%'
            flexDir='column'
            alignSelf='center'>
            <Image src={successImage} maxW='500px' />
            <Text>La reserva se ha realizado con exito!</Text>
            <Text color='gray.500'>Sera re-dirigido al inicio en { }</Text>
          </Center>
        </Flex>
      </>
    )
    : (
      navigate('/')
    )
}
