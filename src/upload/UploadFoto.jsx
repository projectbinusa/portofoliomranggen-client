import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

    setIsUploading(true);

    // Menampilkan notifikasi proses upload
    Swal.fire({
      title: "Mengunggah...",
      text: "Harap tunggu, foto sedang diunggah.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:4321/api/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageUrl = response.data.imageUrl;
      setImageUrl(uploadedImageUrl);
      setPreviewUrl("");

      onUploadSuccess(uploadedImageUrl);
      setIsUploading(false);

      // Menampilkan notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Foto berhasil diunggah.",
        confirmButtonColor: "#6C5DD3",
      });

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);

      // Menampilkan notifikasi error
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengunggah foto.",
        confirmButtonColor: "#d33",
      });
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
