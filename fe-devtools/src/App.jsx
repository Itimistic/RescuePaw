import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
// import Dashboard from "./pages/Dashboard"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Navbar from "./components/navbar/Navbar"
// import Home from "./pages/Home"
// import Profile from "./pages/Profile"
// import Communities from "./pages/Communities"
// import { AuthProvider } from "./hooks/userAuth"

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<DonationPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
