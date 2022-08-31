import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  Center,
  IconButton
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { FiAlertTriangle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'

export default function ModalAdmin({ isOpen, onClose }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const [formData, setFormData] = useState({
    email: ''
  })

  // -------- CREATE ADMIN ------------//
  function handleInputChangeAdmin(e) {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    const formInfo = {
      email: formData.email
    }
    if (
      formInfo.email === ''
    ) {
      alert('Por favor ingrese el email que desea hacer administrador')
    } else {
      const resU = await axios.get(`${urlDeploy}/user`)
      const allUsers = resU.data
      const userAd = allUsers?.filter((e) => e.email === formInfo.email)
      if (userAd.length > 0) {
        const idNewUser = userAd[0].id
        const r = await axios.put(`${urlDeploy}/user/${idNewUser}/admin`)
        if (r.data) {
          alert(`El usuario con email ${formInfo.email} ahora es administrador`)
        }
        window.location.reload()
      } else {
        alert('Email no encontrado en BD')
      }
    }
    setFormData({
      email: ''
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader textColor='gray.00'>Crear administrador</ModalHeader>

        <ModalHeader justifyContent='center' fontSize='15px' textColor='gray.00'>
          <IconButton
            background='none'
            mt={0}
            icon={<FiAlertTriangle />}
          />Ingrese el email del usuario que desea hacer administrador</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} >

          <FormControl>
            <FormLabel textColor='gray.600'>Email</FormLabel>
            <Input
              required
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleInputChangeAdmin}
            />
          </FormControl>

          <ModalFooter marginTop='20px'>
            <Button
              bgColor='#98D035'
              textColor='#ffff'
              mr={3}
              onClick={handleCreateAdmin}>
              Hacer Administrador
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
