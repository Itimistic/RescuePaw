import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, PawPrint, CheckCircle, XCircle } from "lucide-react";

const AdminAdoptDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 1. ดึงข้อมูลฟอร์ม
        const resForm = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/adopt-forms/${id}`);
        if (!resForm.ok) throw new Error("Failed to fetch adopt form");
        const dataForm = await resForm.json();
        const adoptForm = dataForm.data;
        setForm(adoptForm);

        // ✅ 2. ดึงข้อมูลสัตว์
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

  // ✅ ฟังก์ชันเปลี่ยนสถานะ (Approve / Reject)
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

  if (loading) return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!form) return <div className="text-center mt-20 text-gray-500">Form not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-16 px-6 lg:px-20 mt-20">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto p-10 border border-amber-100 relative">
        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-amber-600 hover:text-amber-700 font-medium underline"
        >
          ← Back to list
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-amber-700 text-center mb-10 flex justify-center items-center gap-2">
          <PawPrint className="w-7 h-7 text-amber-600" />
          Adoption Request Details
        </h1>

        {/* 🐾 Pet Info Section */}
        {pet && (
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <img
              src={pet.image || "/placeholder.jpg"}
              alt={pet.name}
              className="w-56 h-56 object-cover rounded-2xl border-4 border-amber-100 shadow-md"
            />
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Name:</span> {pet.name}</p>
              <p><span className="font-semibold">Species:</span> {pet.species}</p>
              <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
              <p><span className="font-semibold">Age:</span> {pet.age}</p>
              <p><span className="font-semibold">Gender:</span> {pet.gender}</p>
              <p><span className="font-semibold">Size:</span> {pet.size}</p>
            </div>
          </div>
        )}

        {/* 👤 Applicant Info */}
        <div className="border-t border-amber-200 pt-8">
          <h2 className="text-2xl font-semibold text-amber-700 mb-6">Applicant Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-2">
              <p><span className="font-semibold">Full Name:</span> {form.fullName}</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>{form.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{form.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{form.address}, {form.city}, {form.state} {form.zip}</span>
              </p>
            </div>

            <div className="space-y-2">
              <p><span className="font-semibold">Experience with pets:</span> {form.experiencewithPets}</p>
              <p><span className="font-semibold">Reason for adoption:</span> {form.reason}</p>
              <p>
                <span className="font-semibold">Agreed to Terms:</span>{" "}
                <span className={form.agreeTerms ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {form.agreeTerms ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    form.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : form.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {form.status || "Pending"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          <button
            onClick={() => handleStatusChange("approve")}
            disabled={statusUpdating || form.status === "Approved"}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-white shadow-md transition ${
              form.status === "Approved"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            {statusUpdating ? "Updating..." : "Approve"}
          </button>

          <button
            onClick={() => handleStatusChange("reject")}
            disabled={statusUpdating || form.status === "Rejected"}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-white shadow-md transition ${
              form.status === "Rejected"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <XCircle className="w-5 h-5" />
            {statusUpdating ? "Updating..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAdoptDetailPage;
