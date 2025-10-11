import { useLocation } from "react-router-dom";

const DonateCancel = () => {
  const location = useLocation();
  const { checkout_url } = location.state || {};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Donation Cancelled</h1>
      <p className="mb-4">
        Your donation was not completed. You can continue the payment if you like.
      </p>

      {checkout_url && (
        <button
          onClick={() => window.location.href = checkout_url}
          className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Continue Payment
        </button>
      )}
    </div>
  );
};
export default DonateCancel;