import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPadelFieldsById, cleanDetailPadelField } from '../../redux/padelField/padelFieldSlice'
import { Flex, Image, Box, Divider, Text, Badge, HStack, Icon } from '@chakra-ui/react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const padelField = useSelector((state) => state.padelFields.detailPadelField)
  useEffect(() => {
    dispatch(getPadelFieldsById(id))
    return () => {
      dispatch(cleanDetailPadelField())
    }
  }, [id, dispatch])
  // console.log('componente detail ', padelField)
  return (
    <Flex>
      <Sidebar/>
      <Box width='max' margin='6vh' p='4' display={{ md: 'flex' }} align-items='top' maxH='xl'>
        <Image
          borderRadius='xl'
          width='35rem'
          height='30rem'
          src={padelField.image}
          fallbackSrc='https://via.placeholder.com/150'
          objectFit='cover'
          margin='2rem 2rem'
        />
        <Flex flexDirection='column' margin='2rem 2rem' height='30rem' p='5rem 0'>
          <Text fontWeight='bold' fontSize='4xl' textTransform='capitalize' m='1rem 0'>
            {padelField.name}
          </Text>
          <Box as='span' color='gray.500' fontSize='lg' fontWeight='medium' textTransform='capitalize' m='1rem 0'>
            <Badge verticalAlign='center' color='gray.500' p='0' marginRight='5px'>
              <Icon as={FaMapMarkerAlt}/>
            </Badge>
            {padelField.location}
          </Box>
          <HStack m='1rem 0'>
            <Text color='brand.primary' fontWeight='bolder' fontSize='lg'>
              ${padelField.price}
            </Text>
            <Badge backgroundColor='brand.backgroundBox' textAlign='center' borderRadius='lg'>
              <Text color='brand.textSecundary' p='0 10px' fontWeight='medium'>1 hora</Text>
            </Badge>
          </HStack>
          <Text color='gray.500' fontWeight='medium' fontSize='lg' m='1rem 0'>
            Tipo: {padelField.type}
          </Text>
          <Text color='gray.500' fontWeight='medium' fontSize='lg' m='1rem 0'>
            Puntaje:
          </Text>
        </Flex>
        <Divider orientation='horizontal'/>
      </Box>
    </Flex>
  )
}