import { ThemeProvider, CssBaseline } from '@mui/material'
import { LightTheme } from './theme/theme'
import Header from './components/Header/Header'
import Router from './pages/Router'
import './App.css'
import UserContextProvider from './contexts/userContext'

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <UserContextProvider>
        <CssBaseline>
          <Header/>
          <Router/>
        </CssBaseline>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
