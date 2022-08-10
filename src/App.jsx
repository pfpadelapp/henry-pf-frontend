import Home from './components/Home/Home.jsx'
import DetailPadelField from './components/DetailPadelField/DetailPadelField.jsx'
import { Route, Routes } from 'react-router-dom'
import { Landing } from './components/Landing/Landing'

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path = '/detail/:id' element={<DetailPadelField/>} />
      <Route exact path ='/home' element={<Home/>}/>
    </Routes>
  )
}
