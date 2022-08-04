import Home from './components/Home/Home.jsx'
import DetailPadelField from './components/DetailPadelField/DetailPadelField.jsx'
import { Route } from 'react-router-dom'

export default function App() {
  return (
    <div className='App'>
      {/* <Route exact path='/'>
        <Landing/>
      </Route> */}
      <Route exact path = '/home'>
        <Home/>
      </Route>
      <Route path = '/detail/:id'>
        <DetailPadelField/>
      </Route>
    </div>
  )
}
