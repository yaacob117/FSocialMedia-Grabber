'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})

export default function SocialRetriever() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Simula una respuesta de Social-Retriever
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'This is a placeholder response from Social-Retriever.' }
        ])
      }, 1000)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Social-Retriever
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <Container
            component="main"
            maxWidth="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              width: '100%'
            }}
          >
            <Paper
              elevation={3}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px'
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Chat with Social-Retriever
              </Typography>
              {/* Mensajes */}
              <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '16px' }}>
                <List style={{ padding: 0 }}>
                  {messages.map((m, index) => (
                    <ListItem
                      key={index}
                      style={{
                        justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Paper
                        elevation={1}
                        style={{
                          padding: '8px',
                          backgroundColor:
                            m.role === 'user'
                              ? theme.palette.primary.main
                              : '#f5f5f5',
                          color: m.role === 'user' ? 'white' : 'black'
                        }}
                      >
                        <ListItemText primary={m.content} />
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              </div>
              {/* Formulario */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
                <TextField
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inserta los hashtags de los que quiera saber más"
                  variant="outlined"
                  size="small"
                />
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </form>
            </Paper>
          </Container>
        </div>

        {/* Footer */}
        <footer style={{ padding: '24px 16px', backgroundColor: '#f5f5f5' }}>
          <Typography variant="body2" color="textSecondary" align="center">
            Powered by Social-Retriever
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  )
}
