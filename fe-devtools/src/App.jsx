import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationPage from "./pages/DonationPage";
// import PetList from "./pages/PetList";
import AdminPetList from "./pages/AdminPetList"; // admin-facing
import PetForm from "./pages/PetForm";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<DonationPage />} />
        <Route path="/login" element={<LoginPage />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
