import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers, postUser } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Spinner, Text, SimpleGrid } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
// import Paginado from '../Paginado/Paginado.jsx'
import Footer from '../Footer/Footer'
import ScrollToTop from 'react-scroll-to-top'
import { IoIosArrowUp } from 'react-icons/io'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields.padelField)
  const allUsers = useSelector((state) => state.users.users)
  const [currentPage, setCurrentPage] = useState(1)
  // const [superA, setSuperA] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth0()

  if (isLoading === false) {
    const find = allUsers.filter((e) => {
      return e.email === user.email
    })
    console.log('success', find)
    var find2 = find[0]?.user_metadata.isActive

    const navigate = useNavigate()

    // console.log(allPadelField)
    useEffect(() => {
      // dispatch(fetchAllOwners())
      // dispatch(fetchAllUsers())

      dispatch(fetchAllPadelFields())
      dispatch(fetchAllUsers())
    }, [])

    //console.log(user.sub.slice(0,6))
    // const paginado = (pageNumber) => {
    //   setCurrentPage(pageNumber)
    // }

    return isLoading === true ? null : isAuthenticated ? (
      find2 === true ? (
        <>
          <NavBar setCurrentPage={setCurrentPage} />
          <Flex>
            <Sidebar current={currentPage} />
            <Flex
              width='100%'
              justifyContent='center'
              flexDir='column'
              alignSelf='flex-start'>
              <SimpleGrid
                justifyItems='center'
                margin='12vh 10vw 0vh 10vw'
                paddingLeft='75px'
                spacing={20}
                columns={{ base: 1, lg: 2, xl: 3 }}>
                {!allPadelField.length ? (
                  <Spinner size='xl' />
                ) : (
                  allPadelField?.map((card) => (
                    <CardPadel
                      key={card.id}
                      id={card.id}
                      location={card.location}
                      image={card.image}
                      name={card.name}
                      type={card.type}
                      price={card.price}
                    />
                  ))
                )}
              </SimpleGrid>
              {/* <Center margin='4rem 0'>
            <Paginado pageFunction={paginado} current={currentPage}/>
          </Center> */}
            </Flex>
          </Flex>
          <ScrollToTop
            smooth
            top='1400'
            component={<IoIosArrowUp />}
            style={{
              background: '#2C313D',
              paddingLeft: '11px',
              color: '#98D035',
              borderRadius: '6rem',
              justifyContent: 'center'
            }}
          />{' '}
          {/*  2200 */}
          <Footer />
        </>
      ) : (
        navigate('/')
      )
    ) : (
      navigate('/')
    )
  }
}
