import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api"; // import logout from api.js

function AdminPetList() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/pets/${id}`);
      setPets(pets.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete pet.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Pet Management</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/pets/create"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-all"
          >
            + Add Pet
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Species</th>
              <th className="text-left py-3 px-4">Gender</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr
                key={pet.id}
                className="border-t hover:bg-orange-50 transition-all"
              >
                <td className="py-3 px-4">
                  <img
                    src={pet.image || "https://place-puppy.com/100x100"}
                    alt={pet.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{pet.name}</td>
                <td className="py-3 px-4 capitalize">{pet.species}</td>
                <td className="py-3 px-4 capitalize">{pet.gender}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-lg ${
                      pet.status === "available"
                        ? "bg-green-100 text-green-700"
                        : pet.status === "adopted"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {pet.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <Link
                    to={`/admin/pets/edit/${pet.id}`}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pets.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No pets available yet 🐾
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPetList;
