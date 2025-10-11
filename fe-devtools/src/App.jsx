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
import ReportFormPage from "./pages/ReportFormPage"
import ReportPage from "./pages/ReportPage"
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
        <Routes>
          <Route path="/" element={<DonationPage />} />
          <Route path="/adopt" element={<PetListPage />} />
          <Route path="/adopt/:id" element={<AdoptBioPage />} />
          <Route path="/adopt/form/:id" element={<AdoptForm />} />
          <Route path="/admin/adopt" element={<AdminAdoptPage />} />
          <Route path="/admin/adopt/:id" element={<AdminAdoptDetailPage />} />
        </Routes>
      
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
        
        <Route path="/reportform" element={<ReportFormPage />} />

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
        <Route
          path="/admin/report" 
          element={
            <ProtectedRoute adminOnly={true}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
