import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate`)
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error(err));
  }, []);

  // Calculate total donations and total amount
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Donation Dashboard</h1>

      {/* Summary */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-lg flex-1 text-center">
          <p className="text-gray-500">Total Donations</p>
          <p className="text-2xl font-bold text-amber-600">{totalDonations}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg flex-1 text-center">
          <p className="text-gray-500">Total Amount (Baht)</p>
          <p className="text-2xl font-bold text-amber-600">{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-amber-100">
            <tr>
              <th className="p-3 border text-left">Order ID</th>
              <th className="p-3 border text-left">Donor</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-right">Amount</th>
              <th className="p-3 border text-left">Type</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, index) => (
              <tr
                key={d.order_id}
                className={index % 2 === 0 ? "bg-white hover:bg-amber-50" : "bg-gray-50 hover:bg-amber-50"}
              >
                <td className="p-3 border">{d.order_id}</td>
                <td className="p-3 border">{d.donor_name}</td>
                <td className="p-3 border">{d.email}</td>
                <td className="p-3 border text-right">{d.amount.toLocaleString()}</td>
                <td className="p-3 border">{d.donation_type}</td>
                <td className="p-3 border capitalize">{d.status}</td>
                <td className="p-3 border text-center">
                  <Link
                    to={`/admin/donate/${d.order_id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {/* Optional: Show total at bottom of table */}
            <tr className="bg-amber-100 font-bold">
              <td className="p-3 border" colSpan={3}>Total</td>
              <td className="p-3 border text-right">{totalAmount.toLocaleString()}</td>
              <td className="p-3 border" colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
