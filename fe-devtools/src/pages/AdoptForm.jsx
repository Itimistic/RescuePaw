import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdoptForm = ({ petName }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("id: ", id)
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    email: "",
    experiencewithpets: "",
    agreeterms: false,
    fullName: "",
    phone: "",
    reason: "",
    state: "",
    zip: "",
    pet_id: id
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeterms) {
      alert("You must agree to the terms before submitting!");
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/adopt-forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();
      console.log("data: ", data)

    } catch (error) {
      console.log("Error creating form session:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-6">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          Thank you for adopting {petName}!
        </h1>
        <p className="text-gray-700 text-lg text-center max-w-xl">
          We have received your application. Our team will contact you shortly to complete the adoption process.
        </p>
        <br></br>
        <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/adopt")}
          className="text-amber-500 underline font-medium hover:text-amber-600"
        >
          Back to Adopt Page
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6 lg:px-32">
      <h1 className="text-4xl font-bold text-amber-600 mb-6 text-center">
        Adoption Form for {petName}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto space-y-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address *</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* City, State, Zip */}
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">City *</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">State *</label>
            <input
              type="text"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">ZIP *</label>
            <input
              type="text"
              name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Reason for Adoption */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Why do you want to adopt this pet? *</label>
          <textarea
            name="reason"
            required
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>

        {/* Experience with Pets */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Do you have experience with pets? *</label>
          <textarea
            name="experiencewithpets"
            required
            value={formData.experiencewithpets}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>

        {/* Agree Terms */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreeterms"
            checked={formData.agreeterms}
            onChange={handleChange}
            className="mr-2 accent-amber-500"
            required
          />
          <label className="text-gray-700">
            I agree to the adoption terms and conditions *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition"
        >
          Submit Adoption Application
        </button>
      </form>
    </div>
  );
};

export default AdoptForm;
