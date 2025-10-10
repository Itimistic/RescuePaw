import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";

const CertificatePage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const certificateRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate/${id}`
        );
        if (!res.ok) throw new Error("ไม่พบข้อมูลการบริจาค");
        const data = await res.json();
        console.log("data: ", data)
        if (data.status !== "complete") {
          navigate("/donate/cancel");
          return;
        }
        setDonation(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการโหลดใบรับรอง");
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">กำลังโหลดใบรับรอง...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center mt-10 justify-center px-4">
      <div
        ref={certificateRef}
        className="bg-white shadow-2xl rounded-3xl border-[10px] border-amber-200 w-full max-w-3xl p-10 text-center relative print:shadow-none print:border-none"
      >
        <div className="absolute top-8 left-8 right-8 border-t border-amber-200"></div>
        <h1 className="text-4xl font-bold text-amber-500 mb-4">
          ใบรับรองการบริจาค
        </h1>
        <p className="text-gray-600 mb-8">Certificate of Appreciation</p>

        <p className="text-lg text-gray-700 mb-4">ขอมอบใบรับรองนี้ให้แก่</p>
        <h2 className="text-3xl font-semibold text-orange-600 mb-2">
          {donation.donor_name}
        </h2>

        <p className="text-gray-700 mb-6">
          เพื่อแสดงความขอบคุณในความมีน้ำใจที่ได้บริจาคเป็นจำนวน{" "}
          <span className="font-semibold text-amber-500">
            {donation.amount.toLocaleString()} บาท
          </span>{" "}
          {donation.donation_type === "one-time"
            ? "แบบครั้งเดียว"
            : "แบบรายเดือน"}
        </p>

        <p className="text-gray-500 mb-10">
          รหัสการบริจาค: {donation.order_id}
        </p>

        <div className="border-t border-gray-300 mt-8 mb-4 w-2/3 mx-auto"></div>
        <p className="text-gray-600">RescuePaw Foundation</p>
        <p className="text-sm text-gray-400">
          วันที่ออกใบรับรอง: {new Date().toLocaleDateString("th-TH")}
        </p>

        {/* โลโก้หรือสัญลักษณ์ (ถ้ามี) */}
        <div className="absolute bottom-6 right-6 opacity-10 text-[80px] select-none">
          🐾
        </div>
      </div>

      {/* ปุ่มดาวน์โหลด / พิมพ์ */}
      <div className="mt-8 flex flex-col gap-4 items-center">
        <button
          onClick={handlePrint}
          className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg"
        >
          <Download size={20} /> พิมพ์ / บันทึกเป็น PDF
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-500 hover:text-orange-600 font-medium"
        >
          <ArrowLeft size={20} /> กลับ
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;
