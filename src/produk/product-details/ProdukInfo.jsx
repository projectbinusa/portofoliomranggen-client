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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

// Icons
import { Add, Minus, ShoppingCart } from 'iconsax-react';

export default function ProductInfo({ produk }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = () => {
    const newCart = [...cart, { ...produk, quantity }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Ditambahkan ke Keranjang!');
  };

  return (
    <Stack spacing={2}>
      {/* Nama Produk */}
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {produk.name}
      </Typography>

      {/* Merek & Kategori */}
      <Typography color="text.secondary">
        {produk.brand} - {produk.category}
      </Typography>

      {/* Rating Produk */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating name="rating" value={produk.rating} precision={0.1} readOnly />
        <Typography color="text.secondary">({produk.rating?.toFixed(1)})</Typography>
      </Stack>

      {/* Status Stok */}
      <Chip
        size="small"
        label={produk.isStock ? 'Tersedia' : 'Habis'}
        sx={{
          width: 'fit-content',
          borderRadius: '4px',
          color: produk.isStock ? 'success.main' : 'error.main',
          bgcolor: produk.isStock ? 'success.lighter' : 'error.lighter'
        }}
      />

      {/* Harga Produk */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {produk.discount > 0 ? (
          <>
            <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
              Rp {produk.price.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'gray' }}>
              Rp {produk.oldPrice.toLocaleString()}
            </Typography>
            <Chip label={`-${produk.discount}%`} color="error" size="small" />
          </>
        ) : (
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Rp {produk.price.toLocaleString()}
          </Typography>
        )}
      </Stack>

      {/* Input Jumlah Produk */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems="flex-start">
            <Typography color="text.secondary" sx={{ mb: 0.5 }}>
              Jumlah
            </Typography>
            <Stack direction="row" alignItems="center">
              <IconButton
                color="primary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                sx={{
                  border: '1px solid',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Minus size="18" />
              </IconButton>

              <Box
                sx={{
                  width: '50px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderRadius: '8px',
                  mx: 1
                }}
              >
                <Typography variant="h6">{quantity}</Typography>
              </Box>

              <IconButton
                color="primary"
                onClick={() => setQuantity(quantity + 1)}
                sx={{
                  border: '1px solid',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Add size="18" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        {/* Tombol Checkout dan Tambah ke Keranjang */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              disabled={!produk.isStock}
              color="primary"
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/checkout')}
            >
              {!produk.isStock ? 'Habis' : 'Beli Sekarang'}
            </Button>

            {produk.isStock && quantity > 0 && (
              <Button color="secondary" variant="outlined" size="large" onClick={handleAddToCart}>
                Tambah ke Keranjang
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

ProductInfo.propTypes = {
  produk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    gender: PropTypes.string,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    rating: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    isStock: PropTypes.bool.isRequired
  }).isRequired
};
