import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/donation" element={<DonationPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
