import { useEffect, useState } from "react";
import { Search, Filter, Heart, Calendar, House } from "lucide-react";
import { Link } from "react-router-dom";

const PetListSection = () => {
  // State สำหรับข้อมูลสัตว์
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  // State สำหรับการกรองและค้นหา
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [filterSize, setFilterSize] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);

  // ดึงข้อมูลสัตว์จาก API
  useEffect(() => {
    const getPet = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_BASE_URL}/api/pets`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("data1:", data);
        setPets(data.data);
        setFilteredPets(data.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getPet();
  }, []);

  // ฟิลเตอร์ข้อมูลเมื่อผู้ใช้เปลี่ยน search หรือ filter
  useEffect(() => {
    let filtered = pets;

    // กรองตามคำค้นหา
    if (searchTerm) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // กรองตามประเภท
    if (filterSpecies !== "All") {
      filtered = filtered.filter((pet) => pet.species === filterSpecies);
    }

    // กรองตามเพศ
    if (filterGender !== "All") {
      filtered = filtered.filter((pet) => pet.gender === filterGender);
    }

    // กรองตามขนาด
    if (filterSize !== "All") {
      filtered = filtered.filter((pet) => pet.size === filterSize);
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((pet) => pet.status === filterStatus);
    }

    setFilteredPets(filtered);
  }, [searchTerm, filterSpecies, filterGender, filterSize, filterStatus, pets]);

  return (
    <section className="py-12 lg:px-32 bg-gradient-to-b from-white to-green-200 w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                species="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or breed..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filter by:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* species Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            find <span className="font-bold text-green-600">{filteredPets.length}</span> result.
          </p>
        </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPets.map((pet) => (
        <div
          key={pet.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer"
        >
          {/* Pet Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={pet.image || "/placeholder.jpg"}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-green-50 transition">
              <Heart className="w-5 h-5 text-green-500" />
            </div>
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {pet.species} {pet.id}
            </div>
          </div>

          {/* Pet Info */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{pet.breed}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{pet.age} years</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <House className="w-4 h-4" />
                <span>{pet.status}</span>
              </div>
            </div>

            {/* Learn More Button as Link */}
            <Link
              to={`/adopt/${pet.id}`}
              className="block w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition text-center"
            >
              Learn more
            </Link>
          </div>
        </div>
      ))}
    </div>

        {/* No Results */}
        {filteredPets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No pets match your search criteria,</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters and search terms.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PetListSection;