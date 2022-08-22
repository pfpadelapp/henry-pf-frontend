import {
  FormControl, FormLabel, Input, Button, Text,
  useDisclosure, Modal, ModalCloseButton, ModalFooter, ModalBody, ModalOverlay,
  ModalContent, ModalHeader, Divider
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function ModalAdmin({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  })

  // -------- CREATE ADMIN ------------//
  function handleInputChangeAdmin (e) {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    const formInfo = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      username: formData.username
    }
    if (formInfo.name === '' || formInfo.email === '' || formInfo.password === '' || formInfo.username === '') {
      alert('Por favor todos los campos deben ser llenados')
    } else {
      await axios.post(`${urlDeploy}/admin`, formInfo)
        .then((res) => {
          if (res.data.msg) alert(res.data.msg)
          else alert('Un nuevo administrador fue creado')
        })
      window.location.reload()
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      username: ''
    })
  }

  return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor='gray.00'>Crear administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Name</FormLabel>
              <Input required='true' type='Name' name='name' placeholder='Name' value={formData.name} onChange={handleInputChangeAdmin}/>
            </FormControl>
            <FormControl>
              <FormLabel textColor='gray.600'>Email</FormLabel>
              <Input required placeholder='Email' name='email' value={formData.email} onChange={handleInputChangeAdmin} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Contraseña</FormLabel>
              <Input required type='password' name='password' placeholder='Contraseña' value={formData.password} onChange={handleInputChangeAdmin} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel textColor='gray.600'>Username</FormLabel>
              <Input required type='username' name='username' value={formData.username} onChange={handleInputChangeAdmin} placeholder='Username' />
            </FormControl>
            <ModalFooter marginTop='20px'>
              <Button bgColor='#98D035' textColor='#ffff' mr={3} onClick={handleCreateAdmin}>
                Crear
              </Button>
              <Button onClick={onClose} textColor='gray.700'>
                Cancelar
              </Button>
            </ModalFooter>
            <Divider margin='20px' />
          </ModalBody>
        </ModalContent>
       </Modal>
  )
}
