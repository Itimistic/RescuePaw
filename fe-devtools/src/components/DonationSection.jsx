import { useState, useEffect } from "react";
import { Banknote, Heart } from "lucide-react";
import dog_cat from "../assets/donation/dog_cat.jpg"
import dog2 from "../assets/donation/dog2.jpg"

const DonationSection = () => {
  const donationPresets = [500, 1000, 2000, 5000];

  // State
  const [donationType, setDonationType] = useState("one-time");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [impactMessage, setImpactMessage] = useState("");

  // Function คำนวณ impact
  const calculateImpact = (amount) => {
    if (!amount || amount <= 0) return "";

    if (amount < 500) return "ทุกบาทช่วยสัตว์จรจัดได้!";
    if (amount < 1000) return `อาหารสัตว์ประมาณ ${Math.floor(amount / 500)} สัปดาห์`;
    if (amount < 2000) return `สามารถให้วัคซีน/ยาถ่ายพยาธิได้ ${Math.floor(amount / 1000)} ตัว`;
    if (amount < 5000) return `การรักษาพยาบาลเบื้องต้นสำหรับ ${Math.floor(amount / 2000)} ตัว`;
    return `สามารถทำหมันสัตว์ได้ประมาณ ${Math.floor(amount / 5000)} ตัว`;
  };

  // Effect อัปเดต impact เมื่อ donation เปลี่ยน
  useEffect(() => {
    const amount = donationAmount ? parseInt(donationAmount) : parseInt(customAmount);
    setImpactMessage(calculateImpact(amount));
  }, [donationAmount, customAmount]);

  const handleDonation = () => {
    const amount = donationAmount || customAmount;
    if (!amount || amount <= 0) {
      alert("กรุณาใส่จำนวนเงินบริจาค");
      return;
    }
    alert(`ขอบคุณสำหรับการบริจาค ${amount} บาท!`);
    // ทำการส่งข้อมูลไป backend / payment gateway
  };

  return (
    <section id="donation" className="py-20 lg:px-32 bg-gradient-to-b from-white to-amber-50 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">บริจาคเพื่อช่วยเหลือสัตว์จรจัด</h2>
          <p className="text-xl text-gray-600">
            การบริจาคของคุณช่วยให้หมาและแมวจรจัดมีอาหาร, ยารักษา และที่อยู่อาศัยที่ปลอดภัย
          </p>
        </div>

        <div className="lg:flex justify-between gap-10">
          {/* Donation Form */}
          <div className="rounded-3xl  p-8 md:p-12 w-full flex flex-col gap-8 shadow-2xl">
            {/* Donation Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">ประเภทการบริจาค</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDonationType("one-time")}
                  className={`p-4 font-semibold rounded-xl transition ${
                    donationType === "one-time"
                      ? " bg-amber-100 text-amber-600"
                      : "border-2 border-gray-300 bg-white text-gray-700 hover:border-amber-300"
                  }`}
                >
                  บริจาคครั้งเดียว
                </button>
                <button
                  onClick={() => setDonationType("monthly")}
                  className={`p-4 rounded-xl transition ${
                    donationType === "monthly"
                      ? " bg-amber-100 text-amber-600 font-semibold"
                      : "bg-stone-300"
                  }`}
                >
                  บริจาครายเดือน
                </button>
              </div>
            </div>

            {/* Donation Presets */}
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
                    className={`p-4 rounded-xl font-semibold text-lg transition ${
                      donationAmount === amount.toString()
                        ? "border-amber-400 bg-amber-400 text-white"
                        : "bg-stone-300 hover:bg-amber-300 hover:text-white"
                    }`}
                  >
                    ฿{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
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

            {/* Donation Impact */}
            {impactMessage && (
              <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-amber-400 fill-amber-400" />
                  ผลกระทบจากการบริจาคของคุณ:
                </h3>
                <p className="text-gray-700">{impactMessage}</p>
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonation}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              บริจาคเลย
            </button>

            <p className="text-center text-sm text-gray-500">
              การบริจาคปลอดภัยและสามารถลดหย่อนภาษีได้
            </p>
          </div>

          {/* Image / Illustration */}
            <div className="rounded-3xl shadow-2xl p-6 md:p-8 lg:max-w-1/3 flex flex-col gap-6">
                <img src={dog_cat} alt="สัตว์จรจัด" className="rounded-2xl object-cover" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">เรื่องราวของสัตว์จรจัด</h3>

                <div className="">
                    {/* Article 1 */}
                    <div className="border-l-4 border-amber-400 pl-4">
                    <h4 className="font-semibold text-lg text-gray-800">น้องหมาจรจากชุมชนเมือง</h4>
                    <p className="text-gray-600 text-sm">
                        น้องหมาตัวนี้ถูกพบในซอยเล็ก ๆ ของกรุงเทพฯ ทีมงานเราได้นำอาหารและน้ำไปให้ทุกวันจนเริ่มคุ้นเคย
                        การบริจาคของคุณช่วยให้เราสามารถดูแลและหาบ้านใหม่ให้กับน้องหมาเหล่านี้ได้
                    </p>
                    </div>

                    {/* Article 2 */}
                    <div className="border-l-4 border-amber-400 pl-4">
                    <h4 className="font-semibold text-lg text-gray-800">น้องแมวที่ถูกทิ้ง</h4>
                    <p className="text-gray-600 text-sm">
                        น้องแมวหลายตัวถูกทิ้งตามชุมชน ทีมงานของเรานำอาหาร วัคซีน และที่พักพิงชั่วคราวให้
                        บริจาคของคุณช่วยสร้างความปลอดภัยและสุขภาพที่ดีให้พวกเขา
                    </p>
                    </div>

                    {/* Article 3 */}
                    <div className="border-l-4 border-amber-400 pl-4">
                    <h4 className="font-semibold text-lg text-gray-800">การทำหมันสัตว์</h4>
                    <p className="text-gray-600 text-sm">
                        การทำหมันสัตว์ช่วยควบคุมจำนวนประชากรสัตว์จรจัด ลดความทุกข์ทรมานของสัตว์ และป้องกันการแพร่โรค
                        ทุกการบริจาคช่วยให้โครงการนี้ดำเนินต่อไปได้
                    </p>
                    </div>

                    {/* Article 4 */}
                    <div className="border-l-4 border-amber-400 pl-4">
                    <h4 className="font-semibold text-lg text-gray-800">ความสำคัญของการบริจาค</h4>
                    <p className="text-gray-600 text-sm">
                        เงินบริจาคของคุณถูกใช้ในการซื้ออาหาร ยารักษาโรค วัคซีน และอุปกรณ์ดูแลสัตว์
                        ทุกบาทมีค่าต่อชีวิตของสัตว์จรจัดและสร้างความหวังให้กับพวกเขา
                    </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default DonationSection;
