import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllOwners())
  }, [])

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  useEffect(() => {
    dispatch(fetchAllPadelFields())
  }, [])

  return (
    <div>
      <p>Owners</p>
    </div>
  )
}
