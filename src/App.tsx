import { Box } from '@mui/material'
import { GigExecution } from './components/GigExecution/GigExecution'
import { SidePanel } from './components/SidePanel/SidePanel'

function App() {
  return (
    <Box style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <SidePanel />
      <GigExecution />
    </Box>
  )
}

export default App
