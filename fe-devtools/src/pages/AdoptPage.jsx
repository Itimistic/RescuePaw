import React from "react";
import { useNavigate } from "react-router-dom";

const pets = [
  { id: 1, 
    name: "Milo", 
    age: "2 years", 
    bio: "A playful young cat who loves to cuddle and chase toys. Looking for a loving home.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/974px-Gatto_europeo4.jpg"
  },
  { id: 2, 
    name: "Bella", 
    age: "1 year", 
    bio: "Gentle and calm, Bella enjoys sunbathing and soft head pats. Perfect for small families.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Blackcat-Lilith.jpg"
  },
  { id: 3, 
    name: "Buddy", 
    age: "3 years", 
    bio: "Friendly dog rescued from the streets. Loves long walks and human companionship.",
    image: "https://placedog.net/400/400"
  },
  { id: 4, 
    name: "Luna", 
    age: "6 months", 
    bio: "A playful puppy full of joy! Needs a family that can give her lots of love and attention.",
    image: "https://placedog.net/401/400"
  },
];

const AdoptPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 py-20 px-6 lg:px-32">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-600 mb-4">Adopt a Friend</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Give a loving home to a dog or cat in need. Every adoption brings happiness to two hearts — yours and theirs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-80 h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-amber-500 font-medium">{pet.age}</p>
              <p className="text-gray-600 mt-2">{pet.bio}</p>
              <button
                onClick={() => navigate(`/adopt/${pet.id}`)}
                className="mt-4 bg-amber-500 text-white px-5 py-2 rounded-full font-medium hover:bg-amber-600 transition"
              >
                Adopt Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
