import { FormControl, Flex, Button, Textarea, Icon, HStack} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth0 } from '@auth0/auth0-react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { postReviewss } from '../../redux/padelField/padelFieldSlice'
import { useParams } from 'react-router-dom'


export default function PostReview() {
  
  const dispatch = useDispatch()  
  const { isAuthenticated, user } = useAuth0()
  
  const { idPadelField } = useParams()

  const [input, setInput] = useState({
    userMail: user.email,
    name: user.name,
    rating: 0,
    review: '',
  })
  const handleClickStarValue = (e) => {
    setInput({...input, rating: parseInt( e.target.value)});
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
      }) :  dispatch(postReviewss(idPadelField, {...input}))
setInput("")
  }

  return isAuthenticated ? (
    <>
      <Flex alignItems='center' justifyContent='center'>
        <FormControl maxWidth="50%" margin='5'  >
                 
        
          <Textarea placeholder='Escribe un comentario' name='review' value={input.review} onChange={(e) => handleChange(e)}></Textarea>
          <HStack color='brand.primary'>
        
                    
        <Button onClick={handleClickStarValue} name='rating' value={1} ><AiFillStar/>
        </Button>
        <Button onClick={handleClickStarValue} name='rating' value={2} ><AiFillStar/>
        </Button>
        <Button onClick={handleClickStarValue}  name='rating' value={3}><AiFillStar/>
        </Button>
        <Button onClick={handleClickStarValue} name='rating' value={4}><AiFillStar/>
        </Button>
        <Button onClick={handleClickStarValue} name='rating' value={5}><AiFillStar/>
        </Button>
       
                     
                    </HStack>
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