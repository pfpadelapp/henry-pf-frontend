import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import App from './App'
import store from './redux/store'
import { theme } from './resources/theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={ theme }>
          <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </StrictMode>
)
