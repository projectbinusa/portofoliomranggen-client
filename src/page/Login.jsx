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
  FormControlLabel
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

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button variant="outlined" fullWidth startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}>
              Sign in with Facebook
            </Button>
            <Button variant="outlined" fullWidth startIcon={<TwitterIcon sx={{ color: "#1DA1F2" }} />}>
              Sign in with Twitter
            </Button>
            <Button variant="outlined" fullWidth startIcon={<GoogleIcon sx={{ color: "#EA4335" }} />}>
              Sign in with Google
            </Button>
          </Stack>

          <Typography textAlign="center" sx={{ my: 3, fontWeight: "bold" }}>OR</Typography>

          <Stack direction="row" spacing={20} justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" component={Link} to="/register" color="primary">
              Don't have an account?
            </Typography>
          </Stack>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ✅ Tambahkan Checkbox "Keep me signed in" */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />}
                label="Keep me signed in"
              />
              <Typography variant="body2" component={Link} to="/forgot-password" color="primary">
                Forgot Password?
              </Typography>
            </Stack>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, padding: 1, backgroundColor: "#2D4EF5", '&:hover': { backgroundColor: "#1E3A8A" } }}>
              LOGIN
            </Button>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
