import { Link } from 'react-router-dom'
import { Box, Text, Image, Badge } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function CardPadel({ id, location, image, owner }) {
  return (
    <Box maxW='sm' maxH='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' border='none'>
      <Link to={`detail/${id}`}>
        <Image borderRadius='xl' width='sm' height='300px' fallbackSrc='https://via.placeholder.com/150' src={image} alt={id}/>
        <Box mt='3'>
          <Text fontWeight='bold' fontSize='2xl'>
            { owner[0].toUpperCase() + owner.slice(1) }
          </Text>
        </Box>
        <Box as='span' color='gray.400' fontSize='md' fontWeight='medium'>
          <Badge verticalAlign='center' color='gray.400' padding='0' marginRight='3px'>
            <FaMapMarkerAlt/>
          </Badge>
          {location[0].toUpperCase() + location.slice(1)}
        </Box>
      </Link>
    </Box>
  )
}
