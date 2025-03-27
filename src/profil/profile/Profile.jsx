import Sidebar from "../../components/Sidebar";
import Navbar from "../../tampilan/Navbar";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Stack,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  FormLabel,
  TextField,
} from "@mui/material";

// assets
import { Apple, Camera, Facebook, Google } from "iconsax-react";
import MoreVert from "@mui/icons-material/MoreVert";

// import ProfileTab component
import ProfileTab from "./ProfileTab";

export default function ProfileTabs({ focusInput }) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            maxWidth: 320,
            ml: 3, // Geser ke kiri dekat sidebar
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              color="inherit"
              onClick={handleClick}
              sx={{ transform: "rotate(90deg)" }}
            >
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                component={Link}
                to="/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>

          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avatar"
              sx={{
                position: "relative",
                borderRadius: "50%",
                overflow: "hidden",
                "&:hover .MuiBox-root": { opacity: 1 },
                cursor: "pointer",
              }}
            >
              <Avatar
                alt="User Avatar"
                src={avatar}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px dashed #ccc",
                  p: 0.5,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.65)",
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <Camera style={{ color: "#fff", fontSize: "2rem" }} />
                  <Typography sx={{ color: "#fff" }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avatar"
              sx={{ display: "none" }}
              onChange={(e) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Stebin Ben
              </Typography>
              <Typography color="text.secondary">
                Full Stack Developer
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Google variant="Bold" color={theme.palette.error.main} />
              <Facebook variant="Bold" color="#1877F2" />
              <Apple variant="Bold" color="#000" />
            </Stack>
          </Stack>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={4}>
              <Stack spacing={0.5} alignItems="center">
                <Typography variant="h6">86</Typography>
                <Typography color="text.secondary">Post</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={0.5} alignItems="center">
                <Typography variant="h6">40</Typography>
                <Typography color="text.secondary">Project</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={0.5} alignItems="center">
                <Typography variant="h6">4.5K</Typography>
                <Typography color="text.secondary">Members</Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* Tambahkan ProfileTab */}
          <Box sx={{ mt: 3 }}>
            <ProfileTab />
          </Box>
        </Box>
      </div>
    </div>
  );
}

ProfileTabs.propTypes = { focusInput: PropTypes.func };
