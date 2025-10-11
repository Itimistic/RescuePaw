import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const PetBioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPet = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/pets/${id}`, { 
          method: "GET", 
          headers: { "Content-Type": "application/json" } 
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch pet data: ${res.status}`);
        }

        const data = await res.json();
        setPet(data.data); // สมมติ API return pet object ใน data.data
      } catch (err) {
        console.error(err);
        setError("Failed to load pet data.");
      } finally {
        setLoading(false);
      }
    };

    getPet();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-700">
        Loading pet data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center mt-20 text-gray-700">
        Pet not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <div className="flex-1 flex justify-center items-start">
          <img
            src={pet.image || "/placeholder.jpg"}
            alt={pet.name}
            className="rounded-3xl shadow-xl w-full h-80 max-w-md object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-5xl font-bold text-amber-600 mb-4">{pet.name}</h1>
          <p className="text-gray-700 mb-2"><span className="font-medium">Age:</span> {pet.age}</p>
          <p className="text-gray-700 mb-2"><span className="font-medium">Gender:</span> {pet.gender}</p>
          {/* <p className="text-gray-700 mb-2"><span className="font-medium">Birthday:</span> {pet.birthday}</p> */}
          {/* <p className="text-gray-700 mb-4"><span className="font-medium">Personality:</span> {pet.personality}</p> */}
          {/* <p className="text-gray-600 mb-6">{pet.bio}</p> */}

          <button
            onClick={() => navigate(`/adopt/form/${pet.id}`)}
            className="mt-4 bg-amber-500 text-white px-5 py-2 rounded-full font-medium hover:bg-amber-600 transition"
          >
            Adopt Me
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">Adoption Process</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>Submit an adoption application for the pet you are interested in.</li>
          <li>Our team reviews your application and contacts you for more details.</li>
          <li>Schedule a visit to meet the pet in person.</li>
          <li>If approved, complete the adoption agreement and pay any applicable fees.</li>
          <li>Take your new friend home and enjoy your life together!</li>
        </ol>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-500 underline font-medium hover:text-amber-600"
        >
          Back to Adopt Page
        </button>
      </div>
    </div>
  );
};

export default PetBioPage;
