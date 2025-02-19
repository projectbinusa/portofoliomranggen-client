import { useState } from "react";
import axios from "axios";

const UploadFoto = ({ onUploadSuccess, setIsUploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // Menandai proses upload sedang berlangsung
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:4321/api/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageUrl = response.data.imageUrl;
      setImageUrl(uploadedImageUrl); // Menyimpan URL foto
      setPreviewUrl(""); // Menghapus preview setelah upload selesai

      // Mengirimkan URL foto ke parent component
      onUploadSuccess(uploadedImageUrl);

      // Menandai bahwa upload selesai
      setIsUploading(false);

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover mb-2" />
      ) : (
        previewUrl && <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover mb-2" />
      )}

      <div className="flex items-center gap-2">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded-md" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFoto;
