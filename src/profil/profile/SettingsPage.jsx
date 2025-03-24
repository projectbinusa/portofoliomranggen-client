import { useState } from "react";
import { 
  Avatar, Box, Button, Grid, Stack, Switch, Typography, 
  List, ListItemText, ListItemIcon, ListItemButton, 
  TextField, FormLabel
} from "@mui/material";
import { 
  DocumentLike, Sms, Translate, Setting3, Profile, CardCoin, Lock, Camera, 
  Google, Facebook, Apple 
} from "iconsax-react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MainCard from "../../components/MainCard";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../tampilan/Navbar";
import ProfileCard from "./ProfileCard"; 

export default function TabSettings() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(["oc", "usn", "lc"]);
  const [avatar, setAvatar] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(3);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  };

  const setSelectedImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
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
                  <Typography variant="h6" fontWeight={600}>Naja Imut Menggemaskan</Typography>
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

          <Grid item xs={12} md={8}>
            <MainCard title="Settings">
              <List>
                {["oc", "sen", "usn", "lc"].map((item, index) => (
                  <ListItemButton key={item} divider>
                    <ListItemIcon sx={{ color: "primary.main", mr: 2 }}>
                      {index === 0 ? <DocumentLike /> : index === 1 ? <Sms /> : index === 2 ? <Sms /> : <Translate />}
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="h5">{item === "oc" ? "Order Confirmation" : item === "sen" ? "Setup Email Notification" : item === "usn" ? "Update System Notification" : "Language Change"}</Typography>} secondary="Description here" />
                    <Switch edge="end" onChange={handleToggle(item)} checked={checked.includes(item)} />
                  </ListItemButton>
                ))}
              </List>
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary">Cancel</Button>
                <Button variant="contained">Save</Button>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
