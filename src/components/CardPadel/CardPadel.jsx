import { Link } from 'react-router-dom'
import { Box, Text, Image, Badge, HStack } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function CardPadel({ id, location, image, name }) {
  return (
    <Box
      width='sm'
      height='400'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      border='none'>
      <Link to={`/detail/${id}`}>
        <Image borderRadius='xl' width='sm' height='320px' fallbackSrc='https://via.placeholder.com/150' src={image} alt={id}/>
        <Box mt='3'>
          <Text fontWeight='bold' fontSize='2xl'>
            {name[0].toUpperCase() + name.slice(1)}
          </Text>
        </Box>
        <HStack as='span' color='gray.500' fontSize='md' fontWeight='medium'>
        <FaMapMarkerAlt/>
        <Text>
          {location[0].toUpperCase() + location.slice(1)}
        </Text>
        </HStack>
      </Link>
    </Box>
  )
}
