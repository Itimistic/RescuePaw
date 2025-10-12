import { useState } from "react";
import heart from "../assets/pet_list/heart.png";
import a4 from "../assets/pet_list/a4.png"
import PetListSection from "../components/PetListSection";

const PetListPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-400 relative pt-25">
      {/* Top Section */}
      <div className="text-center relative z-20">
        <img src={heart} alt="heart" className="w-[55px] mx-auto mb-2" />
        <h1 className="text-5xl font-bold text-white">Find Your Friend</h1>
        <p className="text-white text-lg">Waiting for a loving home</p>
      </div>

      {/* Middle Section with Image */}
      <div className="relative w-full flex justify-center z-30 -mt-10">
        {/* animal อยู่ด้านหน้า */}
        <img
          src={a4}
          alt="animal"
          className="w-[630px] max-w-full object-contain relative z-20"
        />
      </div>

      {/* Bottom Section */}
      <div className="bg-white w-full text-center px-6 py-6 relative z-10">
        <h1 className="text-3xl font-bold leading-relaxed text-gray-800">
          <span className="text-green-600">Every pet deserves</span> a warm home and{" "}
          <span className="text-green-600">unconditional love.</span> Will you be{" "}
          <span className="text-green-600">their hero?</span>
        </h1>
        <p className="mt-1 font-semibold text-gray-500">
          Browse through our rescued pets and find your perfect companion today.
        </p>
      </div>

      <PetListSection />
    </div>
  );
};

export default PetListPage;