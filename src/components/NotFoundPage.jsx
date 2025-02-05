import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-red-900 text-white text-center p-6">
            <FaExclamationTriangle size={80} className="text-yellow-300 mb-6" />
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl mb-4">Oops! Page Not Found</h2>
            <p className="text-lg mb-6">The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="bg-yellow-300 text-red-800 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
