import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function DetailPadelField() {
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch()
    return () => {
      dispatch()
    }
  }, [id, dispatch])
  const padelField = useSelector((state) => state.padelFields)
  return (
    <div>
    </div>
  )
}
