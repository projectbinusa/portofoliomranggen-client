import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../tampilan/Navbar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MainCard from "../../components/MainCard";
import FloatingCart from "../../components/FloatingCart";
import ProdukFeatures from "./ProdukFeatures";
import ProdukImages from "./ProdukImages";
import ProdukInfo from "./ProdukInfo";
import ProdukReview from "./ProdukReview";
import ProdukSpecifications from "./ProdukSpecifications";
import ProdukRelated from "./ProdukRelated";

// Import gambar produk
import image1 from "../../images/camera-removebg-preview.png";
import image2 from "../../images/mackbok-removebg-preview.png";
import image3 from "../../images/jam-removebg-preview.png";
import image4 from "../../images/phone-removebg-preview.png";
import image5 from "../../images/lady_dior-removebg-preview.png";
import image6 from "../../images/skintific-removebg-preview.png";
import image7 from "../../images/sunscreen-removebg-preview.png";
import image8 from "../../images/diorrrrr_lip-removebg-preview.png";
import image9 from "../../images/cusion-removebg-preview.png";

// Data produk
const produkList = [
  {
    id: 1,
    name: "Canon EOS 1500D",
    brand: "Canon",
    category: "Electronics",
    gender: "Male",
    price: 12.99,
    oldPrice: 15.99,
    rating: 3.5,
    discount: 30,
    image: image1,
  },
  {
    id: 2,
    name: "Apple MacBook Pro",
    brand: "Apple",
    category: "Electronics",
    gender: "Male",
    price: 14.59,
    oldPrice: 16.99,
    rating: 4.5,
    discount: 20,
    image: image2,
  },
  {
    id: 3,
    name: "Luxury Watch",
    brand: "Centrix",
    category: "Fashion",
    gender: "Male",
    price: 29.99,
    oldPrice: 36.0,
    rating: 4.5,
    discount: 20,
    image: image3,
  },
  {
    id: 4,
    name: "Iphone 15 Pro Max",
    brand: "Apple",
    category: "Electronics",
    gender: "Female",
    price: 8.99,
    oldPrice: 10.55,
    rating: 5.0,
    discount: 20,
    image: image4,
  },
  {
    id: 5,
    name: "Lady Dior Jelly Black",
    brand: "Dior",
    category: "Fashion",
    gender: "Female",
    price: 50.99,
    oldPrice: 70.55,
    rating: 5.0,
    discount: 40,
    image: image5,
  },
  {
    id: 6,
    name: "Cover All Perfect Cushion",
    brand: "Skintific",
    category: "Beauty",
    gender: "Female",
    price: 5.99,
    oldPrice: 10.55,
    rating: 5.0,
    discount: 50,
    image: image6,
  },
  {
    id: 7,
    name: "5X Ceramide Serum Sunscreen",
    brand: "Skintific",
    category: "Beauty",
    gender: "Female",
    price: 50.99,
    oldPrice: 70.55,
    rating: 5.0,
    discount: 40,
    image: image7,
  },
  {
    id: 8,
    name: "Dior Addict Lip Glow001",
    brand: "Dior",
    category: "Beauty",
    gender: "Female",
    price: 35.89,
    oldPrice: 45.5,
    rating: 5.0,
    discount: 10,
    image: image8,
  },
  {
    id: 9,
    name: "Dior Forever Perfect Cushion (1N) 14gr SPF 35 PA+++",
    brand: "Dior",
    category: "Beauty",
    gender: "Female",
    price: 20.99,
    oldPrice: 74.45,
    rating: 5.0,
    discount: 20,
    image: image9,
  },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`produk-detail-tabpanel-${index}`}
      aria-labelledby={`produk-detail-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `produk-detail-tab-${index}`,
    "aria-controls": `produk-detail-tabpanel-${index}`,
  };
}

export default function ProdukDetail() {
  const { id } = useParams();
  
  const produkItem = produkList.find((item) => item.id === parseInt(id, 10));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!produkItem) {
    return <Typography variant="h5" color="error">Produk tidak ditemukan</Typography>;
  }

  return (
    <div className="flex min-h-screen overflow-y-auto">
      <div className="w-[250px] hidden md:block"><Sidebar /></div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <Grid container spacing={2}>
            
            {/* Produk Images & Info - Berada dalam satu kolom saat di HP */}
            <Grid item xs={12} sm={10} md={5} lg={4}>
              <ProdukImages produk={produkItem} />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <ProdukInfo produk={produkItem} />
            </Grid>

            {/* Tab Panel untuk Features, Specifications, Review */}
            <Grid item xs={12} md={7} xl={8}>
              <MainCard sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Tabs 
                    value={value} 
                    onChange={(e, newValue) => setValue(newValue)} 
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                  >
                    <Tab label="Features" />
                    <Tab label="Specifications" />
                    <Tab 
                      label={
                        <Stack direction="row" alignItems="center">
                          Review <Chip label={String(produkItem.rating)} size="small" sx={{ ml: 0.5 }} />
                        </Stack>
                      } 
                    />
                  </Tabs>
                  {value === 0 && <ProdukFeatures produk={produkItem} />}
                  {value === 1 && <ProdukSpecifications produk={produkItem} />}
                  {value === 2 && <ProdukReview productId={produkItem.id} />}
                </Stack>
              </MainCard>
            </Grid>

            {/* Produk Related - Pindah ke bawah saat di HP */}
            <Grid item xs={12} md={5} xl={4}>
              <MainCard title="Produk Related" sx={{ maxHeight: 400, overflow: 'auto' }}>
                <ProdukRelated id={id} />
              </MainCard>
            </Grid>

          </Grid>
          <FloatingCart />
        </div>
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.any,
  other: PropTypes.any,
};
