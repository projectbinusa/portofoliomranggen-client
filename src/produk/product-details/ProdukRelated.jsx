import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'; // ✅ FIX: Tambah import Typography

// Assets
import image1 from "../../images/camera-removebg-preview.png";
import image2 from "../../images/mackbok-removebg-preview.png";
import image3 from "../../images/jam-removebg-preview.png";
import image4 from '../../images/phone-removebg-preview.png';
import image5 from '../../images/lady_dior-removebg-preview.png';

// Data produk terkait
const produkTerkait = [
  { id: 1, name: "Canon EOS 1500D", brand: "Canon", category: "Electronics", price: 12.99, oldPrice: 15.99, rating: 3.5, discount: 30, image: image1 },
  { id: 2, name: "Apple MacBook Pro", brand: "Apple", category: "Electronics", price: 14.59, oldPrice: 16.99, rating: 4.5, discount: 20, image: image2 },
  { id: 3, name: "Luxury Watch", brand: "Centrix", category: "Fashion", price: 29.99, oldPrice: 36.00, rating: 4.5, discount: 20, image: image3 },
  { id: 4, name: "Iphone 15 Pro Max", brand: "Apple", category: "Electronics", price: 8.99, oldPrice: 10.55, rating: 5.0, discount: 20, image: image4 },
  { id: 5, name: "Lady Dior Jelly Black", brand: "Dior", category: "Fashion", price: 50.99, oldPrice: 70.55, rating: 5.0, discount: 40, image: image5 },
];

// Komponen untuk satu item produk
function ItemProduk({ produk }) {
  const navigate = useNavigate();

  return (
    <ListItemButton divider onClick={() => navigate(`/apps/e-commerce/product-details/${produk.id}`)}>
      <ListItemAvatar>
        <Avatar
          alt={produk.name}
          variant="rounded"
          src={produk.image}
          sx={{ width: 64, height: 64, mr: 1.15 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="subtitle1" fontWeight="bold">{produk.name}</Typography>}
        secondary={
          <Stack spacing={1}>
            <Typography variant="body2" color="textSecondary">{produk.brand}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="h6" color="error">Rp {produk.price.toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>Rp {produk.oldPrice.toLocaleString()}</Typography>
            </Stack>
            <Rating name="read-only" value={produk.rating} readOnly precision={0.1} />
          </Stack>
        }
      />
    </ListItemButton>
  );
}

export default function ProdukTerkait() {
  const [produkList, setProdukList] = useState(produkTerkait);

  return (
    <Grid item>
      <Stack>
        <List>
          {produkList.map((produk) => (
            <ItemProduk key={produk.id} produk={produk} />
          ))}
        </List>
        <Button color="secondary" variant="outlined" sx={{ mx: 2, my: 4, textTransform: 'none' }}>
          Lihat Semua Produk
        </Button>
      </Stack>
    </Grid>
  );
}

// PropTypes validasi
ItemProduk.propTypes = {
  produk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};
