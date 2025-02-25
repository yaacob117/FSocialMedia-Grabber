import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MainPage } from '../src/Pages/mainPage'
import Signin from '../src/Components/Signin'
import Chatbot from '../src/Components/Chatbot'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<MainPage />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  )
}

export default AppRouter