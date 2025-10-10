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
    }});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            event: formData.event,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            details: formData.details,
            image: formData.image ? formData.image.name : null, // Send only the image name
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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
      <h2>แจ้งเหตุด่วน</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>เหตุการณ์ที่เกิดขึ้น:</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
        />

        <label>สถานที่:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>วันที่:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>เวลา(โดยประมาณ):</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>รายละเอียดเพิ่มเติม:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
        />

        <label>แนบรูปภาพ:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit">ส่งรายงาน</button>

        

      </form>
    </div>
  );
}

export default ReportFormPage;