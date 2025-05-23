import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Star, StarHalf } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import image1 from '../images/camera-removebg-preview.png';
import image2 from '../images/mackbok-removebg-preview.png';
import image3 from '../images/jam-removebg-preview.png';
import image4 from '../images/phone-removebg-preview.png';
import image5 from '../images/lady_dior-removebg-preview.png';
import image6 from '../images/skintific-removebg-preview.png';
import image7 from '../images/sunscreen-removebg-preview.png';
import image8 from '../images/diorrrrr_lip-removebg-preview.png';
import image9 from '../images/cusion-removebg-preview.png';
import image10 from '../images/facial_wash-removebg-preview.png';
import image11 from '../images/eyeshadow-removebg-preview.png';

export const products = [
  {
    id: 1,
    name: "Canon EOS 1500D",
    brand: "Canon",
    category: "Electronics",
    gender: "Male",
    price: 12.99,
    oldPrice: 15.99,
    rating: 3.5,
    discount: 30,
    image: image1,
  },
  {
    id: 2,
    name: "Apple MacBook Pro",
    brand: "Apple",
    category: "Electronics",
    gender: "Male",
    price: 14.59,
    oldPrice: 16.99,
    rating: 4.5,
    discount: 20,
    image: image2,
  },
  {
    id: 3,
    name: "Luxury Watch",
    brand: "Centrix",
    category: "Fashion",
    gender: "Male",
    price: 29.99,
    oldPrice: 36.0,
    rating: 4.5,
    discount: 20,
    image: image3,
  },
  {
    id: 4,
    name: "Iphone 15 Pro Max",
    brand: "Apple",
    category: "Electronics",
    gender: "Female",
    price: 8.99,
    oldPrice: 10.55,
    rating: 5.0,
    discount: 20,
    image: image4,
  },
  {
    id: 5,
    name: "Lady Dior Jelly Black",
    brand: "Dior",
    category: "Fashion",
    gender: "Female",
    price: 50.99,
    oldPrice: 70.55,
    rating: 5.0,
    discount: 40,
    image: image5,
  },
  {
    id: 6,
    name: "Cover All Perfect Cushion",
    brand: "Skintific",
    category: "Beauty",
    gender: "Female",
    price: 5.99,
    oldPrice: 10.55,
    rating: 5.0,
    discount: 50,
    image: image6,
  },
  {
    id: 7,
    name: "5X Ceramide Serum Sunscreen",
    brand: "Skintific",
    category: "Beauty",
    gender: "Female",
    price: 50.99,
    oldPrice: 70.55,
    rating: 5.0,
    discount: 40,
    image: image7,
  },
  {
    id: 8,
    name: "Dior Addict Lip Glow001",
    brand: "Dior",
    category: "Beauty",
    gender: "Female",
    price: 35.89,
    oldPrice: 45.5,
    rating: 5.0,
    discount: 10,
    image: image8,
  },
  {
    id: 9,
    name: "Dior Forever Perfect Cushion SPF 35 PA+++",
    brand: "Dior",
    category: "Beauty",
    gender: "Female",
    price: 20.99,
    oldPrice: 74.45,
    rating: 5.0,
    discount: 20,
    image: image9,
  },
  {
    id: 10,
    name: "Facial Wash G2G Acne",
    brand: "Glad To Glow",
    category: "Beauty",
    gender: "Female",
    price: 4.59,
    oldPrice: 7.47,
    rating: 5.0,
    discount: 30,
    image: image10,
  },
  {
    id: 11,
    name: "Eyeshadow Dior",
    brand: "Dior",
    category: "Beauty",
    gender: "Female",
    price: 5.75,
    oldPrice: 15.25,
    rating: 4.5,
    discount: 40,
    image: image11,
  },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);  // Gunakan useNavigate
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortBy, setSortBy] = useState("");
  
  
  // Fungsi reset filter
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedGender("All");
    setSearchQuery("");
    setSortBy("");
  };

  const toggleFavorite = (product) => {
    const isFavorited = favorites.some((fav) => fav.id === product.id);
  
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Removed from favourites",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#dc3545", // Warna merah untuk dihapus
        color: "#fff",
        customClass: {
          popup: "swal2-toast-custom",
        },
      });
    } else {
      setFavorites([...favorites, product]);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Added to favourites",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#28a745", // Warna hijau untuk ditambahkan
        color: "#fff",
        customClass: {
          popup: "swal2-toast-custom",
        },
      });
    }
  };
  

  const filteredProducts = products.filter((product) => {
    // Filter berdasarkan Gender
    if (selectedGender !== "All" && product.gender !== selectedGender && product.gender !== "") {
      return false;
    }

    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }

    // Filter berdasarkan Search Query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price; // Termurah - Termahal
    if (sortBy === "price-high") return b.price - a.price; // Termahal - Termurah
    if (sortBy === "rating-high") return b.rating - a.rating; // Rating Tertinggi - Terendah
    return 0;
  });

  const handleAddToCart = () => {
    navigate("/checkout"); 
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

          {/* Sidebar Filter */}
          <div className="w-full md:w-[220px] border p-4 rounded shadow-lg bg-white space-y-4 h-auto md:h-[500px] md:mr-6">
          
            {/* Filter Title */}
            <h2 className="font-bold text-lg pb-2 border-b">Filter</h2>

            {/* Active Filters */}
            <div>
              <h3 className="font-semibold text-sm">Active Filters</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedGender !== "All" && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded flex items-center gap-1">
                    {selectedGender}{" "}
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => setSelectedGender("All")}
                    />
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded flex items-center gap-1">
                    {selectedCategory}{" "}
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("All")}
                    />
                  </span>
                )}
              </div>
              {(selectedGender !== "All" || selectedCategory !== "All") && (
                <button
                  onClick={resetFilters}
                  className="text-red-500 text-xs underline mt-2"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Gender</h3>
              {["Male", "Female", "Kids"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 cursor-pointer mb-1"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={selectedGender === gender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Categories</h3>
              {[
                "All",
                "Electronics",
                "Fashion",
                "Beauty",
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer mb-1"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="w-3/4">
            <div className="border p-4 rounded shadow-lg mb-4 flex gap-4 items-center bg-white">
              <div className="flex items-center  rounded px-2 py-1 w-full">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Product"
                  className="ml-2 outline-none w-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
               {/* Dropdown Sortir */}
               <select
                className="border px-2 py-1 rounded text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-low">Harga: Termurah - Termahal</option>
                <option value="price-high">Harga: Termahal - Termurah</option>
                <option value="rating-high">Rating: Tertinggi - Terendah</option>
              </select>
            </div>


            {/* Grid Produk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                key={product.id}
                className="relative border p-4 rounded shadow-lg bg-white cursor-pointer">

                   {/* Tombol Favorite */}
                   <button 
                    className="absolute top-2 left-2 bg-white border rounded-full p-2 shadow"
                    onClick={() => toggleFavorite(product)}
                  >
                    {favorites.some((fav) => fav.id === product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>

                {/* Discount Badge */}
                  <span className="absolute top-2 right-2 bg-green-200 text-green-800 px-2 py-1 text-xs rounded">
                    {product.discount}%
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-white"
                  />
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="text-red-500 font-bold">
                    ${product.price}{" "}
                    <span className="text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  </p>
                  <p className="text-yellow-500 flex items-center gap-1">
                    {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500" />
                    ))}
                    {product.rating % 1 >= 0.5 && <StarHalf className="w-5 h-5 fill-yellow-500" />}
                    <span className="text-black text-sm">({product.rating})</span>
                  </p>
                  <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                      onClick={handleAddToCart} // Navigasi saat diklik
                    >
                      Add to Cart
                   </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}