import a4 from "../assets/donation/a4.png"
import heart from "../assets/donation/heart.png"
import donate from "../assets/donation/donate.png"
import DonationSection from "../components/DonationSection"

const DonationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-400 relative pt-25">
      {/* Top Section */}
      <div className="text-center relative z-20">
        <img src={heart} alt="heart" className="w-[55px] mx-auto mb-2" />
        <h1 className="text-5xl font-bold text-white">Hearts & Paws</h1>
        <p className="text-white text-lg">Pet Donation Event</p>
      </div>

      <div className="relative w-full flex justify-center z-30 -mt-10">
        {/* donate อยู่ด้านหลัง */}
        <img
          src={donate}
          alt="donate"
          className="absolute top-1/2 -translate-y-1/2 w-full opacity-30 z-10"
        />

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
          <span className="text-amber-500">Just a little of your kindness</span> can{" "}
          <span className="text-amber-500">change the lives</span> of dogs and cats{" "}
          <span className="text-amber-500">waiting for hope.</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Your support helps us provide food, shelter, and love for stray dogs and cats.
        </p>
      </div>
      <DonationSection />
    </div>
  )
}

export default DonationPage
