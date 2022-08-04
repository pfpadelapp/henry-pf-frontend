import Home from './components/Home/Home.jsx'
import DetailPadelField from './components/DetailPadelField/DetailPadelField.jsx'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      {/* <Route exact path='/'>
        <Landing/>
      </Route> */}
      <Route path = '/detail/:id' element={<DetailPadelField/>} />
      <Route exact path ='/' element={<Home/>}/>
    </Routes>
  )
}
