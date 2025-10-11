import { useState, useEffect } from "react";
import { Banknote, Heart, User, Mail } from "lucide-react";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';


const DonationSection = () => {
  const stripe = useStripe();
  const elements = useElements();

  const donationPresets = [500, 1000, 2000, 5000];

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [impactMessage, setImpactMessage] = useState("");

  const calculateImpact = (amount) => {
    if (!amount || amount <= 0) return "";
    if (amount < 500) return "Every baht helps a stray animal!";
    if (amount < 1000) return `Provides pet food for about ${Math.floor(amount / 500)} week(s)`;
    if (amount < 2000) return `Covers vaccines or deworming for ${Math.floor(amount / 1000)} animal(s)`;
    if (amount < 5000) return `Provides basic medical care for ${Math.floor(amount / 2000)} animal(s)`;
    return `Supports spaying/neutering for about ${Math.floor(amount / 5000)} animal(s)`;

  };

  useEffect(() => {
    const amount = donationAmount ? parseInt(donationAmount) : parseInt(customAmount);
    setImpactMessage(calculateImpact(amount));
  }, [donationAmount, customAmount]);

  const handleDonation = async (e) => {
    e.preventDefault();

    const amount = donationAmount || customAmount;

    if (!stripe || !elements) return;

    if (!amount || amount <= 0) return alert("Please enter a donation amount");
    if (!donationType) return alert("Please select a donation type");
    if (!donorName) return alert("Please enter your name");
    if (!donorEmail) return alert("Please enter your email");

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
      alert("Oops! Something went wrong. Please try again.");
    }
  };


  return (
    <>
      <div>
        <label className="block text-xl font-semibold text-gray-800 mb-4">Donor Information</label>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute pointer-events-none left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full name"
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
        <label className="block text-lg font-semibold text-gray-800 mb-4">Type of Donation</label>
        <div>
          <button
            onClick={() => setDonationType("one-time")}
            className={`p-4 w-full font-semibold text-lg rounded-xl transition ${donationType === "one-time"
                ? " bg-amber-100 text-amber-600"
                : "bg-stone-300"
              }`}
          >
            One-time Donation
          </button>
          {/* <button
            onClick={() => setDonationType("monthly")}
            className={`p-4 rounded-xl transition font-semibold ${donationType === "monthly"
                ? " bg-amber-100 text-amber-600 font-semibold"
                : "bg-stone-300"
              }`}
          >
            บริจาครายเดือน
          </button> */}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">Select Amount (Baht)</label>
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
        <label className="block text-lg font-semibold text-gray-800 mb-4">or enter your own amount</label>
        <div className="relative">
          <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setDonationAmount("");
            }}
            placeholder="Enter Amount (Baht)"
            className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-300 focus:border-amber-400 focus:outline-none text-lg"
            min="0"
          />
        </div>
      </div>

      {impactMessage && (
        <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-amber-400 fill-amber-400" />
            Your Donation’s Impact:
          </h3>
          <p className="text-gray-700">{impactMessage}</p>
        </div>
      )}

      <button
        onClick={handleDonation}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
      >
        Donate Now
      </button>

      <p className="text-center text-medium text-gray-500">
        “Donations are secure and tax-deductible.
      </p>
    </>
  );
};

export default DonationSection;
