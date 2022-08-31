import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, createGoogleUser } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Spinner, SimpleGrid, Center } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ScrollToTop from 'react-scroll-to-top'
import { IoIosArrowUp } from 'react-icons/io'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields.padelField)
  const allUsers = useSelector((state) => state.users.users)
  const [currentPage, setCurrentPage] = useState(1)
  const { isAuthenticated, isLoading, user } = useAuth0()

  if (isLoading === false) {
    const find = allUsers?.filter((e) => {
      return e.email === user.email
    })
    const find2 = find[0]?.user_metadata.isActive
    const navigate = useNavigate()
    useEffect(() => {
      // dispatch(fetchAllOwners())
      if (isLoading === false && user.email_verified === true) {
        dispatch(createGoogleUser(user))
      }

      dispatch(fetchAllPadelFields())
      dispatch(fetchAllUsers())
    }, [])

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
              {!allPadelField.length
                ? (
                  <Center height='50vh'>
                    <Spinner size='xl' />
                  </Center>
                )
                : (
                  <SimpleGrid
                    justifyItems='center'
                    margin='12vh 10vw 0vh 10vw'
                    paddingLeft='75px'
                    spacing={20}
                    columns={{ base: 1, lg: 2, xl: 3 }}>
                    {allPadelField?.map((card) => (
                      <CardPadel
                        key={card.id}
                        id={card.id}
                        location={card.location}
                        image={card.image}
                        name={card.name}
                        type={card.type}
                        price={card.price}
                      />
                    ))}
                  </SimpleGrid>
                )}
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
      ) : user.email_verified ? (
        <>
          <NavBar setCurrentPage={setCurrentPage} />
          <Flex>
            <Sidebar current={currentPage} />
            <Flex
              width='100%'
              justifyContent='center'
              flexDir='column'
              alignSelf='flex-start'>
              {!allPadelField.length
                ? (
                  <Center height='50vh'>
                    <Spinner size='xl' />
                  </Center>
                )
                : (
                  <SimpleGrid
                    justifyItems='center'
                    margin='12vh 10vw 0vh 10vw'
                    paddingLeft='75px'
                    spacing={20}
                    columns={{ base: 1, lg: 2, xl: 3 }}>
                    {allPadelField?.map((card) => (
                      <CardPadel
                        key={card.id}
                        id={card.id}
                        location={card.location}
                        image={card.image}
                        name={card.name}
                        type={card.type}
                        price={card.price}
                      />
                    ))}
                  </SimpleGrid>
                )}
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
