import {FormControl,Flex, Button, Textarea } from '@chakra-ui/react'
  import { Link } from 'react-router-dom'
  import { useDispatch } from 'react-redux'
  import { useState } from 'react'
  import Swal from 'sweetalert2'
  
  export default function PostReview() {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
   // setTimeout(onOpen, 500)

   const [input, setInput] = useState({
    idUser: '',
    username: '',
    rating: '',
    review: '',
  })

  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
 
  }


  function handleSubmit(e) {
    e.preventDefault()
    !input.rating ? 
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar una puntuacion',
        confirmButtonColor: '#F27474'
      }) : null
    

      dispatch(createPadelField(input))
 
      setInput({
        idUser: '',
        username: '',
        rating: '',
        review: '',
      })
     
    }
  
  
    return (
      <>
        <Flex alignItems='center'  justifyContent='center'>
                <FormControl maxWidth="50%" margin='5' >
           
             <Textarea placeholder='Escribe un comentario' name='review' value={input.review} onChange={(e) => handleChange(e)}></Textarea>
                </FormControl>
               
                  <Link to='/'>
                    <Button bgColor='#98D035' textColor='#ffff' mr={3}  onClick={(e) => handleSubmit(e)}>
                      Enviar
                    </Button>
                  </Link>
        </Flex>
      </>
    )
  }