import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Spinner, Text, Center, Image, Box } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ScrollToTop from 'react-scroll-to-top'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function History() {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, user } = useAuth0()
  const dataRender = useSelector((state) => state.users.userDetail)
  // console.log("este es el datarender",dataRender)



  return isLoading === true ? null : isAuthenticated ? (
    <>
      <Sidebar />
      <NavBar />
      <Flex width='100%'
        justifyContent='center'
        alignSelf='flex-start'>
        {dataRender?.history?.length > 0 ?
          (dataRender?.history?.map((e => {
            return (
              <Flex
                column={1}
                justifyItems='center'
                margin='4rem'
                marginTop="15vh"
              >
                <Box>
                  <Image borderRadius="xl" height="300px" width="300px" objectFit="cover" src={e.newBooking.image} />
                  <Text>Fecha: {e.newBooking.date.slice(0, 10)}</Text>
                  <Text>Hora: {e.newBooking.date.slice(11, 13)}hs</Text>
                  <Text color='brand.primary' fontWeight='bolder' fontSize='lg'>
                    ${e.newBooking.price}
                  </Text>
                </Box>
              </Flex>
            )
          }))) : <Text column={1}
            justifyItems='center'
            margin='4rem'
            marginTop="15vh"> Aun no alquilo ninguna cancha</Text>}
      </Flex>
      <Footer />
      <ScrollToTop />

    </>
  )
    : (
      navigate('/')
    )

}