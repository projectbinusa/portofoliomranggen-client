import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MainCard from '../components/MainCard';
import { DocumentUpload } from 'iconsax-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../tampilan/Navbar';

const statuses = [
  { value: 'in stock', label: 'In Stock' },
  { value: 'out of stock', label: 'Out of Stock' },
];

export default function TambahProduk() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    status: '',
    image: null
  });

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleCancel = () => {
    navigate('/produk-list');
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async () => {
    // Ambil produk lama dari localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  
    // Konversi gambar ke Base64 jika ada gambar yang diunggah
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = await toBase64(product.image);
    }
  
    // Buat objek produk baru
    const newProduct = {
      id: storedProducts.length + 1,
      name: product.name,
      category: product.category,
      price: parseFloat(product.price) || 0,
      quantity: parseInt(product.quantity) || 0,
      status: product.status,
      rating: 0,
      discount: 0,
      oldPrice: parseFloat(product.price) * 1.2 || 0,
      image: imageBase64
    };
  
    // Tambahkan produk baru ke daftar
    const updatedProducts = [...storedProducts, newProduct];
  
    // Simpan kembali ke localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  
    // Redirect ke halaman daftar produk
    navigate('/produk-list');
  };  

  
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
          
            <MainCard sx={{ width: "100%", maxWidth: "1200px", padding: "24px", margin: "0 auto", marginTop: "0px", }}>
            <Typography variant="h6" fontWeight="arial" sx={{ textAlign: "left" }}>
                Tambah Produk
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <MainCard 
                  sx={{ 
                    width: "100%", 
                    maxWidth: "1200px", 
                    padding: "24px", 
                    margin: "0 auto", 
                    marginTop: "0px",
                    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" // Tambah shadow
                  }}
                >
                  <Grid container spacing={2} direction="column">
                      <Grid item>
                        <InputLabel>Product Name</InputLabel>
                        <TextField name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" fullWidth  sx={{"& fieldset": { borderColor: "gray" } }}  />
                      </Grid>
                      <Grid item>
                        <InputLabel>Product Brand</InputLabel>
                        <TextField name="brand" value={product.brand} onChange={handleChange} placeholder="Enter product brand" fullWidth sx={{"& fieldset": { borderColor: "gray" } }}  />
                      </Grid>
                      <Grid item>
                        <InputLabel>Category</InputLabel>
                        <TextField name="category" value={product.category} onChange={handleChange} placeholder="Enter your category" fullWidth sx={{"& fieldset": { borderColor: "gray" } }}  />
                      </Grid>
                      <Grid item>
                        <InputLabel>Price</InputLabel>
                        <TextField name="price" type="number" value={product.price} onChange={handleChange} placeholder="Enter product price" fullWidth sx={{"& fieldset": { borderColor: "gray" } }}  />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>

                <Grid item xs={12} sm={6}>
                <MainCard 
                    sx={{ 
                      width: "100%", 
                      maxWidth: "1200px", 
                      padding: "24px", 
                      margin: "0 auto", 
                      marginTop: "0px",
                      boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" // Tambah shadow
                    }}
                  >
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <InputLabel>Qty</InputLabel>
                        <TextField name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Enter quantity" fullWidth sx={{"& fieldset": { borderColor: "gray" } }}  />
                      </Grid>
                      <Grid item>
                        <InputLabel>Status</InputLabel>
                        <TextField
                          select // Menjadikan TextField sebagai Select
                          name="status"
                          value={product.status} // Perbaiki key yang benar
                          onChange={handleChange}
                          fullWidth
                          sx={{ "& fieldset": { borderColor: "gray" } }}
                        >
                          {statuses.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" component="label" color="secondary" startIcon={<DocumentUpload />} sx={{ mt: 1 }}>
                          Click to Upload
                          <input type="file" hidden onChange={handleImageUpload} />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                              Cancel
                            </Button>
                          <Button variant="contained" onClick={handleSubmit}>
                            Add new Product
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </MainCard>
                </div>
              </div>
            </div>
          );
        }