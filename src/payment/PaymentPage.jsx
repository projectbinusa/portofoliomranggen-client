import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import PaymentMethods from "../payment/PaymentMethods";
import PaymentCard from "../payment/PaymentCard";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [paymentCards, setPaymentCards] = useState([
    { id: 1, name: "Selena Litten", last4: "3456", type: "MasterCard" },
    { id: 2, name: "Stebin Ben", last4: "7654", type: "Visa" },
  ]);
  const [selectedCard, setSelectedCard] = useState(paymentCards[1]?.id || null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex justify-center p-6">
          <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            {/* Pilihan Metode Pembayaran */}
            <PaymentMethods selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />

            {/* Daftar Kartu */}
            <div className="mt-4 space-y-4">
              {paymentCards.map((card) => (
                <PaymentCard
                  key={card.id}
                  card={card}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />
              ))}
            </div>

            {/* Tombol Simpan & Tambah Kartu */}
            <div className="mt-6 flex justify-between">
              <button className="bg-gray-200 px-4 py-2 rounded-md">Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
