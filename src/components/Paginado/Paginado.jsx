import { Button, HStack, IconButton } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { MdFirstPage, MdLastPage } from 'react-icons/md'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

export default function Paginado ({ pageFunction, current }) {
  // console.log(pageFunction, ' y ', current)
  const padelFieldAllPages = useSelector((state) => state.padelFields.padelField)
  // console.log('Desde el paginado ', padelFieldAllPages)
  const countPadelfieldPages = Math.ceil(padelFieldAllPages.count / 6)
  const arrayCountPages = []

  for (let i = 1; i <= countPadelfieldPages; i++) {
    arrayCountPages.push(i)
  }
  // console.log(arrayCountPages)
  // console.log(current)
  const handleClick = (page) => {
    pageFunction(page)
  }
  const handleNextPage = (page) => {
    if (page === arrayCountPages?.length) pageFunction(arrayCountPages?.length)
    else pageFunction(page + 1)
  }
  const handlePrevPage = (page) => {
    if (page === 1) pageFunction(1)
    else pageFunction(page - 1)
  }
  const handleLastPage = () => {
    pageFunction(arrayCountPages?.length)
  }
  const handleFirstPage = () => {
    pageFunction(1)
  }
  const buttomsCount = arrayCountPages?.map((element, i) => {
    return <Button
              bg={current === element ? 'brand.secundary' : 'gray.100'}
              _hover={current === element ? { backgroundColor: '#C3F577' } : { backgroundColor: 'gray.200' }}
              _active={current === element ? { backgroundColor: '#C3F577' } : { backgroundColor: 'gray.200' }}
              key={i} id={element}
              onClick={() => handleClick(element)}
            >
              {element}
            </Button>
  })
  return (
    <>
      <HStack>
        <IconButton onClick={() => handleFirstPage()} icon={<MdFirstPage/>}/>
        <IconButton onClick={() => handlePrevPage(current)} icon={<GrFormPrevious/>}/>
        {buttomsCount}
        <IconButton onClick={() => handleNextPage(current)} icon={<GrFormNext/>}/>
        <IconButton onClick={() => handleLastPage()} icon={<MdLastPage/>}/>
      </HStack>
    </>
  )
}
