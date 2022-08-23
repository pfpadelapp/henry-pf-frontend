import {
  Link as Link2,
  Flex,
  Text,
  Stack,
  Input,
  Textarea,
  Center,
  Button
} from '@chakra-ui/react'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
import { useColorMode } from '@chakra-ui/color-mode'

export default function Contact() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex>
      <Flex w='100%' h='100%'>
        <form
          spacing={4}
          action='https://formspree.io/f/mnqrnqjb'
          method='POST'>
          <Input
            margin='7px'
            variant='filled'
            placeholder='Nombre:'
            name='name'
          />
          <Input
            margin='7px'
            variant='filled'
            placeholder='Email:'
            name='email'
          />
          <Textarea
            margin='7px'
            variant='filled'
            placeholder='Mensaje:'
            name='message'
          />
          <Button margin='7px' type='submit' value='Enviar'>
            Enviar
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}
