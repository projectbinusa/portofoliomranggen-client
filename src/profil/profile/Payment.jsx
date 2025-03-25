import { useState } from "react";
import {
  Box, Button, Grid, Stack, Typography, List, ListItemText, ListItemIcon, ListItemButton, Avatar
} from "@mui/material";
import { CardCoin, Lock, Profile, Setting3, Camera } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MainCard from "../../components/MainCard";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../tampilan/Navbar";
import ProfileCard from "./ProfileCard";

import masterCard from "../../images/master-card.png";
import paypal from "../../images/paypal.png";
import visaCard from "../../images/visa.png";

// Sample Payment Data
const paymentCards = [
  { id: 1, name: "Selena Litten", number: "1234567890123456", type: "master" },
  { id: 2, name: "Stebin Ben", number: "9876543210987654", type: "visa" },
];

export default function TabPayment() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(1); // Index menu aktif
  const [method, setMethod] = useState("card"); // Metode pembayaran
  const [selectedCard, setSelectedCard] = useState("2"); // ID kartu yang dipilih

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <Box sx={{ px: 3, mt: 5 }}>
          <ProfileCard />
        </Box>

        <Grid container spacing={1} padding={1} sx={{ mt: 1 }}>
          {/* Profile Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "#fff", boxShadow: 3, textAlign: "center", mt: 3 }}>
              <Stack spacing={2.5} alignItems="center">
                {/* Avatar */}
                <Avatar sx={{ width: 100, height: 100, border: "2px dashed #ccc", p: 0.5 }}>
                  <Camera style={{ fontSize: "2rem" }} />
                </Avatar>

                {/* User Info */}
                <Stack spacing={0.5} alignItems="center">
                  <Typography variant="h6" fontWeight={600}>Orang sukses</Typography>
                  <Typography color="text.secondary">Full Stack Developer</Typography>
                </Stack>

                {/* Menu Profile */}
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

          {/* Payment Content */}
          <Grid item xs={12} md={8}>
            <MainCard title="Payment">
              <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                {/* Payment Method Buttons */}
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color={method === "card" ? "primary" : "secondary"}
                    onClick={() => setMethod("card")}
                    startIcon={<img src={masterCard} alt="card" />}
                  >
                    Card
                  </Button>
                  <Button
                    variant="outlined"
                    color={method === "paypal" ? "primary" : "secondary"}
                    onClick={() => setMethod("paypal")}
                    startIcon={<img src={paypal} alt="paypal" />}
                  >
                    Paypal
                  </Button>
                </Stack>

                {/* Add New Card */}
                <Button variant="contained" onClick={() => setMethod("add")}>
                  Add New Card
                </Button>
              </Stack>

              {/* Card Selection */}
              {method === "card" && (
                <Box mt={3}>
                  <Grid container spacing={2}>
                    {paymentCards.map((card) => (
                      <Grid item xs={12} sm={6} key={card.id}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: selectedCard === card.id.toString() ? theme.palette.primary.light : "#fff",
                            boxShadow: 3,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "2px solid",
                            borderColor: selectedCard === card.id.toString() ? theme.palette.primary.main : "transparent",
                          }}
                          onClick={() => setSelectedCard(card.id.toString())}
                        >
                          <Stack spacing={0.5}>
                            <Typography variant="h6">{card.name}</Typography>
                            <Typography variant="subtitle1">
                              **** **** **** {card.number.slice(-4)}
                            </Typography>
                          </Stack>
                          <img
                            src={card.type === "master" ? masterCard : visaCard}
                            alt="card type"
                            style={{ width: 40, height: 30 }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Buttons */}
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
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
