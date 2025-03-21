import PropTypes from 'prop-types';
import { useState } from 'react';
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

// Third-party
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

// Icons
import { Add, Minus, ShoppingCart } from 'iconsax-react';

// API Calls (dummy)
import { addToCart, useGetCart } from 'api/cart';
import { openSnackbar } from 'api/snackbar';

// **Schema Validasi**
const validationSchema = yup.object({
  quantity: yup.number().min(1, 'Minimum quantity is 1').required('Quantity is required')
});

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

export default function ProductInfo({ product }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const { cart } = useGetCart();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    },
    validationSchema,
    onSubmit: (values) => {
      values.quantity = quantity;
      addToCart(values, cart.products);
      openSnackbar({
        open: true,
        message: 'Added to Cart!',
        variant: 'alert',
        alert: { color: 'success' }
      });

      navigate('/checkout'); // Redirect ke halaman checkout
    }
  });

  const { errors, values, handleSubmit } = formik;

  const addCart = () => {
    values.quantity = quantity;
    addToCart(values, cart.products);
    openSnackbar({
      open: true,
      message: 'Added to Cart!',
      variant: 'alert',
      alert: { color: 'success' }
    });
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

      {/* Formik untuk penanganan submit */}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Input Jumlah Produk */}
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
                {errors.quantity && (
                  <Typography color="error.main" variant="body2">
                    {errors.quantity}
                  </Typography>
                )}
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
                  type="submit"
                  disabled={!product.isStock}
                  color="primary"
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                >
                  {!product.isStock ? 'Sold Out' : 'Buy Now'}
                </Button>

                {product.isStock && quantity > 0 && (
                  <Button color="secondary" variant="outlined" size="large" onClick={addCart}>
                    Add to Cart
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
}

ProductInfo.propTypes = { product: PropTypes.object.isRequired };
