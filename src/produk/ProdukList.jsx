import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, Avatar, Chip, IconButton, TextField, MenuItem, Select, InputLabel, FormControl, 
  Typography,
  Breadcrumbs,Link,
  TablePagination, Box
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";


const ProductList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts([...storedProducts]);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

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

  

  const paginatedProducts = sortedProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-[250px] relative">
          <Sidebar />
        </div>
    
          {/* Main Content */}
          <div className="flex-1">
            <Navbar />
            <div className="p-6 flex gap-6 mt-6"> 

     <Paper sx={{ padding: 4,width: "100%", overflowX: "auto" }}>
      {/* Breadcrumbs dan Title */}
      <Box sx={{ marginBottom: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Product List</Typography>
        </Breadcrumbs>
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "left" }}>
          Product List
        </Typography>
      </Box>

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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedProducts.map((product) => (
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
                <TableCell>
                  <Chip label={product.status} color={product.status === 'In Stock' ? 'success' : 'error'} />
                </TableCell>
                <TableCell>
                <IconButton 
                    color="primary" 
                    onClick={() =>  navigate(`/detail-produk/${product.id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={sortedProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </div>
     </div>
    </div>
  );
};

export default ProductList;
