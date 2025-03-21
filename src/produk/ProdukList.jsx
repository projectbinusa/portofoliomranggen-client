import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Chip, IconButton } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import image1 from '../images/camera-removebg-preview.png';
import image2 from '../images/mackbok-removebg-preview.png';
import image3 from '../images/jam-removebg-preview.png';
import image4 from '../images/phone-removebg-preview.png';
import image5 from '../images/lady_dior-removebg-preview.png';
import image6 from '../images/skintific-removebg-preview.png';
import image7 from '../images/sunscreen-removebg-preview.png';
import image8 from '../images/diorrrrr_lip-removebg-preview.png';
import image9 from '../images/cusion-removebg-preview.png';


const products = [
   { id: 1, name: "Canon EOS 1500D", brand: "Canon", category: "Electronics", gender: "Male", price: 12.99, oldPrice: 15.99, rating: 3.5, discount: 30, image: image1 },
    { id: 2, name: "Apple MacBook Pro", brand: "Apple", category: "Electronics", gender: "Male", price: 14.59, oldPrice: 16.99, rating: 4.5, discount: 20, image: image2 },
    { id: 3, name: "Luxury Watch", brand: "Centrix", category: "Fashion", gender: "Male", price: 29.99, oldPrice: 36.00, rating: 4.5, discount: 20, image: image3 },
    { id: 4, name: "Iphone 15 Pro Max", brand: "Apple", category: "Electronics", gender: "Female", price: 8.99, oldPrice: 10.55, rating: 5.0, discount: 20, image: image4 },
    { id: 5, name: "Lady Dior Jelly Black", brand: "Dior", category: "Fashion", gender: "Female", price: 50.99, oldPrice: 70.55, rating: 5.0, discount: 40, image: image5 },
    { id: 6, name: "Cover All Perfect Cushion", brand: "Skintific", category: "Beauty", gender: "Female", price: 5.99, oldPrice: 10.55, rating: 5.0, discount: 50, image: image6 },
    { id: 7, name: "5X Ceramide Serum Sunscreen", brand: "Skintific", category: "Beauty", gender: "Female", price: 50.99, oldPrice: 70.55, rating: 5.0, discount: 40, image: image7 },
    { id: 8, name: "Dior Addict Lip Glow001", brand: "Dior", category: "Beauty", gender: "Female", price: 35.89, oldPrice: 45.50, rating: 5.0, discount: 10, image: image8 },
    { id: 9, name: "Dior Forever Perfect Cushion (1N) 14gr SPF 35 PA+++", brand: "Dior", category: "Beauty", gender: "Female", price: 20.99, oldPrice: 74.45, rating: 5.0, discount: 20, image: image9 },
  ];

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ padding: 2 }}>
      <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/add-product')} sx={{ marginBottom: 2 }}>
        Add Product
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Detail</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Avatar src={`/images/${product.image}`} sx={{ marginRight: 2 }} />
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.qty}</TableCell>
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
