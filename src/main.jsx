import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import App from './App'
import store from './redux/store'
import theme from './resources/theme'
import { Auth0Provider } from '@auth0/auth0-react'
import { ColorModeScript } from '@chakra-ui/react'

const domain = 'dev-7666qcn6.us.auth0.com'
const clientId = '4tc94O0KFonnL5KiozdQhZs28eShoFrU'

// const domain= process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}>
            <App />
          </Auth0Provider>
        </ChakraProvider>
      </Router>
    </Provider>
  </StrictMode>
)
