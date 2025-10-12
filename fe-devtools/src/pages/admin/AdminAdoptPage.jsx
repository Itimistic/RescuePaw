import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AdminAdoptPage = () => {
  const [adoptForms, setAdoptForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูล adopt forms จาก API
  useEffect(() => {
    const fetchAdoptForms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/adopt-forms`);
        if (!res.ok) throw new Error("Failed to fetch adopt forms");
        const data = await res.json();
        setAdoptForms(data.data); // สมมติ API return data.data เป็น array
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptForms();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (adoptForms.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No adopt forms found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Admin Adopt Forms</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Full Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th> 
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"></th> 
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {adoptForms.map((form) => (
              <tr key={form.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{form.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{form.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{form.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{form.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{form.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Link to={`/admin/adopt/${form.id}`} className="w-full bg-green-500 text-white py-2 px-5 rounded-lg font-semibold hover:bg-green-600 transition">detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdoptPage;
