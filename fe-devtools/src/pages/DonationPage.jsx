import a4 from "../assets/donation/a4.png"
import heart from "../assets/donation/heart.png"
import donate from "../assets/donation/donate.png"
import DonationSection from "../components/DonationSection"
import dog_cat from "../assets/donation/dog_cat.jpg"
const DonationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-400 relative pt-25">
      <div className="text-center relative z-20">
        <img src={heart} alt="heart" className="w-[55px] mx-auto mb-2" />
        <h1 className="text-5xl font-bold text-white">Hearts & Paws</h1>
        <p className="text-white text-lg">Pet Donation Event</p>
      </div>

      <div className="relative w-full flex justify-center z-30 -mt-10">
        <img
          src={donate}
          alt="donate"
          className="absolute top-1/2 -translate-y-1/2 w-full opacity-30 z-10"
        />
        <img
          src={a4}
          alt="animal"
          className="w-[630px] max-w-full object-contain relative z-20"
        />
      </div>

      <div className="bg-white w-full text-center px-6 py-6 relative z-10">
        <h1 className="text-3xl font-bold leading-relaxed text-gray-800">
          <span className="text-amber-500">Just a little of your kindness</span> can{" "}
          <span className="text-amber-500">change the lives</span> of dogs and cats{" "}
          <span className="text-amber-500">waiting for hope.</span>
        </h1>
        <p className="mt-1 font-semibold text-gray-500">
          Your support helps us provide food, shelter, and love for stray dogs and cats.
        </p>
      </div>
      <section id="donation" className="py-20 flex sm:flex-col lg:px-32 bg-gradient-to-b from-white to-amber-100 w-full">
        <div className="max-w-fit mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Donate to Help Stray Animals</h2>
            <p className="text-2xl font-semibold text-gray-500">
              Your donation provides food, medicine, and safe shelter for stray dogs and cats.
            </p>
          </div>

          <div className="flex justify-between gap-10">
            <div className="rounded-3xl p-12 w-full flex bg-white flex-col gap-8 shadow-2xl">
              <DonationSection />
            </div>

            <div className="rounded-3xl shadow-2xl p-6 bg-white md:p-10 lg:max-w-1/3 flex flex-col gap-6 max-h-fit">
              <img src={dog_cat} alt="Stray Animals" className="rounded-2xl object-cover" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Stories of Stray Animals</h3>

              <div className="flex flex-col gap-7">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">Stray Dog from the City</h4>
                  <p className="text-gray-600 text-sm">
                    This dog was found in a small alley in Bangkok. Our team has been providing food and water daily until it became familiar with us.
                    Your donation helps us care for and find new homes for stray dogs like this.
                  </p>
                </div>

                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">Abandoned Cats</h4>
                  <p className="text-gray-600 text-sm">
                    Many cats have been abandoned in communities. Our team provides food, vaccines, and temporary shelter.
                    Your donation ensures their safety and good health.
                  </p>
                </div>

                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">Spaying and Neutering</h4>
                  <p className="text-gray-600 text-sm">
                    Spaying and neutering helps control the stray animal population, reduces their suffering, and prevents disease.
                    Every donation helps this program continue.
                  </p>
                </div>

                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">The Importance of Donations</h4>
                  <p className="text-gray-600 text-sm">
                    Your donations are used to buy food, medicine, vaccines, and animal care supplies.
                    Every baht matters to the lives of stray animals and brings them hope.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-amber-400 text-white py-8 text-center w-full">
        <p className="text-lg font-semibold">© 2025 RescuePaw | All Rights Reserved</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-indigo-800">Facebook</a>
          <a href="#" className="hover:text-indigo-800">Instagram</a>
          <a href="#" className="hover:text-indigo-800">Contact Us</a>
        </div>
      </footer>

    </div>
  )
}

export default DonationPage
