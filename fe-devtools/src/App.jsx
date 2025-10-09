import { BrowserRouter, Route, Routes } from "react-router-dom"
import DonationPage from "./pages/DonationPage"
import DonateSuccess from "./pages/DonateSuccess"
import DonateCancel from "./pages/DonateCancel"
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
            <Route path="/donate/cancel" element={<DonateCancel />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
