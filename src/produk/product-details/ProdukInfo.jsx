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
import CardMedia from '@mui/material/CardMedia';

// Icons
import { Add, Minus, ShoppingCart } from 'iconsax-react';

// ==============================|| DETAIL PRODUK - INFORMASI ||============================== //

export default function ProductInfo({ produk }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Ambil data cart dari localStorage saat pertama kali render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Fungsi untuk menambahkan ke keranjang
  const handleAddToCart = () => {
    const newCart = [...cart, { ...produk, quantity }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Simpan di localStorage
    alert('Ditambahkan ke Keranjang!');
  };

  return (
    <Stack spacing={2}>
      {/* Gambar Produk */}
      <CardMedia
        component="img"
        image={produk.image}
        alt={produk.name}
        sx={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
      />

      {/* Nama Produk */}
      <Typography variant="h3">{produk.name}</Typography>

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
        {produk.discount > 0 && (
          <>
            <Typography variant="h4" color="error">
              Rp {produk.price.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'gray' }}>
              Rp {produk.oldPrice.toLocaleString()}
            </Typography>
            <Chip label={`-${produk.discount}%`} color="error" size="small" />
          </>
        )}
        {produk.discount === 0 && (
          <Typography variant="h3">Rp {produk.price.toLocaleString()}</Typography>
        )}
      </Stack>

      {/* Input Jumlah Produk */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography color="text.secondary">Jumlah</Typography>
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
