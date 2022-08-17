import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  HStack,
  Spacer,
  Button,
  Text,
  Image,
  Center,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Stack,
  Select,
  Divider
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  setTimeout(onOpen, 500)

  return (
    <>
      <Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textColor='gray.00'>
              Bienvenido al panel de Administrador
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text fontWeight='bold' mb='1rem'>
                Favor ingrese sus credenciales autorizados{' '}
              </Text>
              <FormControl>
                <FormLabel textColor='gray.600'>Email</FormLabel>
                <Input placeholder='Email' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel textColor='gray.600'>Contraseña</FormLabel>
                <Input type='password' placeholder='contraseña' />
              </FormControl>
              <ModalFooter marginTop='20px'>
                <Link to='/adminInterfaz'>
                  <Button bgColor='#98D035' textColor='#ffff' mr={3}>
                    Ingresar
                  </Button>
                </Link>
              </ModalFooter>
              <Divider margin='20px' />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  )
}
