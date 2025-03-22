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

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_REGISTER}/register`, {
        email: formData.email,
        password: formData.password,
        username: formData.name,
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
              <Typography variant="h3" textAlign="center" gutterBottom>
                Able <Typography component="span" color="primary" variant="h5">pro</Typography>
              </Typography>
              <Typography variant="h4" textAlign="center" gutterBottom>
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  REGISTER
                </Button>
              </form>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                <Typography variant="body2" component={Link} to="/login" color="primary">
                  Sudah punya akun? Login di sini
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
