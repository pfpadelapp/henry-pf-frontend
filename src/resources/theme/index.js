import { extendTheme } from '@chakra-ui/react'

const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: {
      primary: '#98D035',
      secundary: '#E3FFB2',
      text: '#18191F',
      background: '#D9D9D9',
      iconsColor: '#B8B8D2',
      paginationBtn: '#F2F2F2',
      backgroundBox: '#FFEBF0',
      textSecundary: '#9E45BD'
    }
  }
}

export default extendTheme(theme)
