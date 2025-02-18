module.exports = {
  darkMode: "class", // ✅ Aktifkan dark mode dengan class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Tambahkan Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")], // Pastikan Flowbite tetap ada
};
