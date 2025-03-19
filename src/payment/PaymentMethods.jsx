import { FaCreditCard, FaPaypal } from "react-icons/fa";

export default function PaymentMethods({ selectedMethod, setSelectedMethod }) {
  return (
    <div className="flex gap-4">
      <button
        className={`flex items-center px-4 py-2 rounded-lg border ${
          selectedMethod === "Card" ? "bg-blue-100 text-blue-600" : "bg-white"
        }`}
        onClick={() => setSelectedMethod("Card")}
      >
        <FaCreditCard className="mr-2" /> Card
      </button>

      <button
        className={`flex items-center px-4 py-2 rounded-lg border ${
          selectedMethod === "Paypal" ? "bg-blue-100 text-blue-600" : "bg-white"
        }`}
        onClick={() => setSelectedMethod("Paypal")}
      >
        <FaPaypal className="mr-2" /> PayPal
      </button>
    </div>
  );
}
