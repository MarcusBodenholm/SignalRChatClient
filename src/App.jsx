import { ThemeProvider, CssBaseline, Container } from '@mui/material'
import { LightTheme } from './theme/theme'
import Router from './pages/Router'
import './App.css'
import UserContextProvider from './contexts/userContext'

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <UserContextProvider>
        <ChatContextProvider>
          <CssBaseline>
            <Container>
              <Router/>
            </Container>
          </CssBaseline>
        </ChatContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
import ChatContextProvider from './contexts/chatContext'

export default App
