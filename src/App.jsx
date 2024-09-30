import { ThemeProvider, CssBaseline } from '@mui/material'
import { LightTheme } from './theme/theme'
import './App.css'
import UserContextProvider from './contexts/userContext'

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <UserContextProvider>
        <CssBaseline>

        </CssBaseline>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
