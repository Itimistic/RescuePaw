import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminAdoptDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false); // loading สำหรับ approve/reject

  // Fetch adopt form + pet
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ ดึง adopt form
        const resForm = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/adopt-forms/${id}`);
        if (!resForm.ok) throw new Error("Failed to fetch adopt form");
        const dataForm = await resForm.json();
        const adoptForm = dataForm.data;
        setForm(adoptForm);

        // 2️⃣ ดึงข้อมูล pet
        if (adoptForm.pet_id) {
          const resPet = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/pets/${adoptForm.pet_id}`);
          if (!resPet.ok) throw new Error("Failed to fetch pet");
          const dataPet = await resPet.json();
          setPet(dataPet.data);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ฟังก์ชัน approve / reject
  const handleStatusChange = async (action) => {
    if (!form) return;
    setStatusUpdating(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/adopt-forms/${form.id}/${action}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error(`Failed to ${action}`);
      setForm({ ...form, status: action === "approve" ? "Approved" : "Rejected" });
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!form) return <div className="text-center mt-10 text-gray-500">Form not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 underline mb-4"
      >
        Back to list
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Adopt Form Detail</h1>

        {/* Form info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p><span className="font-medium">Full Name:</span> {form.fullName}</p>
            <p><span className="font-medium">Email:</span> {form.email}</p>
            <p><span className="font-medium">Phone:</span> {form.phone}</p>
            <p><span className="font-medium">Address:</span> {form.address}, {form.city}, {form.state} {form.zip}</p>
            <p><span className="font-medium">Agree Terms:</span> {form.agreeTerms ? "Yes" : "No"}</p>
          </div>

          <div>
            <p><span className="font-medium">Pet ID:</span> {form.pet_id}</p>
            <p><span className="font-medium">Experience with pets:</span> {form.experiencewithPets}</p>
            <p><span className="font-medium">Reason:</span> {form.reason}</p>
            <p><span className="font-medium">Status:</span> {form.status || "Pending"}</p>
          </div>
        </div>

        {/* Pet info */}
        {pet && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Pet Info</h2>
            <p><span className="font-medium">Name:</span> {pet.name}</p>
            <p><span className="font-medium">Species:</span> {pet.species}</p>
            <p><span className="font-medium">Breed:</span> {pet.breed}</p>
            <p><span className="font-medium">Age:</span> {pet.age}</p>
            <img src={pet.image || "/placeholder.jpg"} alt={pet.name} className="mt-3 w-48 h-48 object-cover rounded" />
          </div>
        )}

        {/* Approve / Reject Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleStatusChange("approve")}
            disabled={statusUpdating || form.status === "Approved"}
            className={`px-5 py-2 rounded text-white ${form.status === "Approved" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} transition`}
          >
            {statusUpdating ? "Updating..." : "Approve"}
          </button>

          <button
            onClick={() => handleStatusChange("reject")}
            disabled={statusUpdating || form.status === "Rejected"}
            className={`px-5 py-2 rounded text-white ${form.status === "Rejected" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} transition`}
          >
            {statusUpdating ? "Updating..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAdoptDetailPage;
