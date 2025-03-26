import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signin from '../src/Components/Signin'
import { MainPage } from '../src/Pages/mainPage'

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