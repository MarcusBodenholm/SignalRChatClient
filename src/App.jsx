import { ThemeProvider, CssBaseline, Container } from '@mui/material'
import { LightTheme } from './theme/theme'
import Router from './pages/Router'
import './App.css'
import UserContextProvider from './contexts/userContext'

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <UserContextProvider>
        <CssBaseline>
          <Container>
            <Router/>
          </Container>
        </CssBaseline>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
