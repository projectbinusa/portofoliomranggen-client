import React from "react";
import { Container, Typography, Button, Box, Stepper, Step, StepLabel, Card, CardContent, Breadcrumbs } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";

const steps = ["Cart", "Shipping Information", "Payment"];

const Checkout = () => {
  return (

    <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-[250px] relative">
              <Sidebar />
            </div>
        
              {/* Main Content */}
              <div className="flex-1">
                <Navbar />
                <div className="p-6 flex gap-6 mt-6"> 
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Link underline="hover" color="inherit" href="/produk">Produk</Link>
        <Typography color="textPrimary">Checkout</Typography>
      </Breadcrumbs>
      
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "left" }}>
        Checkout
      </Typography>
      
      {/* Stepper dalam Card */}
      <Card sx={{ mb: 4, p: 1, boxShadow: 3, maxWidth: "100%", mx: "auto" }}>
        <CardContent>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel sx={{ "& .MuiStepLabel-label": { color: index === 0 ? "#1976d2" : "#9e9e9e", fontWeight: index === 0 ? "bold" : "normal" } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
      
      {/* Gambar Keranjang dan Tombol dalam Card */}
      <Card sx={{ p: 6, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <ShoppingCartIcon sx={{ fontSize: 100, color: "#1976d2" }} />
          <Typography variant="h6" fontWeight="bold" mt={2}>
            Add items to your cart
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Explore around to add items in your shopping bag.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Explore Your Bag
            </Button>
            <Button variant="contained" color="error" startIcon={<ShoppingCartIcon />}>
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
     </div>
    </div>
    </div>
  );
};

export default Checkout;
