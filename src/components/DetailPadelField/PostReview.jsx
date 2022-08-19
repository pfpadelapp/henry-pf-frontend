import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Divider
  } from '@chakra-ui/react'
  import { Link } from 'react-router-dom'
  
  export default function PostReview() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    setTimeout(onOpen, 500)
  
    return (
      <>
        <Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textColor='gray.00'>
                tucs
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>  
                <FormControl>
                  <FormLabel textColor='gray.600'></FormLabel>
                  <Input placeholder='Escriba un comentario'  />
                </FormControl>
                <ModalFooter marginTop='20px'>
                  <Link to='/'>
                    <Button bgColor='#98D035' textColor='#ffff' mr={3}>
                      Enviar
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