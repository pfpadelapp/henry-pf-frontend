import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPadelFields} from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Center, SimpleGrid } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
//import Paginado from '../Paginado/Paginado.jsx'
import Footer from '../Footer/Footer'
import ScrollToTop from 'react-scroll-to-top'
import { IoIosArrowUp } from 'react-icons/io'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields.padelField)
  useEffect(() => {
    dispatch(fetchAllPadelFields())
  }, [dispatch])
  // const paginado = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  // }

  return (
    <>
    <NavBar/>
    <Flex>
      <Sidebar/>
      <Flex width='100%' justifyContent='center' flexDir="column" alignSelf='flex-start'>
        <SimpleGrid margin='12vh 10vw 0vh 10vw' paddingLeft='75px' spacing={20} columns={{ base: 1, lg: 2, xl: 3 }}>
          {
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
          }
        </SimpleGrid>
        {/* <Center margin='4rem 0'>
          <Paginado pageFunction={paginado} current={currentPage}/>
        </Center> */}
      </Flex>
    </Flex>
    <ScrollToTop smooth top='1400' component={<IoIosArrowUp/>} style={{ background: '#2C313D', paddingLeft: '11px', color: '#98D035', borderRadius: '6rem', justifyContent: 'center' }}/> {/*  2200 */}
    <Footer/>
    </>
  )
}
