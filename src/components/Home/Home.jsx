import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields, fetchAllPadelFieldsFilter } from '../../redux/padelField/padelFieldSlice'
import CardPadel from '../CardPadel/CardPadel.jsx'
import Sidebar from '../Sidebar/Sidebar'
import { Flex, Center, SimpleGrid } from '@chakra-ui/react'
import { NavBar } from '../NavBar/NavBar'
import Paginado from '../Paginado/Paginado.jsx'

export default function Home() {
  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields.padelField)
  // const allPadelFieldFilter = useSelector((state) => state.padelFields.padelField)
  // console.log('aca', allPadelField)
  // console.log('aca', allPadelFieldFilter)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // dispatch(fetchAllOwners())
    // dispatch(fetchAllUsers())
    dispatch(fetchAllPadelFields(currentPage))
    // dispatch(fetchAllPadelFieldsFilter(currentPage))
  }, [currentPage])

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
    <NavBar setCurrentPage ={setCurrentPage}/>
    <Flex>
      <Sidebar current={currentPage}/>
      <Flex width='100%' justifyContent='center' flexDir="column" alignSelf='flex-start'>
        <SimpleGrid margin='12vh 10vw 0vh 10vw' paddingLeft='75px' spacing={20} columns={{ base: 1, lg: 2, xl: 3 }}>
          {/* {
            allPadelFieldFilter.length? allPadelFieldFilter?.map((card) => (
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
             : allPadelField.results?.map((card) => (
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
          } */}
          {
            allPadelField.results?.map((card) => (
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
        <Center margin='4rem 0'>
          <Paginado pageFunction={paginado} current={currentPage}/>
        </Center>
      </Flex>
    </Flex>
    </>
  )
}
