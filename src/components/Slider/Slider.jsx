import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/sea-green'
import loginImage from '../../resources/assets/login.svg'
import turnoImage from '../../resources/assets/turno.svg'
import payImage from '../../resources/assets/pay.svg'
import playImage from '../../resources/assets/play.svg'
import { Image, Text, Stack, Flex } from '@chakra-ui/react'

export default function Slider() {
  return (
    <Splide
      options={{
        type: 'loop',
        autoplay: true,
        drag: true,
        interval: 3000,
        speed: 400,
        rewind: true,
        pagination: false,
        width: 800,
        gap: '1rem',
        arrows: false,
        easing: 'ease-in-out'
      }}
      aria-label='My Favorite Images'>
      <SplideSlide>
        <Flex alignItems='center' justifyContent='space-around'>
          <Image
            height={{ sm: '16em', md: '20em', lg: '24em', xl: 'sm' }}
            width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }}
            src={loginImage}
            alt='Login'
          />
          <Stack width='30%'>
            <Text fontSize='xl' fontWeight='bold' color='gray.500'>
              Registrate
            </Text>
            <Text color='gray.500'>
              Crea una cuenta para comenzar a hacer reservas
            </Text>
          </Stack>
        </Flex>
      </SplideSlide>
      <SplideSlide>
        <Flex alignItems='center' justifyContent='space-around'>
          <Image
            height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }}
            width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }}
            src={turnoImage}
            alt='Turno'
          />
          <Stack width='30%'>
            <Text fontSize='xl' fontWeight='bold' color='gray.500'>
              Reserva
            </Text>
            <Text color='gray.500'>
              Selecciona la fecha y hora en la que deseas jugar
            </Text>
          </Stack>
        </Flex>
      </SplideSlide>
      <SplideSlide>
        <Flex alignItems='center' justifyContent='space-around'>
          <Image
            height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }}
            width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }}
            src={payImage}
            alt='Pay'
          />
          <Stack width='30%'>
            <Text fontSize='xl' fontWeight='bold' color='gray.500'>
              Paga
            </Text>
            <Text color='gray.500'>
              Selecciona el medio por el cual queres pagar
            </Text>
          </Stack>
        </Flex>
      </SplideSlide>
      <SplideSlide>
        <Flex alignItems='center' justifyContent='space-around'>
          <Image
            height={{ sm: '', md: '20em', lg: '24em', xl: 'sm' }}
            width={{ sm: '', md: '16em', lg: '24em', xl: 'sm' }}
            src={playImage}
            alt='Play'
          />
          <Stack width='30%'>
            <Text fontSize='xl' fontWeight='bold' color='gray.500'>
              Juga
            </Text>
            <Text color='gray.500'>
              ¡Espera la confirmación de la pagina y listo!
            </Text>
          </Stack>
        </Flex>
      </SplideSlide>
    </Splide>
  )
}
