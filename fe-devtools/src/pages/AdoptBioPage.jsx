import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PawPrint, Calendar, Heart, Dog, Cat } from "lucide-react";

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
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch pet data: ${res.status}`);
        }

        const data = await res.json();
        setPet(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load pet data.");
      } finally {
        setLoading(false);
      }
    };

    getPet();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-gray-700">Loading pet data...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  if (!pet)
    return <div className="text-center mt-20 text-gray-700">Pet not found!</div>;

  return (
    <div className="min-h-screen py-16 px-6 lg:px-24 mt-20">
      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-500 underline font-medium hover:text-amber-600"
        >
          Back to Adopt Page
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative">
          <img
            src={pet.image || "/placeholder.jpg"}
            alt={pet.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-amber-600 mb-6 flex gap-1">
            Hi, I’m {pet.name} <span><PawPrint /></span>
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <Heart className="text-amber-500 w-5 h-5" />
              <span className="text-gray-700 font-medium">{pet.gender}</span>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <Dog className="text-amber-500 w-5 h-5" />
              <span className="text-gray-700 font-medium">{pet.size}</span>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 col-span-2">
              <Calendar className="text-amber-500 w-5 h-5" />
              <span className="text-gray-700 font-medium">{pet.age}</span>
            </div>
          </div>

          {pet.status && (
            <div className="mb-4">
              <h3 className="text-gray-800 font-semibold mb-2">Personality</h3>
              <div className="flex flex-wrap gap-3">
                {pet.status.split(",").map((trait, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-700 font-medium px-4 py-1.5 rounded-full text-sm"
                  >
                    {trait.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-gray-800 font-semibold mb-2">Care</h3>
            <span className="bg-red-100 text-red-600 font-medium px-4 py-1.5 rounded-full text-sm">
              ❤️ I have a disability
            </span>
          </div>

          <button
            onClick={() => navigate(`/adopt/form/${pet.id}`)}
            className="mt-8 bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition shadow-md w-fit"
          >
            Adopt Me
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full mx-auto mt-16">
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
          Adoption Process
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
          <li>Submit an adoption application for the pet you are interested in.</li>
          <li>Our team reviews your application and contacts you for more details.</li>
          <li>Schedule a visit to meet the pet in person.</li>
          <li>If approved, complete the adoption agreement and pay any applicable fees.</li>
          <li>Take your new friend home and enjoy your life together!</li>
        </ol>
      </div>


    </div>
  );
};

export default PetBioPage;
