import { FaTrash, FaCcVisa, FaCcMastercard } from "react-icons/fa";

export default function PaymentCard({ card, selectedCard, setSelectedCard }) {
  const getCardIcon = (type) => {
    return type === "Visa" ? <FaCcVisa className="text-blue-600 text-2xl" /> : <FaCcMastercard className="text-red-600 text-2xl" />;
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg ${
        selectedCard === card.id ? "border-blue-500 bg-blue-50" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <input
          type="radio"
          name="card"
          checked={selectedCard === card.id}
          onChange={() => setSelectedCard(card.id)}
          className="mr-3"
        />
        <div>
          <p className="font-semibold">{card.name}</p>
          <p className="text-gray-500">**** **** **** {card.last4}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {getCardIcon(card.type)}
        <button className="text-gray-500 hover:text-red-600">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
