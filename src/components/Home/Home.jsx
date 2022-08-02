import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOwner } from '../../redux/ownerSliceActions'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOwner())
  }, [])
  return (
    <div>
      <p>Owners</p>
    </div>
  )
}
