import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

// ==============================|| DETAIL PRODUK - FITUR ||============================== //

export default function ProdukFitur({ produk }) {
  if (!produk) return <Typography>Produk tidak ditemukan</Typography>; // Cegah error jika produk undefined

  // Data fitur diambil dari properti produk yang tersedia
  const fiturProduk = [
    { label: 'Merek', value: produk.brand },
    { label: 'Kategori', value: produk.category },
    { label: 'Cocok Untuk', value: produk.gender },
    { label: 'Harga', value: `Rp ${produk.price.toLocaleString()}` },
    { label: 'Harga Sebelumnya', value: `Rp ${produk.oldPrice.toLocaleString()}` },
    { label: 'Diskon', value: `${produk.discount}%` },
    { label: 'Rating', value: `${produk.rating} / 5` }
  ];

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

      {/* Fitur Produk */}
      <Grid container spacing={2}>
        {fiturProduk.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography color="text.secondary">{feature.label}:</Typography>
            <Typography>{feature.value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

// PropTypes untuk validasi props
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
