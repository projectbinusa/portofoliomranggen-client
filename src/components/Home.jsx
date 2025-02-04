import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to TicketMaster
      </motion.h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <div>
          <p className="text-lg text-gray-600 mb-4">
            Find and book tickets for your favorite events, concerts, and shows!
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Browse Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
