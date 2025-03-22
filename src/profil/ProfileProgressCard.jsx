 import React from "react";
 import Sidebar from "../components/Sidebar";
 import Navbar from "../tampilan/Navbar";
    const ProfileProgressCard = ({
        percentage = 30,
        title = "Edit Your Profile",
        subtitle = "Complete your profile to unlock all features",
        buttonText = "Edit Your Profile",
        onButtonClick
      }) => {
      
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <div className="bg-[#e9f0fe] p-6 rounded-2xl shadow-md flex items-center justify-between relative overflow-hidden">
                {/* Background pattern (SVG style) */}
                <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                    fill="#d0e0fc"
                    fillOpacity="1"
                    d="M0,160L40,165.3C80,171,160,181,240,165.3C320,149,400,107,480,85.3C560,64,640,64,720,85.3C800,107,880,149,960,160C1040,171,1120,149,1200,128C1280,107,1360,85,1400,74.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    ></path>
                </svg>
                </div>

                {/* Progress Circle */}
                <div className="relative z-10 flex items-center gap-4">
                <div className="w-20 h-20 relative">
                    <svg className="w-full h-full">
                    <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#4f8ff0"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 30}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                    />
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-black text-sm font-bold"
                    >
                        {percentage}%
                    </text>
                    </svg>
                </div>

                {/* Title & Subtitle */}
                <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                    {title}
                    </h3>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
                </div>

                {/* Button */}
                <button
                onClick={onButtonClick}
                className="z-10 bg-[#4f8ff0] hover:bg-[#3b79db] text-white font-medium py-2 px-4 rounded-lg transition-all"
                >
                {buttonText}
                </button>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default ProfileProgressCard;
