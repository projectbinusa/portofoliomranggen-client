import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, Avatar, Chip, IconButton, TextField, MenuItem, Select, InputLabel, FormControl, 
  Typography,
  Breadcrumbs
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Link } from '@mui/icons-material';
import image1 from '../images/camera-removebg-preview.png';
import image2 from '../images/mackbok-removebg-preview.png';
import image3 from '../images/jam-removebg-preview.png';
import image4 from '../images/phone-removebg-preview.png';
import image5 from '../images/lady_dior-removebg-preview.png';
import image6 from '../images/skintific-removebg-preview.png';

// Data produk
const products = [
  { id: 1, name: "Canon EOS 1500D", brand: "Canon", category: "Electronics", gender: "Male", price: 12.99, oldPrice: 15.99, rating: 3.5, discount: 30, status: "In Stock", image: image1},
  { id: 2, name: "Apple MacBook Pro", brand: "Apple", category: "Electronics", gender: "Male", price: 14.59, oldPrice: 16.99, rating: 4.5, discount: 20, status: "Out of Stock", image: image2},
  { id: 3, name: "Luxury Watch", brand: "Centrix", category: "Fashion", gender: "Male", price: 29.99, oldPrice: 36.00, rating: 4.5, discount: 20, status: "In Stock", image: image3 },
  { id: 4, name: "Iphone 15 Pro Max", brand: "Apple", category: "Electronics", gender: "Female", price: 8.99, oldPrice: 10.55, rating: 5.0, discount: 20, status: "In Stock", image: image4 },
  { id: 5, name: "Lady Dior Jelly Black", brand: "Dior", category: "Fashion", gender: "Female", price: 50.99, oldPrice: 70.55, rating: 5.0, discount: 40, status: "Out of Stock", image: image5 },
  { id: 6, name: "Cover All Perfect Cushion", brand: "Skintific", category: "Beauty", gender: "Female", price: 5.99, oldPrice: 10.55, rating: 5.0, discount: 50, status: "In Stock", image: image6 },
];

const ProductList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Mengurutkan produk
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  return (
    <Paper sx={{ padding: 3 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Product List</Typography>
      </Breadcrumbs>

      {/* Judul Halaman */}
      <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
        Product List
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        {/* Input Pencarian */}
        <TextField
          label="Search products..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Dropdown Pengurutan */}
        <FormControl size="small" sx={{ minWidth: 200, ml: 8 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Product Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>

        {/* Tombol Tambah Produk */}
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/tambah-produk')}>
          Add Product
        </Button>
      </div>

      {/* Tabel Produk */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Detail</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Old Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                <Avatar 
                    src={product.image} 
                    sx={{ width: 50, height: 50, marginRight: 2 }} 
                  />
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>${product.oldPrice.toFixed(2)}</TableCell>
                <TableCell>{product.rating}⭐</TableCell>
                <TableCell>
                  <Chip label={product.status} color={product.status === 'In Stock' ? 'success' : 'error'} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductList;
