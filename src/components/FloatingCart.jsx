import { sum } from 'lodash';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';

// project-imports
// import IconButton from "./components/IconButton";

// assets
import { ShoppingCart } from 'iconsax-react';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

export default function FloatingCart() {
  const theme = useTheme();
  const [cart, setCart] = useState([]);

  // Ambil data cart dari localStorage saat pertama kali render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Menghitung total quantity dari produk dalam cart
  const totalQuantity = cart.length > 0 ? sum(cart.map((item) => item.quantity || 0)) : 0;

  return (
    <Fab
      component={Link}
      to="/checkout"
      size="large"
      variant="circular"
      sx={{
        borderRadius: 0,
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        top: '65%',
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.speedDial,
        boxShadow: theme.customShadows.z1,
        bgcolor: 'background.paper',
        border: '4px solid',
        borderColor: 'background.paper',
        borderRight: 'none',
        '&:hover': {
          bgcolor: 'warning.lighter'
        }
      }}
    >
      <IconButton
        aria-label="cart button"
        size="large"
        sx={{
          p: 0,
          '& :hover': { bgcolor: 'red' },
          '& svg': { width: 26, height: 26 },
          color: 'warning.dark'
        }}
        color="warning"
      >
        <Badge badgeContent={totalQuantity} color="error">
          <ShoppingCart variant="Bulk" />
        </Badge>
      </IconButton>
    </Fab>
  );
}
