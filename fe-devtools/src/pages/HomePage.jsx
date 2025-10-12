import a4 from "../assets/donation/a4.png"
import rescuepaw from "../assets/rescuepaw.png"
import heart from "../assets/donation/heart.png"

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-400 relative pt-25">
      <div className="text-center relative z-20">
        <img src={heart} alt="heart" className="w-[55px] mx-auto mb-2" />
        <h1 className="text-5xl font-bold text-white">Give Love, Save Lives</h1>
        <p className="text-white">Join us in helping stray dogs and cats find hope and care</p>
      </div>

      <div className="relative w-full flex justify-center z-30 -mt-10">
        {/* <img
          src={rescuepaw}
          alt="donate"
          className="absolute  top-1/2 -translate-y-1/2 w-full opacity-30 z-10"
        /> */}
        <img
          src={a4}
          alt="animal"
          className="w-[630px] max-w-full object-contain relative z-20"
        />
      </div>

      <div className="bg-white w-full text-center px-6 py-6 relative z-10">
        <h1 className="text-3xl font-bold leading-relaxed text-gray-800">
            <span className="text-indigo-400">A little kindness</span> can{" "}
            <span className="text-indigo-400">make a big difference</span> for dogs and cats{" "}
            <span className="text-indigo-400">looking for a loving home.</span>
        </h1>
        <p className="mt-1 font-semibold text-gray-500">
          Your support helps us provide food, shelter, and love for stray dogs and cats.
        </p>
      </div>
      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 bg-indigo-50 w-full px-6 lg:px-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            RescuePaw is a community-driven initiative dedicated to helping stray dogs and cats.
            Our mission is to provide food, shelter, medical care, and love to animals in need.
            Every donation and act of kindness helps give these animals a second chance at life.
            Join us in making a difference and bringing hope to those who have no voice.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto px-8">
          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg">
            {/* <img src={foodIcon} alt="food" className="w-16 mx-auto mb-4" /> */}
            <h3 className="text-xl font-bold mb-2 text-indigo-700">Feed the Strays</h3>
            <p className="text-gray-600">
              Providing nutritious meals for stray dogs and cats daily.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg">
            {/* <img src={medicalIcon} alt="medical" className="w-16 mx-auto mb-4" /> */}
            <h3 className="text-xl font-bold mb-2 text-indigo-700">Medical Care</h3>
            <p className="text-gray-600">
              Offering treatment and vaccinations for rescued animals.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg">
            {/* <img src={homeIcon} alt="adoption" className="w-16 mx-auto mb-4" /> */}
            <h3 className="text-xl font-bold mb-2 text-indigo-700">Find a Home</h3>
            <p className="text-gray-600">
              Connecting rescued pets with loving families.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-100 py-20 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Rescue Stories</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            {/* <img src={luna} alt="Luna" className="rounded-xl mb-4 w-full object-cover h-[300px]" /> */}
            <h3 className="text-xl font-bold text-indigo-700">Luna’s New Beginning</h3>
            <p className="text-gray-600 mt-2">
              Once abandoned, Luna is now happily adopted and loved by her new family.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            {/* <img src={milo} alt="Milo" className="rounded-xl mb-4 w-full object-cover h-[300px]" /> */}
            <h3 className="text-xl font-bold text-indigo-700">Milo’s Journey</h3>
            <p className="text-gray-600 mt-2">
              Milo was rescued from the streets and now lives a healthy, joyful life.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-indigo-800 text-white py-8 text-center w-full">
        <p className="text-lg font-semibold">© 2025 RescuePaw | All Rights Reserved</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-amber-400">Facebook</a>
          <a href="#" className="hover:text-amber-400">Instagram</a>
          <a href="#" className="hover:text-amber-400">Contact Us</a>
        </div>
      </footer>

    </div>
  )}

  export default HomePage