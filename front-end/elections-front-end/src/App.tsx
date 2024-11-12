
import './App.css'
import VotePage from './pages/VotePage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/logIn/LogIn'
import RegisterPage from './pages/registerPage/registerPage'

function App() {
 

  return (
    <>
    <Routes> 
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} /> 
      <Route path="/" element={<LoginPage />} />
      {/* <PrivateRoute path="/votePage" element={<VotePage />} /> */}
      <Route path = "/votePage" element={<VotePage/>}/>
    </Routes>
    </>
  )
}

export default App