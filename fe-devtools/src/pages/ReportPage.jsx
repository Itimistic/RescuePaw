import React, { useState, useEffect } from "react";
import "../report.css";

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/report`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log("Fetched reports:", data);

        if (response.ok) {
          setReports(data);
        } else {
          console.error("Error fetching reports:", data.message);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("ต้องการลบรายการนี้หรือไม่?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/report/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        alert("ลบข้อมูลเรียบร้อยแล้ว");
      } else {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("ไม่สามารถลบข้อมูลได้");
    }
  };

  return (
    <div className="report-table-container">
      <h2>ALL REPORTS</h2>
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>รูปภาพ</th>
              <th>เหตุการณ์</th>
              <th>สถานที่</th>  
              <th>วันที่</th>
              <th>เวลา</th>
              <th>รายละเอียด</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx}>
                <td>
                  {report.image ? (
                    <img
                      src={report.image}
                      alt="event"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "ไม่มีรูป"
                  )}
                </td>
                <td>{report.event}</td>
                <td>{report.location}</td>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>{report.details}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(report.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPage;
