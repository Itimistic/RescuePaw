import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DonationDetail = () => {
    const [donation, setDonation] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 
    const orderId = id;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate/${orderId}`)
      .then(res => res.json())
      .then(data => {
        console.log(orderId)
        console.log(id)
        setDonation(data);
        setStatus(data.status);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [orderId]);

  const updateStatus = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER_BASE_URL}/api/admin/donations/${orderId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!donation) return <p>Donation not found</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Donation Detail</h1>
      <p><strong>Order ID:</strong> {donation.order_id}</p>
      <p><strong>Donor:</strong> {donation.donor_fname} {donation.donor_lname}</p>
      <p><strong>Email:</strong> {donation.email}</p>
      <p><strong>Amount:</strong> {donation.amount}</p>
      <p><strong>Type:</strong> {donation.donation_type}</p>
      <p><strong>Status:</strong></p>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded mb-4">
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
        <option value="failed">Failed</option>
      </select>
      <button onClick={updateStatus} className="ml-4 px-4 py-2 bg-amber-400 text-white rounded shadow hover:bg-amber-500">
        Update Status
      </button>
    </div>
  );
};

export default DonationDetail;
