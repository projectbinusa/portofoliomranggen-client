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

// Daftar harga, jumlah, dan status
const prices = [
  { value: '1', label: '$ 100' },
  { value: '2', label: '$ 200' },
  { value: '3', label: '$ 300' },
  { value: '4', label: '$ 400' }
];

const quantities = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
];

const statuses = [
  { value: 'in stock', label: 'In Stock' },
  { value: 'out of stock', label: 'Out of Stock' }
];

export default function TambahProduk() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '1',
    quantity: '1',
    status: 'in stock',
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

  const handleSubmit = () => {
    console.log('Produk Ditambahkan:', product);
  };

  return (
    <MainCard>
      <Grid container spacing={2}>
        {/* Form Kiri */}
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <InputLabel>Product Name</InputLabel>
                <TextField name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Product Description</InputLabel>
                <TextField name="description" value={product.description} onChange={handleChange} placeholder="Enter product description" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Category</InputLabel>
                <TextField name="category" value={product.category} onChange={handleChange} placeholder="Enter your category" fullWidth />
              </Grid>
              <Grid item>
                <InputLabel>Price</InputLabel>
                <TextField name="price" value={product.price} onChange={handleChange} select fullWidth>
                  {prices.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        {/* Form Kanan */}
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <InputLabel>Qty</InputLabel>
                <TextField name="quantity" value={product.quantity} onChange={handleChange} select fullWidth>
                  {quantities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
