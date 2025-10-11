import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Updated pet data with additional fields
const pets = [
  {
    id: 1,
    name: "Milo",
    age: "2 years",
    gender: "Male",
    birthday: "2023-01-15",
    personality: "Playful, affectionate, energetic",
    bio: "A playful young cat who loves to cuddle and chase toys. Looking for a loving home.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/974px-Gatto_europeo4.jpg",
  },
  {
    id: 2,
    name: "Bella",
    age: "1 year",
    gender: "Female",
    birthday: "2024-03-02",
    personality: "Gentle, calm, loves sunbathing",
    bio: "Gentle and calm, Bella enjoys sunbathing and soft head pats. Perfect for small families.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Blackcat-Lilith.jpg",
  },
  {
    id: 3,
    name: "Buddy",
    age: "3 years",
    gender: "Male",
    birthday: "2022-05-10",
    personality: "Friendly, loyal, loves walks",
    bio: "Friendly dog rescued from the streets. Loves long walks and human companionship.",
    image: "https://placedog.net/400/400",
  },
  {
    id: 4,
    name: "Luna",
    age: "6 months",
    gender: "Female",
    birthday: "2024-04-20",
    personality: "Playful, joyful, needs attention",
    bio: "A playful puppy full of joy! Needs a family that can give her lots of love and attention.",
    image: "https://placedog.net/401/400",
  },
];

const PetBioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = pets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return <div className="text-center mt-20 text-gray-700">Pet not found!</div>;
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6 lg:px-32">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left column: Pet image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={pet.image}
            alt={pet.name}
            className="rounded-3xl shadow-xl w-full h-80 max-w-md object-cover"
          />
        </div>

        {/* Right column: Pet details */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-amber-600 mb-4">{pet.name}</h1>
          <p className="text-gray-700 mb-2"><span className="font-medium">Age:</span> {pet.age}</p>
          <p className="text-gray-700 mb-2"><span className="font-medium">Gender:</span> {pet.gender}</p>
          <p className="text-gray-700 mb-2"><span className="font-medium">Birthday:</span> {pet.birthday}</p>
          <p className="text-gray-700 mb-4"><span className="font-medium">Personality:</span> {pet.personality}</p>
          <p className="text-gray-600 mb-6">{pet.bio}</p>
          <button
                onClick={() => navigate(`/adopt/${pet.id}/form`)}
                className="mt-4 bg-amber-500 text-white px-5 py-2 rounded-full font-medium hover:bg-amber-600 transition"
                >
                Adopt Me
            </button>
        </div>
      </div>

      {/* Adoption process section */}
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
