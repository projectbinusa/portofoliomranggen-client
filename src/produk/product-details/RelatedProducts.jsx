import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-imports
import Avatar from 'components/@extended/Avatar';
import SimpleBar from 'components/third-party/SimpleBar';

// assets
import image1 from '../images/camera-removebg-preview.png';
import image2 from '../images/mackbok-removebg-preview.png';
import image3 from '../images/jam-removebg-preview.png';
import image4 from '../images/phone-removebg-preview.png';
import image5 from '../images/lady_dior-removebg-preview.png';

// Data produk terkait (sementara, bisa diganti dengan API jika perlu)
const relatedProducts = [
  { id: 1, name: "Canon EOS 1500D", brand: "Canon", category: "Electronics", price: 12.99, oldPrice: 15.99, rating: 3.5, discount: 30, image: image1 },
  { id: 2, name: "Apple MacBook Pro", brand: "Apple", category: "Electronics", price: 14.59, oldPrice: 16.99, rating: 4.5, discount: 20, image: image2 },
  { id: 3, name: "Luxury Watch", brand: "Centrix", category: "Fashion", price: 29.99, oldPrice: 36.00, rating: 4.5, discount: 20, image: image3 },
  { id: 4, name: "Iphone 15 Pro Max", brand: "Apple", category: "Electronics", price: 8.99, oldPrice: 10.55, rating: 5.0, discount: 20, image: image4 },
  { id: 5, name: "Lady Dior Jelly Black", brand: "Dior", category: "Fashion", price: 50.99, oldPrice: 70.55, rating: 5.0, discount: 40, image: image5 },
];

function ListProduct({ product }) {
  const history = useNavigate();

  return (
    <ListItemButton divider onClick={() => history(`/apps/e-commerce/product-details/${product.id}`)}>
      <ListItemAvatar>
        <Avatar
          alt={product.name}
          size="xl"
          variant="rounded"
          src={product.image}
          sx={{ mr: 1.15 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<strong>{product.name}</strong>}
        secondary={
          <Stack spacing={1}>
            <span className="text-sm text-gray-500">{product.brand}</span>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <span className="font-bold text-red-500">${product.price}</span>
              <span className="text-gray-400 line-through">${product.oldPrice}</span>
            </Stack>
            <Rating name="read-only" value={product.rating} readOnly precision={0.1} />
          </Stack>
        }
      />
    </ListItemButton>
  );
}

export default function RelatedProducts() {
  const [related, setRelated] = useState(relatedProducts);

  return (
    <SimpleBar sx={{ height: { xs: '100%', md: 'calc(100% - 62px)' } }}>
      <Grid item>
        <Stack>
          <List>
            {related.map((product) => (
              <ListProduct key={product.id} product={product} />
            ))}
          </List>
          <Button color="secondary" variant="outlined" sx={{ mx: 2, my: 4, textTransform: 'none' }}>
            View all Products
          </Button>
        </Stack>
      </Grid>
    </SimpleBar>
  );
}

ListProduct.propTypes = { product: PropTypes.object.isRequired };
