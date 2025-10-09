import { useState } from "react";
import { Search, Filter, Heart, Calendar, MapPin } from "lucide-react";

const PetListSection = () => {
  // Mock data สำหรับสัตว์
  const mockPets = [
    {
      id: 1,
      name: "ลัคกี้",
      type: "สุนัข",
      breed: "ลูกผสม",
      age: "2 ปี",
      gender: "ตัวผู้",
      size: "กลาง",
      location: "กรุงเทพฯ",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500",
      description: "น้องลัคกี้เป็นสุนัขที่ร่าเริงและเป็นมิตร ชอบเล่นกับคน เหมาะกับครอบครัวที่มีเด็ก",
      vaccinated: true,
      sterilized: true
    },
    {
      id: 2,
      name: "มิว",
      type: "แมว",
      breed: "ไทย",
      age: "1 ปี",
      gender: "ตัวเมีย",
      size: "เล็ก",
      location: "กรุงเทพฯ",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
      description: "น้องมิวเป็นแมวที่สงบและน่ารัก ชอบนอนตักและเล่นกับของเล่น",
      vaccinated: true,
      sterilized: true
    },
    {
      id: 3,
      name: "บราวนี่",
      type: "สุนัข",
      breed: "โกลเด้นรีทรีฟเวอร์ผสม",
      age: "3 ปี",
      gender: "ตัวเมีย",
      size: "ใหญ่",
      location: "นนทบุรี",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
      description: "น้องบราวนี่เป็นสุนัขที่ฉลาดและภักดี ชอบออกกำลังกายและว่ายน้ำ",
      vaccinated: true,
      sterilized: false
    },
    {
      id: 4,
      name: "ซูชิ",
      type: "แมว",
      breed: "เปอร์เซีย",
      age: "4 ปี",
      gender: "ตัวผู้",
      size: "กลาง",
      location: "สมุทรปราการ",
      image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=500",
      description: "น้องซูชิเป็นแมวที่สง่างามและชอบความสะอาด เหมาะกับคนที่อยู่คอนโด",
      vaccinated: true,
      sterilized: true
    },
    {
      id: 5,
      name: "แม็กซ์",
      type: "สุนัข",
      breed: "บีเกิล",
      age: "1 ปี",
      gender: "ตัวผู้",
      size: "กลาง",
      location: "ปทุมธานี",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500",
      description: "น้องแม็กซ์เป็นสุนัขที่กระตือรือร้นและชอบผจญภัย เหมาะกับคนที่ชอบกิจกรรมกลางแจ้ง",
      vaccinated: true,
      sterilized: true
    },
    {
      id: 6,
      name: "ลูน่า",
      type: "แมว",
      breed: "สีดำ",
      age: "6 เดือน",
      gender: "ตัวเมีย",
      size: "เล็ก",
      location: "กรุงเทพฯ",
      image: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=500",
      description: "น้องลูน่าเป็นลูกแมวที่ซนและน่ารัก ชอบเล่นและสำรวจสิ่งใหม่ ๆ",
      vaccinated: false,
      sterilized: false
    },
    {
      id: 7,
      name: "จอร์จ",
      type: "สุนัข",
      breed: "ชิสุ",
      age: "5 ปี",
      gender: "ตัวผู้",
      size: "เล็ก",
      location: "กรุงเทพฯ",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
      description: "น้องจอร์จเป็นสุนัขที่อ่อนโยนและชอบความสงบ เหมาะกับผู้สูงอายุ",
      vaccinated: true,
      sterilized: true
    },
    {
      id: 8,
      name: "มาร์ลีย์",
      type: "แมว",
      breed: "ส้มลาย",
      age: "2 ปี",
      gender: "ตัวผู้",
      size: "กลาง",
      location: "นนทบุรี",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500",
      description: "น้องมาร์ลีย์เป็นแมวที่รักการเล่นและมีพลังงานสูง ชอบไล่จับของเล่น",
      vaccinated: true,
      sterilized: true
    }
  ];

  // State สำหรับการกรองและค้นหา
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ทั้งหมด");
  const [filterGender, setFilterGender] = useState("ทั้งหมด");
  const [filterSize, setFilterSize] = useState("ทั้งหมด");
  const [selectedPet, setSelectedPet] = useState(null);

  // กรองข้อมูล
  const filteredPets = mockPets.filter((pet) => {
    const matchSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "ทั้งหมด" || pet.type === filterType;
    const matchGender = filterGender === "ทั้งหมด" || pet.gender === filterGender;
    const matchSize = filterSize === "ทั้งหมด" || pet.size === filterSize;

    return matchSearch && matchType && matchGender && matchSize;
  });

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
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาชื่อหรือสายพันธุ์..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">กรองตาม:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ประเภท</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option>ทั้งหมด</option>
                <option>สุนัข</option>
                <option>แมว</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เพศ</label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option>ทั้งหมด</option>
                <option>ตัวผู้</option>
                <option>ตัวเมีย</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ขนาด</label>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              >
                <option>ทั้งหมด</option>
                <option>เล็ก</option>
                <option>กลาง</option>
                <option>ใหญ่</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            พบ <span className="font-bold text-green-600">{filteredPets.length}</span> ตัว
          </p>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer"
              onClick={() => setSelectedPet(pet)}
            >
              {/* Pet Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-green-50 transition">
                  <Heart className="w-5 h-5 text-green-500" />
                </div>
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {pet.type}
                </div>
              </div>

              {/* Pet Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{pet.breed}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{pet.age}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{pet.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {pet.vaccinated && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      ฉีดวัคซีนแล้ว
                    </span>
                  )}
                  {pet.sterilized && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      ทำหมันแล้ว
                    </span>
                  )}
                </div>

                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-500 transition">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">ไม่พบสัตว์ที่ตรงกับเงื่อนไขที่คุณค้นหา</p>
            <p className="text-gray-500 mt-2">ลองปรับเปลี่ยนเงื่อนไขการค้นหาใหม่</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PetListSection;