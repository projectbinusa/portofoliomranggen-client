import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Material-UI components
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Avatar,
  FormLabel,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Icons
import { Apple, Facebook, Google, Camera, CardCoin, Lock, Profile, Setting3 } from "iconsax-react";

// Custom components
import Sidebar from "../../components/Sidebar";
import Navbar from "../../tampilan/Navbar";
import ProfileCard from "./ProfileCard"; // Tambahkan ini

export default function ChangePasswordPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(2); // Set default ke "Change Password"
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Profile Card di Atas */}
        <Box sx={{ px: 3, mt: 5 }}>
          <ProfileCard />
        </Box>

        <Grid container spacing={1} padding={1} sx={{ mt: 1 }}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "#fff", boxShadow: 3, textAlign: "center", mt: 3 }}>
              <Stack spacing={2.5} alignItems="center">
                <FormLabel htmlFor="change-avatar" sx={{ position: "relative", borderRadius: "50%", overflow: "hidden", "&:hover .MuiBox-root": { opacity: 1 }, cursor: "pointer" }}>
                  <Avatar alt="User Avatar" src={avatar} sx={{ width: 100, height: 100, border: "2px dashed #ccc", p: 0.5 }} />
                  <Box sx={{ position: "absolute", top: 0, left: 0, backgroundColor: "rgba(0,0,0,.65)", width: "100%", height: "100%", opacity: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Stack spacing={0.5} alignItems="center">
                      <Camera style={{ color: "#fff", fontSize: "2rem" }} />
                      <Typography sx={{ color: "#fff" }}>Upload</Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <TextField type="file" id="change-avatar" sx={{ display: "none" }} onChange={(e) => setSelectedImage(e.target.files?.[0])} />

                <Stack spacing={0.5} alignItems="center">
                  <Typography variant="h6" fontWeight={600}>Orang sukses</Typography>
                  <Typography color="text.secondary">Full Stack Developer</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Google variant="Bold" color={theme.palette.error.main} />
                  <Facebook variant="Bold" color="#1877F2" />
                  <Apple variant="Bold" color="#000" />
                </Stack>

                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={4}>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h6">12</Typography>
                      <Typography color="text.secondary">Post</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h6">91</Typography>
                      <Typography color="text.secondary">Project</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h6">7.5K</Typography>
                      <Typography color="text.secondary">Members</Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <List component="nav" sx={{ p: 0, width: "100%" }}>
                  <ListItemButton selected={selectedIndex === 0} onClick={() => navigate("/page-profil")}>
                    <ListItemIcon><Profile size={18} /></ListItemIcon>
                    <ListItemText primary="Personal Information" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 1} onClick={() => navigate("/payment")}>
                    <ListItemIcon><CardCoin size={18} /></ListItemIcon>
                    <ListItemText primary="Payment" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 2} onClick={() => navigate("/password")}>
                    <ListItemIcon><Lock size={18} /></ListItemIcon>
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 3} onClick={() => navigate("/settings")}>
                    <ListItemIcon><Setting3 size={18} /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </List>
              </Stack>
            </Box>
          </Grid>

          {/* Change Password Form */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "#fff", boxShadow: 3, mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2} align="left">
                Change Password
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Stack spacing={2}>
                    <TextField label="Old Password" type="password" fullWidth variant="outlined" />
                    <TextField label="New Password" type="password" fullWidth variant="outlined" />
                    <TextField label="Confirm Password" type="password" fullWidth variant="outlined" />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">New password must contain:</Typography>
                  <Typography variant="body2">- At least 8 characters</Typography>
                  <Typography variant="body2">- At least 1 lowercase letter (a-z)</Typography>
                  <Typography variant="body2">- At least 1 uppercase letter (A-Z)</Typography>
                  <Typography variant="body2">- At least 1 number (0-9)</Typography>
                  <Typography variant="body2">- At least 1 special character</Typography>
                </Grid>
              </Grid>

              {/* Buttons Cancel & Save */}
              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button variant="outlined" color="secondary">Cancel</Button>
                <Button variant="contained" color="primary">Save</Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
