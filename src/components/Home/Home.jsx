import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOwner } from '../../redux/owner/ownerSliceActions'
import { getUser } from '../../redux/users/userSliceActions'
import { getPadelField } from '../../redux/padelField/padelFieldSliceActions'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOwner())
  }, [])

  useEffect(() => {
    dispatch(getUser())
  }, [])

  useEffect(() => {
    dispatch(getPadelField())
  }, [])

  return (
    <div>
      <p>Owners</p>
    </div>
  )
}
