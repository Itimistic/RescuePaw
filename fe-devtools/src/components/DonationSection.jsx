import { useState, useEffect } from "react";
import { Banknote, Heart, User, Mail } from "lucide-react";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';


const DonationSection = () => {
  const stripe = useStripe();
  const elements = useElements();

  const donationPresets = [500, 1000, 2000, 5000];

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationType, setDonationType] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [impactMessage, setImpactMessage] = useState("");

  const calculateImpact = (amount) => {
    if (!amount || amount <= 0) return "";

    if (amount < 500) return "ทุกบาทช่วยสัตว์จรจัดได้!";
    if (amount < 1000) return `อาหารสัตว์ประมาณ ${Math.floor(amount / 500)} สัปดาห์`;
    if (amount < 2000) return `สามารถให้วัคซีน/ยาถ่ายพยาธิได้ ${Math.floor(amount / 1000)} ตัว`;
    if (amount < 5000) return `การรักษาพยาบาลเบื้องต้นสำหรับ ${Math.floor(amount / 2000)} ตัว`;
    return `สามารถทำหมันสัตว์ได้ประมาณ ${Math.floor(amount / 5000)} ตัว`;
  };

  useEffect(() => {
    const amount = donationAmount ? parseInt(donationAmount) : parseInt(customAmount);
    setImpactMessage(calculateImpact(amount));
  }, [donationAmount, customAmount]);

  const handleDonation = async (e) => {
    e.preventDefault();

    const amount = donationAmount || customAmount;

    if (!stripe || !elements) return;

    if (!amount || amount <= 0) return alert("กรุณาใส่จำนวนเงินบริจาค");
    if (!donationType) return alert("กรุณาเลือกประเภทการบริจาค");
    if (!donorName) return alert("กรุณากรอกชื่อ");
    if (!donorEmail) return alert("กรุณากรอก email");

    const payload = {
      donation_type: donationType,
      amount: amount,
      donor_name: donorName,
      email: donorEmail
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();
      console.log("data: ", data)

      window.location.href = data.checkout_url;

    } catch (error) {
      console.log("Error creating donation session:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };


  return (
    <>
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">ข้อมูลผู้บริจาค</label>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute pointer-events-none left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-amber-400 focus:outline-none text-lg"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-amber-400 focus:outline-none text-lg"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">ประเภทการบริจาค</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setDonationType("one-time")}
            className={`p-4 font-semibold rounded-xl transition ${donationType === "one-time"
                ? " bg-amber-100 text-amber-600"
                : "bg-stone-300"
              }`}
          >
            บริจาคครั้งเดียว
          </button>
          <button
            onClick={() => setDonationType("monthly")}
            className={`p-4 rounded-xl transition font-semibold ${donationType === "monthly"
                ? " bg-amber-100 text-amber-600 font-semibold"
                : "bg-stone-300"
              }`}
          >
            บริจาครายเดือน
          </button>
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">เลือกจำนวนเงิน (บาท)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donationPresets.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setDonationAmount(amount.toString());
                setCustomAmount("");
              }}
              className={`p-4 rounded-xl font-semibold text-lg transition ${donationAmount === amount.toString()
                  ? "border-amber-400 bg-amber-400 text-white"
                  : "bg-stone-300 hover:bg-amber-300 hover:text-white"
                }`}
            >
              ฿{amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">หรือระบุจำนวนเงินเอง</label>
        <div className="relative">
          <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setDonationAmount("");
            }}
            placeholder="ระบุจำนวนเงิน"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-amber-400 focus:outline-none text-lg"
            min="0"
          />
        </div>
      </div>

      {impactMessage && (
        <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-amber-400 fill-amber-400" />
            ผลกระทบจากการบริจาคของคุณ:
          </h3>
          <p className="text-gray-700">{impactMessage}</p>
        </div>
      )}

      <button
        onClick={handleDonation}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
      >
        บริจาคเลย
      </button>

      <p className="text-center text-sm text-gray-500">
        การบริจาคปลอดภัยและสามารถลดหย่อนภาษีได้
      </p>
    </>
  );
};

export default DonationSection;
