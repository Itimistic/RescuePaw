import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
import DonateSuccess from "./pages/DonateSuccess"
import DonateCerti from "./pages/DonateCerti"
import DonateCancel from "./pages/DonateCancel"
import DonateDashboard from "./pages/admin/DonateDashboard"
import DonateDetail from "./pages/admin/DonateDetail"
import Navbar from "./components/Navbar"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {

  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
            <Route 
              path="/donation" 
              element={
                <Elements stripe={stripePromise}>
                  <DonationPage />
                </Elements>
              } 
            />
            <Route path="/donate/success" element={<DonateSuccess />} />
            <Route path="/donate/certificate/:id" element={<DonateCerti />} />
            <Route path="/donate/cancel" element={<DonateCancel />} />
            <Route path="/admin/donate" element={<DonateDashboard />} />
            <Route path="/admin/donate/:id" element={<DonateDetail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
