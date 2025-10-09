import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DonateSuccess = () => {
    const [searchParams] = useSearchParams();
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const orderId = searchParams.get("order_id");

    useEffect(() => {
        if (!orderId) return setError("ไม่พบข้อมูลการบริจาค");

        const fetchDonation = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate/${orderId}`
                );

                if (!res.ok) throw new Error("ไม่พบข้อมูลการบริจาค");

                const data = await res.json();
                console.log("data: ", data)
                if (data.status !== "complete") {
                    window.location.href = "/donate/cancel"
                }
                setDonation(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("เกิดข้อผิดพลาดในการตรวจสอบการบริจาค");
                setLoading(false);
            }
        };

        fetchDonation();
    }, [orderId]);

    if (loading) return <p>กำลังตรวจสอบการบริจาค...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center relative pt-25">
            <div className="rounded-3xl py-12 px-28 shadow-2xl">
                <h1 className="text-3xl font-bold text-green-600 mb-4">ขอบคุณสำหรับการบริจาค!</h1>
                <p className="text-gray-700 mb-2">
                    คุณ {donation.donor_name} ได้บริจาค {donation.amount} บาท
                </p>
                <p className="text-gray-500 mb-6">
                    ประเภทการบริจาค: {donation.donation_type === "one-time" ? "ครั้งเดียว" : "รายเดือน"}
                </p>
                <p className="text-sm text-gray-400">รหัสการบริจาค: {donation.order_id}</p>
                <div className="cursor-pointer mt-7 w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition">
                    <a href="/">Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default DonateSuccess;
