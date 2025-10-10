import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
import PetListPage from "./pages/PetListPage"
// import Dashboard from "./pages/Dashboard"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Home from "./pages/Home"
// import Profile from "./pages/Profile"
// import Communities from "./pages/Communities"
// import { AuthProvider } from "./hooks/userAuth"

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/pet_list" element={< PetListPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
