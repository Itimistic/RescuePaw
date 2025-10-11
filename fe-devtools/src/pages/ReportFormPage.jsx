import React, { useState, useEffect } from "react";

import "../reportform.css";

function ReportFormPage() {
  const [formData, setFormData] = useState({
    event: "",
    location: "",
    date: "",
    time: "",
    details: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };


  useEffect(() => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/report`, {
        method: "POST",
        body: form, 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response:", data);
      alert("ส่งรายงานสำเร็จ!");
    } catch (err) {
      console.log("Error:", err);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <div className="form-container">
      <h2>Emergency Report</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>What's happened?:</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Approximate Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Additional Details:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
        />

        <label>Attach Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit">Submit Report</button>

        <br />
        <h2>Thank you for your report</h2>



      </form>
    </div>
  );
}

export default ReportFormPage;