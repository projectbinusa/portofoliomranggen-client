import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_LOGIN } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthWrapper from "../components/AuthWrapper";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_LOGIN,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("adminId", response.data.data.id);
        localStorage.setItem("adminRole", response.data.data.role);

        if (keepSignedIn) {
          localStorage.setItem("keepSignedIn", "true");
        }

        window.dispatchEvent(new Event("authChange"));
        addNotification("Login berhasil! Selamat datang kembali.", "success");
        Swal.fire("Success!", "Login berhasil.", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      addNotification("Login gagal. Periksa kembali email & password.", "error");
      Swal.fire(
        "Error",
        error.response?.data?.message || "Login gagal. Coba lagi.",
        "error"
      );
    }
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={500}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="#2D4EF5" gutterBottom>
            Able <Typography component="span" color="#6B7280" variant="caption" sx={{ fontSize: "0.6rem" }}>pro</Typography>
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 5 }}>
            {[
              { label: "Sign in with Facebook", icon: <FacebookIcon sx={{ color: "#1877F2" }} />, color: "#2D4EF5" },
              { label: "Sign in with Twitter", icon: <TwitterIcon sx={{ color: "#1DA1F2" }} />, color: "#2D4EF5" },
              { label: "Sign in with Google", icon: <GoogleIcon sx={{ color: "#EA4335" }} />, color: "#2D4EF5" }
            ].map((btn, index) => (
              <Button
                 key={index}
                 variant="outlined"
                 fullWidth
                 startIcon={btn.icon}
                 onClick={() => setClickedButton(index)}
                 sx={{
                 borderRadius: 2,
                 border: clickedButton === index ? `1px solid ${btn.color}` : "0.5px solid transparent",
                 backgroundColor: clickedButton === index ? "#E0E0E0" : "#F5F5F5",
                 transition: "border 0.3s, background-color 0.3s, color 0.3s",
                 textTransform: "none",
                 color: clickedButton === index ? "#2D4EF5" : "#616161", // Warna teks abu-abu lebih menonjol
               }}
                >
                {btn.label}
             </Button>
            ))}
          </Stack>

          <Divider sx={{ my: 5 }}>OR</Divider>

          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ my: 2.5 }}>
            <Typography variant="h5" fontWeight="bold">Login</Typography>
            <Typography variant="body2" component={Link} to="/register" color="primary">
              Don't have an account?
            </Typography>
          </Stack>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                       {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />}
                label="Keep me signed in"
              />
              <Typography variant="body2" component={Link} to="/forgot-password" color="black">
                Forgot Password?
              </Typography>
            </Stack>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, padding: 1.5, backgroundColor: "#2D4EF5", transition: "background-color 0.3s", '&:hover': { backgroundColor: "#1B3EC2" }, fontWeight: "bold", borderRadius: 2 }}>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
