import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers} from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Spinner, Text, SimpleGrid } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ScrollToTop from 'react-scroll-to-top'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function History() {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.users.users)
  const { isAuthenticated, isLoading, user } = useAuth0()
  const dataRender = useSelector((state) => state.users.userDetail)
  console.log("este es el datarender",dataRender)



  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])



  return isLoading === true ? null : isAuthenticated ? (
      <>
      <Sidebar/>
      <NavBar/>

      <Footer/>
      <ScrollToTop/>

        </>
  )
    : (
        navigate('/')
      )
  
}