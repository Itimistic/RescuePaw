import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";

const DonateSuccess = () => {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  console.log(orderId)

  useEffect(() => {
    if (!orderId) {
      setError("ไม่พบข้อมูลการบริจาค");
      setLoading(false);
      return;
    }

    const fetchDonation = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate/${orderId}`
        );

        if (!res.ok) throw new Error("ไม่พบข้อมูลการบริจาค");

        const data = await res.json();

        setDonation(data);
        setLoading(false);

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการตรวจสอบการบริจาค");
        setLoading(false);
      }
    };

    fetchDonation();
  }, [orderId, navigate]);

  if (loading) return <p className="text-center mt-10 text-gray-600">กำลังตรวจสอบการบริจาค...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const getImpactMessage = (amount) => {
    if (amount < 500) return "ทุกบาทของคุณช่วยเปลี่ยนชีวิตสัตว์ได้ 🐾";
    if (amount < 1000) return "คุณช่วยให้อาหารสัตว์ได้ 1 สัปดาห์ 🍖";
    if (amount < 2000) return "คุณช่วยให้สัตว์ได้รับวัคซีนหรือการรักษา 🩺";
    return "คุณช่วยให้สัตว์ได้รับการทำหมันและดูแลระยะยาว ❤️";
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 px-4">
      <div className="bg-white rounded-3xl py-10 px-8 shadow-2xl max-w-lg w-full text-center">
        <div className="flex justify-center mb-5">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">ขอบคุณสำหรับการบริจาค!</h1>
        <p className="text-gray-700 mb-2">
          คุณ <span className="font-semibold">{donation.donor_name}</span> ได้บริจาค{" "}
          <span className="font-semibold text-amber-500">{donation.amount.toLocaleString()}</span> บาท
        </p>
        <p className="text-gray-500 mb-6">
          ประเภทการบริจาค:{" "}
          {donation.donation_type === "one-time" ? "ครั้งเดียว" : "รายเดือน"}
        </p>

        <div className="bg-green-50 p-4 rounded-xl mb-6">
          <p className="text-green-700 font-medium">{getImpactMessage(donation.amount)}</p>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          รหัสการบริจาค: {donation.order_id}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-400 to-orange-400 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition"
          >
            กลับไปหน้าแรก
          </button>
          <a
            href={`/donate/certificate/${donation.order_id}`}
            className="border border-amber-400 text-amber-500 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
          >
            ดูใบรับรองการบริจาค 🪪
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccess;
