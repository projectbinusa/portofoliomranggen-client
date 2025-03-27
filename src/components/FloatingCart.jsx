import { sum } from 'lodash';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Assets
import { ShoppingCart } from 'iconsax-react';

// ==============================|| FLOATING CART BUTTON ||============================== //

export default function FloatingCart() {
  const theme = useTheme();
  const [cart, setCart] = useState([]);

  // Ambil data cart dari localStorage saat pertama kali render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Menghitung total jumlah item dalam keranjang
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
        boxShadow: theme.shadows[3],
        bgcolor: 'background.paper',
        border: '4px solid',
        borderColor: 'background.paper',
        borderRight: 'none',
        '&:hover': {
          bgcolor: 'warning.lighter'
        }
      }}
    >
      <Badge badgeContent={totalQuantity} color="error">
        <ShoppingCart variant="Bulk" />
      </Badge>

      {/* Menampilkan daftar produk dalam cart */}
      {cart.length > 0 && (
        <Stack
          sx={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            width: 200,
            bgcolor: 'white',
            boxShadow: theme.shadows[3],
            borderRadius: 1,
            p: 1,
          }}
        >
          {cart.slice(0, 3).map((item, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={1} sx={{ p: 1 }}>
              <Avatar src={item.image} sx={{ width: 40, height: 40 }} />
              <Typography variant="body2" noWrap>
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Fab>
  );
}
