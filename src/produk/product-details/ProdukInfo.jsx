import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icons
import { Add, Minus, ShoppingCart } from 'iconsax-react';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

export default function ProductInfo({ product }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Ambil data cart dari localStorage saat pertama kali render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Fungsi untuk menambahkan ke cart
  const handleAddToCart = () => {
    const newCart = [...cart, { ...product, quantity }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Simpan di localStorage
    alert('Added to Cart!'); // Bisa diganti dengan UI Snackbar kalau mau
  };

  return (
    <Stack spacing={2}>
      {/* Rating Produk */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating name="rating" value={product.rating} precision={0.1} readOnly />
        <Typography color="text.secondary">({product.rating?.toFixed(1)})</Typography>
      </Stack>

      {/* Nama Produk */}
      <Typography variant="h3">{product.name}</Typography>

      {/* Status Stok */}
      <Chip
        size="small"
        label={product.isStock ? 'In Stock' : 'Out of Stock'}
        sx={{
          width: 'fit-content',
          borderRadius: '4px',
          color: product.isStock ? 'success.main' : 'error.main',
          bgcolor: product.isStock ? 'success.lighter' : 'error.lighter'
        }}
      />

      {/* Deskripsi Produk */}
      <Typography color="text.secondary">{product.description}</Typography>

      {/* Input Jumlah Produk */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography color="text.secondary">Quantity</Typography>
            <Stack direction="row">
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                sx={{ width: '60px', textAlign: 'center' }}
                type="number"
                inputProps={{ min: 1 }}
              />
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setQuantity(quantity + 1)}
                sx={{ borderRadius: '50%', ml: 1 }}
              >
                <Add />
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
                sx={{ borderRadius: '50%', ml: 1 }}
              >
                <Minus />
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Harga Produk */}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h3">${product.price}</Typography>
          </Stack>
        </Grid>

        {/* Tombol Checkout dan Tambah ke Keranjang */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              disabled={!product.isStock}
              color="primary"
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/checkout')}
            >
              {!product.isStock ? 'Sold Out' : 'Buy Now'}
            </Button>

            {product.isStock && quantity > 0 && (
              <Button color="secondary" variant="outlined" size="large" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

ProductInfo.propTypes = { product: PropTypes.object.isRequired };
