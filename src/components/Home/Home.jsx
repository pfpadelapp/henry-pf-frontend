import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOwners } from '../../redux/owner/ownerSlice'
import { fetchAllUsers } from '../../redux/users/usersSlice'
import { fetchAllPadelFields } from '../../redux/padelField/padelFieldSlice'
import SearchBar from "../SearchBar/SearchBar";
import CardPadel from '../CardPadel/CardPadel.jsx'

export default function Home() {

  const dispatch = useDispatch()
  const allPadelField = useSelector((state) => state.padelFields)
  console.table(allPadelField.padelField)
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
      <SearchBar/>
      <div className="filter">
          <select className="filterOption" onChange={e => handleHealthScore(e)}>
              <option value= "1000">1000$-1500$</option>
              <option value= "1500">1500$-2000$</option>
              <option value= "2000">2000$- o mas</option>
          </select>
      </div>
      <div>
        {
          allPadelField.padelField.map((card) => (
          <CardPadel
            key={card.id}
            id={card.id}
            username={card.username}
            name={card.name}
            email={card.email}
            contact={card.contact}
            padelField={card.padelField}
            />
          ))
        }
      </div> 
    </div>
  )
}
