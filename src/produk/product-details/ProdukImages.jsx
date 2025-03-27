import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaHeart, FaSearchPlus, FaSearchMinus, FaUndo } from "react-icons/fa";

// ==============================|| DETAIL PRODUK - GAMBAR ||============================== //

export default function ProductImages({ produk }) {
  const [selectedImage, setSelectedImage] = useState(produk.image);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setSelectedImage(produk.image);
  }, [produk]);

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
  };

  return (
    <Grid container spacing={2}>
      {/* Gambar Utama */}
      <Grid item xs={12}>
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            borderRadius: '12px',
            overflow: 'hidden',
            bgcolor: '#f5f7fa',
            p: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <TransformComponent>
                  <CardMedia
                    component="img"
                    image={selectedImage}
                    alt={produk.name}
                    sx={{ width: '100%', height: '350px', objectFit: 'contain' }}
                  />
                </TransformComponent>

                {/* Tombol Zoom */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ position: 'absolute', bottom: 12, right: 12, bgcolor: 'rgba(255,255,255,0.7)', p: 0.5, borderRadius: '8px' }}
                >
                  <IconButton onClick={() => zoomIn()} size="small">
                    <FaSearchPlus />
                  </IconButton>
                  <IconButton onClick={() => zoomOut()} size="small">
                    <FaSearchMinus />
                  </IconButton>
                  <IconButton onClick={() => resetTransform()} size="small">
                    <FaUndo />
                  </IconButton>
                </Stack>
              </>
            )}
          </TransformWrapper>

          {/* Wishlist Button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: wishlisted ? 'red' : 'gray',
              bgcolor: 'rgba(255,255,255,0.7)',
              p: 0.5,
              borderRadius: '50%'
            }}
            onClick={addToFavourite}
          >
            <FaHeart />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

ProductImages.propTypes = { 
  produk: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired 
};
