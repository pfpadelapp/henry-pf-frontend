import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function Review() {
  return (
    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={'center'}
        maxW={'3xl'}>
        Un excelente lugar para jugar al padel, con más de 20 años de trayectoria en el bosque Peralta ramos, este es un sitio privilegiado para realizar este deporte. Muy buena la atención y el servicio..
      </Text>
      <Box textAlign={'center'}>
        <Avatar
          src={
            'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
          }
          alt={'Jenny Wilson'}
          mb={2}
        />

        <Text fontWeight={600}>Angelina Jolie</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
          #padel
        </Text>
      </Box>
    </Stack>
  );
}