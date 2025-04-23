import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const resetPassword = async (email) => {
    try {
      // Panggil API reset password (sesuaikan dengan backend)
      const response = await fetch("http://localhost:4321/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to send reset email");

      // Berhasil, arahkan ke halaman CheckMail
      navigate("/check-mail");
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return { resetPassword };
};
