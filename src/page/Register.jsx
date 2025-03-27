import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_REGISTER } from "../utils/BaseUrl";
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
import { useForm } from "react-hook-form"; 
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FcGoogle } from "react-icons/fc"; // Ikon Google dengan warna asli

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_REGISTER}/register`, {
        email: data.email,
        password: data.password,
        username: `${data.firstName} ${data.lastName}`,
        role: "ADMIN",
      });

      if (response.status === 201) {
        Swal.fire("Success!", "Pendaftaran berhasil.", "success");
        addNotification("Pendaftaran berhasil!", "success");
        navigate("/login");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Terjadi kesalahan.", "error");
      addNotification("Pendaftaran gagal. Silakan coba lagi.", "error");
    }
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={500}>
          <Card sx={{ padding: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {/* Logo */}
              <Typography variant="h4" textAlign="center" fontWeight="bold" color="#2D4EF5" gutterBottom>
                Able <Typography component="span" color="#6B7280" variant="caption" sx={{ fontSize: "0.6rem" }}>pro</Typography>
              </Typography>

              {/* Button Login Social */}
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {[ 
                  { label: "Sign In With Facebook", icon: <FacebookIcon sx={{ color: "#1877F2" }} /> },
                  { label: "Sign In With Twitter", icon: <TwitterIcon sx={{ color: "#1DA1F2" }} /> },
                  { label: "Sign In With Google", icon: <FcGoogle size={24} /> } // Menggunakan FcGoogle dari react-icons
                ].map((btn, index) => (
                  <Button key={index} variant="outlined" fullWidth startIcon={btn.icon} sx={{ borderRadius: 2, textTransform: "none" }}>
                    {btn.label}
                  </Button>
                ))}
              </Stack>

              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Sign up</Typography>
                <Typography variant="body2" component={Link} to="/login" sx={{ color: "primary.main", textDecoration: "none", fontWeight: "bold" }}>
                  Already have an account?
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Section */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      type="text"
                      variant="outlined"
                      {...register('firstName', { required: "First Name is required" })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      type="text"
                      variant="outlined"
                      {...register('lastName', { required: "Last Name is required" })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                </Grid>

                {/* Company */}
                <TextField
                  fullWidth
                  label="Company"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  {...register('company')}
                />

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  {...register('email', { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                {/* Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  {...register('password', { required: "Password is required" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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

                {/* Submit Button */}
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, padding: 1.5 }}>
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
