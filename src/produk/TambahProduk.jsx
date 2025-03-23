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

const statuses = [
  { value: 'in stock', label: 'In Stock' },
  { value: 'out of stock', label: 'Out of Stock' }
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
    navigate('/apps/e-commerce/product-list');
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = await toBase64(product.image);
    }
  
    
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
      image: imageBase64,
    };
  
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  
    navigate('/produk-list');
  };
  
  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <InputLabel>Product Name</InputLabel>
                <TextField name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Product Brand</InputLabel>
                <TextField name="brand" value={product.brand} onChange={handleChange} placeholder="Enter product brand" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Category</InputLabel>
                <TextField name="category" value={product.category} onChange={handleChange} placeholder="Enter your category" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Price</InputLabel>
                <TextField name="price" type="number" value={product.price} onChange={handleChange} placeholder="Enter product price" fullWidth />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <InputLabel>Qty</InputLabel>
                <TextField name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Enter quantity" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Status</InputLabel>
                <TextField name="status" value={product.status} onChange={handleChange} select fullWidth>
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <Typography color="error.main">
                  *{' '}
                  <Typography component="span" color="text.secondary">
                    Recommended resolution is 640*640 with file size
                  </Typography>
                </Typography>
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
  );
}
