export const ThemeMode = {
    LIGHT: "light",
    DARK: "dark"
  };
  
  export const API_BASE_URL = "http://localhost:4321/api"; // Ganti dengan URL API Anda
  
  export const APP_DEFAULT_PATH = "/dashboard"; // ✅ Pastikan ini ada dalam ekspor default
  
  export const AUTH_CONFIG = {
    TOKEN_STORAGE_KEY: "auth_token",
    REFRESH_TOKEN_KEY: "refresh_token"
  };
  
  // ✅ Definisikan variabel config dengan APP_DEFAULT_PATH
  const config = {
    themeMode: ThemeMode.LIGHT,
    apiBaseUrl: API_BASE_URL,
    defaultPath: APP_DEFAULT_PATH, // ✅ Tambahkan ini agar bisa digunakan di tempat lain
    authConfig: AUTH_CONFIG
  };
  
  export default config;
  