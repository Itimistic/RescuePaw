import DonationPage from "./pages/DonationPage"
import DonateSuccess from "./pages/DonateSuccess"
import DonateCerti from "./pages/DonateCerti"
import DonateCancel from "./pages/DonateCancel"
import DonateDashboard from "./pages/admin/DonateDashboard"
import DonateDetail from "./pages/admin/DonateDetail"
import Navbar from "./components/Navbar"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PetList from "./pages/PetList";
import AdminPetList from "./pages/admin/AdminPetList"; // admin-facing
import PetForm from "./pages/PetForm";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
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

        {/* Normal user routes */}
        {/* <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <PetList />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin routes */}
        <Route
          path="/admin/pets"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPetList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pets/create"
          element={
            <ProtectedRoute adminOnly={true}>
              <PetForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pets/edit/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <PetForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donation"
          element={
            <ProtectedRoute adminOnly={true}>
              <DonateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donation/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <DonateDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
