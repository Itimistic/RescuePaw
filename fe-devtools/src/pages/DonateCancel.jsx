const DonateCancel = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center relative pt-25">
            <div className="rounded-3xl py-12 px-28 shadow-2xl">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Sorry!</h1>
                <div className="cursor-pointer mt-7 w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-5 px-10 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition">
                    <a href="/donation">Back to donate</a>
                </div>
            </div>
        </div>
    );
}
export default DonateCancel