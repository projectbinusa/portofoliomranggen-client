import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_LOGIN } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthWrapper from "../components/AuthWrapper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          <Card sx={{ padding: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h3" textAlign="center" gutterBottom>
                Able <Typography component="span" color="primary" variant="h5">pro</Typography>
              </Typography>
              
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Button variant="outlined" fullWidth startIcon={<FacebookIcon />} sx={{ padding: 1 }}>
                  Sign In With Facebook
                </Button>
                <Button variant="outlined" fullWidth startIcon={<TwitterIcon />} sx={{ padding: 1 }}>
                  Sign In With Twitter
                </Button>
                <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ padding: 1 }}>
                  Sign In With Google
                </Button>
              </Stack>

              <Typography textAlign="center" sx={{ my: 3, fontWeight: "bold" }}>OR</Typography>

              <Typography variant="h4" textAlign="center" gutterBottom>
                Login
              </Typography>
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
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, padding: 1.5 }}>
                  LOGIN
                </Button>
              </form>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                <Typography variant="body2" component={Link} to="/auth/forgot-password" color="primary">
                  Forgot Password?
                </Typography>
                <Typography variant="body2" component={Link} to="/register" color="primary">
                  Don't have an account? Register
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
