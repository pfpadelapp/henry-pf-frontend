import {
  Flex,
  HStack,
  Button,
  Text,
  useDisclosure,
  Center,
  Box,
  VStack
} from '@chakra-ui/react'
import SideBarAdmin from './SideBarAdmin'
import NavBarAdmin from './NavBarAdmin'
import ModalAdmin from './ModalAdmin'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function Reviews() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { idField } = useParams()
  const [reviews, setReviews] = useState([])
  const { isAuthenticated, isLoading } = useAuth0()

  async function getReviews() {
    const res = await axios.get(`${urlDeploy}/field/${idField}`)
    // console.log('ok', res.data.review)
    setReviews(res.data.review)
  }

  console.log(reviews)

  useEffect(() => {
    getReviews()
  }, [])

  async function handleDelete(reviewId, fieldId, userId) {
    await axios.delete(`${urlDeploy}/reviews/${reviewId}/${fieldId}/${userId}`)
    // console.log('REVIEW BANEADA')
    // alert('review eliminada exitosamente')
    window.location.reload()
  }

  return isLoading === true ? null : isAuthenticated ? (
    <>
      <NavBarAdmin onOpen={onOpen} />
      <Flex>
        <SideBarAdmin />
        <Flex
          margin='12vh 10vw 0vh 10vw'
          width='100%'
          justifyContent='center'
          flexDir='column'
          alignSelf='flex-start'>
          <Center
            gap='3rem'
            bg='gray.700'
            borderRadius='3xl'
            alignItems='flex-start'
            height='calc(200vh - 12vh)'
            margin='2vh 0'>
            <VStack justifyContent='center' w='100%' padding='3%'>
              <HStack spacing='24px'>
                <Center w='225px' h='40px' fontWeight='bold'>
                  Id Reseña
                </Center>
                <Center w='600px' h='40px' fontWeight='bold'>
                  Reseña
                </Center>
                <Center w='120px' h='40px' fontWeight='bold'>
                  Eliminar reseña
                </Center>
              </HStack>
              {reviews &&
                reviews.map((e) => (
                  // eslint-disable-next-line react/jsx-key
                  <HStack w='100%' justifyContent='center'>
                    <Box w='225px'>{e.reviewId}</Box>
                    <Box w='600px'>{e.review}</Box>
                    <Box w='120px' paddingLeft='3%'>
                      <Button
                        bg='#95302f'
                        onClick={() =>
                          handleDelete(e.reviewId, idField, e.idUser)
                        }>
                        Eliminar
                      </Button>
                    </Box>
                  </HStack>
                ))}
            </VStack>
          </Center>
        </Flex>
        <ModalAdmin isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  ) : (
    navigate('/')
  )
}
