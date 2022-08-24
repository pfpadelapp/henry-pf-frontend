import { Link } from 'react-router-dom'
import { Box, Text, Image, Badge, HStack, filter } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function CardPadel({ id, location, image, name, price }) {
  return (
    <Box
      margin='0 10px'
      width='20em'
      height='380'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      border='none'>
      <Link to={`/detail/${id}`}>
        <Image
          zIndex='-10'
          transition='all 1s'
          _hover={{ filter: 'brightness(0.7)', transition: 'all .5s ease' }}
          borderRadius='xl'
          width='sm'
          objectFit='cover'
          height='300px'
          fallbackSrc='https://via.placeholder.com/150'
          src={image}
          alt={id}
        />
        <HStack justifyContent='space-between' maxH='7rem'>
          <Box>
            <Text
              width='220px'
              fontWeight='bold'
              fontSize='2xl'
              textTransform='capitalize'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'>
              {name}
            </Text>
            <HStack
              as='span'
              color='gray.500'
              fontSize='md'
              fontWeight='medium'>
              <FaMapMarkerAlt />
              <Text textTransform='capitalize'>{location}</Text>
            </HStack>
          </Box>
          <Text color='brand.primary' fontWeight='bolder' fontSize='lg'>
            ${price}
          </Text>
        </HStack>
      </Link>
    </Box>
  )
}
