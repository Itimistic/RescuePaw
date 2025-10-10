import { Link } from "react-router-dom";
import { PawPrint, Heart, PlusCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full  backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        <Link to="/" className="flex items-center gap-2 text-black font-bold text-3xl">
          <PawPrint size={32} className="text-red-500 fill-red-500" />
          RescuePaw
        </Link>

        <div className="hidden md:flex gap-4">
          <Link
            to="/donation"
            className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow hover:shadow-lg transition"
          >
            <Heart className="fill-white" size={18} />
            Donate
          </Link>
          <Link
            to="/"
            className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow hover:shadow-lg transition"
          >
            <PawPrint className="fill-white" size={18} />
            Adopt
          </Link>
          <Link
            to="/"
            className="bg-black text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow hover:shadow-lg transition"
          >
            <PlusCircle size={18} />
            Report Lost/Found
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
