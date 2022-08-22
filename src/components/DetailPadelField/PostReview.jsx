import { FormControl, Flex, Button, Textarea, Icon, HStack,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,Tooltip,RangeSliderThumb} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth0 } from '@auth0/auth0-react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'



export default function PostReview() {

  //const dispatch = useDispatch()
  
  
  const { isAuthenticated, user } = useAuth0()
 

  const [input, setInput] = useState({
    idUser: user.id,
    name: user.name,
    rating: 0,
    review: '',
  })
  const handleClickStarValue = (e) => {
    setInput({...input, rating: e.target.value});
    console.log(e.target.value)
  };

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


  

  }


  return isAuthenticated ? (
    <>
      <Flex alignItems='center' justifyContent='center'>
        <FormControl maxWidth="50%" margin='5' >
                      <HStack color='brand.primary'>
        
                    
          <Button onClick={handleClickStarValue} value={1} ><AiFillStar/>
          </Button>
          <Button onClick={handleClickStarValue} value={2} ><AiFillStar/>
          </Button>
          <Button onClick={handleClickStarValue} value={3}><AiFillStar/>
          </Button>
          <Button onClick={handleClickStarValue} value={4}><AiFillStar/>
          </Button>
          <Button onClick={handleClickStarValue} value={5}><AiFillStar/>
          </Button>
         
                       
                      </HStack>
          <Textarea placeholder='Escribe un comentario' name='review' value={input.review} onChange={(e) => handleChange(e)}></Textarea>
        </FormControl>

        <Link to='/'>
          <Button bgColor='#98D035' textColor='#ffff' mr={3} onClick={(e) => handleSubmit(e)}>
            Enviar
          </Button>
        </Link>
      </Flex>
    </>
    ) : null
}