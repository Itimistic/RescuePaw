import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/donate`)
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error(err));
  }, []);

  // ดึงปีและเดือนทั้งหมดจาก donations
  const years = Array.from(new Set(donations.map(d => new Date(d.createdAt).getFullYear())));
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const filteredDonations = donations.filter(d => {
    const date = new Date(d.createdAt);
    const yearMatch = selectedYear ? date.getFullYear() === Number(selectedYear) : true;
    const monthMatch = selectedMonth ? format(date, "MM") === selectedMonth : true;
    return yearMatch && monthMatch;
  });

  const totalAmount = filteredDonations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalDonations = filteredDonations.length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Donation Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Year</label>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500"
          >
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Month</label>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500"
          >
            <option value="">All Months</option>
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded-lg flex-1 text-center">
          <p className="text-gray-500">Total Donations</p>
          <p className="text-2xl font-bold text-amber-600">{totalDonations}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg flex-1 text-center">
          <p className="text-gray-500">Total Amount (Baht)</p>
          <p className="text-2xl font-bold text-amber-600">{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-amber-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Donor Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((d, index) => (
              <tr
                key={d.order_id}
                className={index % 2 === 0 ? "bg-white hover:bg-amber-50" : "bg-gray-50 hover:bg-amber-50"}
              >
                <td className="p-3">{d.order_id}</td>
                <td className="p-3">{d.donor_name}</td>
                <td className="p-3">{d.email}</td>
                <td className="p-3 text-left">{d.amount.toLocaleString()}</td>
                <td className="p-3">{d.donation_type}</td>
                <td className="p-3 capitalize text-green-600 font-semibold">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
