import { useState } from "react";
import axios from "axios";

const UploadFoto = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");  // Menyimpan URL gambar yang di-upload

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Preview gambar sebelum di-upload
  };

  const handleUpload = async () => {
    if (!selectedFile) return; // Pastikan ada file yang dipilih

    const formData = new FormData();
    formData.append("file", selectedFile); // Menambahkan file ke form data

    try {
      // Mengirim file ke server
      const response = await axios.post("http://localhost:4321/api/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Ambil URL gambar yang dikembalikan dari server
      const uploadedImageUrl = response.data.imageUrl;

      // Set imageUrl state untuk menampilkan gambar
      setImageUrl(uploadedImageUrl);
      onUploadSuccess(uploadedImageUrl); // Panggil fungsi parent jika perlu
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {previewUrl && <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover" />}
      
      {/* Menampilkan gambar yang telah di-upload */}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
        </div>
      )}
      
      <input type="file" onChange={handleFileChange} className="mt-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFoto;
