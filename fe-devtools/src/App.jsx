import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
import AdoptBioPage from "./pages/AdoptBioPage"
import AdoptForm from "./pages/AdoptForm"
import PetListPage from "./pages/PetListPage"
import AdminAdoptPage from "./pages/admin/AdminAdoptPage"
import AdminAdoptDetailPage from "./pages/admin/AdminAdoptDetailPage"
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
          <Route path="/" element={<DonationPage />} />
          <Route path="/adopt" element={<PetListPage />} />
          <Route path="/adopt/:id" element={<AdoptBioPage />} />
          <Route path="/adopt/form/:id" element={<AdoptForm />} />
          <Route path="/admin/adopt" element={<AdminAdoptPage />} />
          <Route path="/admin/adopt/:id" element={<AdminAdoptDetailPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
