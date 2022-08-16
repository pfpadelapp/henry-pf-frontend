import { Flex, Image, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentCheckout } from '../../redux/padelField/padelFieldSlice'
import { NavBar } from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import successImage from '../../resources/assets/success.svg'

export default function Success() {
  const dispatch = useDispatch()
  const msgStatus = useSelector((state) => state.padelFields.check)
  console.log('afuera del succes', msgStatus.status)
  useEffect(() => {
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    const tokenId = params.get('token')
    const tokenFinal = tokenId.split('&').join()
    console.log('Este es el token ', tokenFinal)
    dispatch(setPaymentCheckout(tokenFinal))
  }, [])

  return (
    <>
      <NavBar />
      <Flex>
        <Sidebar />
        <Flex width='100%' justifyContent='center' flexDir="column" alignSelf='center'>
          {/* {msgStatus.status === 'COMPLETED' ? alert('La reserva se realizo') : alert('La reserva fallo')} */}
          <Image src={successImage} />
          <Text>La reserva se ha realizado con exito!</Text>
        </Flex>
      </Flex>
    </>
  )
}
