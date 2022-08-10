import { Button, HStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPagesPadelField } from '../../redux/padelField/padelFieldSlice.js'

export default function Paginado ({ pageFunction, current }) {
  console.log(pageFunction, ' y ', current)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPagesPadelField())
  }, [])
  const padelFieldAllPages = useSelector((state) => state.padelFields.allPages)
  const countPadelfieldPages = Math.ceil(padelFieldAllPages.count / 6)
  const arrayCountPages = []
  for (let i = 1; i <= countPadelfieldPages; i++) {
    arrayCountPages.push(i)
  }
  // console.log(arrayCountPages)
  const handleClick = (page) => {
    pageFunction(page)
  }
  const handleNextPage = (e, page) => {
    e.preventDefault()
    if (page === arrayCountPages?.length) pageFunction(3)
    else pageFunction(page + 1)
  }
  const handlePrevPage = (e, page) => {
    e.preventDefault()
    if (page === 1) pageFunction(1)
    else pageFunction(page - 1)
  }
  const buttomsCount = arrayCountPages?.map((element, i) => {
    return <Button key={i} id={element} onClick={() => handleClick(element)}>{element}</Button>
  })
  return (
    <>
      <HStack>
        <Button onClick={(e) => handlePrevPage(e, current)}>{'< Prev'}</Button>
        {buttomsCount}
        <Button onClick={(e) => handleNextPage(e, current)}>{'Next >'}</Button>
      </HStack>
    </>
  )
}
