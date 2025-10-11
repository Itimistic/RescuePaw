import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function PetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [pet, setPet] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "male",
    size: "medium",
    image: "",
    status: "available",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:3000/api/pets/${id}`)
        .then((res) => setPet(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:3000/api/pets/${id}`, pet);
      } else {
        await axios.post("http://localhost:3000/api/pets", pet);
      }
      navigate("/admin/pets");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-orange-600">
            {isEdit ? "Edit Pet" : "Add New Pet"}
          </h2>
          <Link
            to="/admin/pets"
            className="text-sm text-gray-600 hover:text-orange-600 transition-all"
          >
            ← Back to Pet List
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "breed", "age", "image"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                id={field}
                type={field === "age" ? "number" : "text"}
                name={field}
                value={pet[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Species:
              </label>
              <select
                name="species"
                value={pet.species}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Gender:
              </label>
              <select
                name="gender"
                value={pet.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Size:
              </label>
              <select
                name="size"
                value={pet.size}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="big">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status:
              </label>
              <select
                name="status"
                value={pet.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-all duration-200"
          >
            {isEdit ? "Update Pet" : "Create Pet"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PetForm;
