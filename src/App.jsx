import Home from './components/Home/Home.jsx'
import DetailPadelField from './components/DetailPadelField/DetailPadelField.jsx'
import { Route, Routes } from 'react-router-dom'
import { Landing } from './components/Landing/Landing'
import Panel from './components/Panel/Panel.jsx'
import Perfil from './components/Perfil/Perfil.jsx'
import About from './components/About/About'
import Success from './components/Success/Success.jsx'
import Admin from './components/Admin/Admin'
import AdminInterfaz from './components/Admin/AdminInterfaz'
import Banner from './components/Admin/Banner'
import CreatePadelfield from './components/CreatePadelfield/CreatePadelfield.jsx'
import BanneReviews from './components/Admin/BanneReviews'
import Reviews from './components/Admin/Reviews.jsx'
import Contact from './components/Contact/Contact.jsx'
import UpdatePadelfield from './components/UpdatePadelfield/UpdatePadelfield.jsx'

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/nosotros' element={<About />} />
      <Route path='/detail/:id' element={<DetailPadelField />} />
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/notification' element={<Home />} />
      <Route exact path='/panel' element={<Panel />} />
      <Route exact path='/perfil' element={<Perfil />} />
      <Route path='/resultadoPago' element={<Success />} />
      <Route exact path='/admin' element={<Admin />} />
      <Route exact path='/adminInterfaz' element={<AdminInterfaz />} />
      <Route exact path='/banneReviews' element={<BanneReviews />} />
      <Route exact path='/deleteReviews/:idField' element={<Reviews />} />
      <Route exact path='/banner' element={<Banner />} />
      <Route exact path='/contact' element={<Contact />} />
      <Route path='/crearCancha' element={<CreatePadelfield />} />
      <Route path='/actualizarCancha' element={<UpdatePadelfield />} />
    </Routes>
  )
}
