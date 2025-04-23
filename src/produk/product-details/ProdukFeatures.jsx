import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function ProdukFitur({ produk }) {
  if (!produk) return <Typography>Produk tidak ditemukan</Typography>;

  const fiturProduk = [
    { label: 'Merek', value: produk.brand },
    { label: 'Kategori', value: produk.category },
    { label: 'Harga', value: `Rp ${produk.price.toLocaleString()}` },
    { label: 'Harga Sebelumnya', value: `Rp ${produk.oldPrice.toLocaleString()}` },
    { label: 'Diskon', value: `${produk.discount}%` },
    { label: 'Rating', value: `${produk.rating} / 5` }
  ];

  return (
    <Stack spacing={1}>
      {fiturProduk.map((feature, index) => (
        <Grid container key={index} spacing={2} alignItems="center">
          {/* Label di kiri */}
          <Grid item xs={4}>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              {feature.label} :
            </Typography>
          </Grid>
          {/* Value di tengah tapi sedikit ke kiri */}
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ pl: 2 }}>{feature.value}</Typography>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}

ProdukFitur.propTypes = {
  produk: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};
