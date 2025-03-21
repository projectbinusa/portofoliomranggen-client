import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaHeart, FaSearchPlus, FaSearchMinus, FaUndo } from "react-icons/fa";

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

export default function ProductImages({ product }) {
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setSelectedImage(product?.image || '');
  }, [product]);

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    alert(wishlisted ? "Removed from favourites" : "Added to favourites");
  };

  return (
    <Grid container spacing={2}>
      {/* Gambar Utama */}
      <Grid item xs={12}>
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            bgcolor: '#f9f9f9'
          }}
        >
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <TransformComponent>
                  <CardMedia
                    component="img"
                    image={selectedImage}
                    alt={product.name}
                    sx={{ width: '100%', height: '300px', objectFit: 'contain' }}
                  />
                </TransformComponent>
                {/* Tombol Zoom */}
                <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                  <IconButton onClick={() => zoomIn()} color="primary">
                    <FaSearchPlus />
                  </IconButton>
                  <IconButton onClick={() => zoomOut()} color="primary">
                    <FaSearchMinus />
                  </IconButton>
                  <IconButton onClick={() => resetTransform()} color="primary">
                    <FaUndo />
                  </IconButton>
                </Stack>
              </>
            )}
          </TransformWrapper>
          {/* Wishlist Button */}
          <IconButton
            sx={{ position: 'absolute', top: 12, right: 12, color: wishlisted ? 'red' : 'gray' }}
            onClick={addToFavourite}
          >
            <FaHeart />
          </IconButton>
        </Box>
      </Grid>

      {/* Thumbnail Pilihan */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Box
            sx={{
              width: 60,
              height: 60,
              border: selectedImage === product.image ? '2px solid blue' : '1px solid gray',
              cursor: 'pointer',
              p: 1,
              borderRadius: '5px',
              bgcolor: '#fff'
            }}
            onClick={() => setSelectedImage(product.image)}
          >
            <CardMedia component="img" image={product.image} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

ProductImages.propTypes = { product: PropTypes.object.isRequired };
