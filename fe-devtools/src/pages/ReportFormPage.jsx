import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ข้อมูลที่ส่ง:", formData);

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