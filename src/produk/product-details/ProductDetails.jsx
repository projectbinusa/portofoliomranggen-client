import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MainCard from "../../components/MainCard";
import FloatingCart from "../../components/FloatingCart";
import ProductFeatures from './ProductFeatures';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import ProductSpecifications from './ProductSpecifications';
import RelatedProducts from './RelatedProducts';

// Import data produk dari file ProductsPage.js
import { produk } from '../Produk';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`
  };
}

export default function ProductDetails() {
  const { id } = useParams();
  
  // Cari produk berdasarkan ID dari URL
  const product = produk.find((p) => p.id === Number(id));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const productImages = useMemo(() => product ? <ProductImages product={product} /> : null, [product]);
  const relatedProducts = useMemo(() => <RelatedProducts id={id} />, [id]);

  if (!product) {
    return <Typography variant="h5" color="error">Product not found</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={5} lg={4}>
              {productImages}
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
              <MainCard border={false} sx={{ height: '100%', bgcolor: 'secondary.lighter' }}>
                <ProductInfo product={product} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <MainCard>
            <Stack spacing={3}>
              <Tabs value={value} indicatorColor="primary" onChange={handleChange} variant="scrollable">
                <Tab label="Features" {...a11yProps(0)} />
                <Tab label="Specifications" {...a11yProps(1)} />
                <Tab label="Overview" {...a11yProps(2)} />
                <Tab
                  label={
                    <Stack direction="row" alignItems="center">
                      Reviews <Chip label={String(product.rating)} size="small" sx={{ ml: 0.5 }} />
                    </Stack>
                  }
                  {...a11yProps(3)}
                />
              </Tabs>
              <Divider />
              <TabPanel value={value} index={0}><ProductFeatures /></TabPanel>
              <TabPanel value={value} index={1}><ProductSpecifications /></TabPanel>
              <TabPanel value={value} index={2}>
                <Typography color="text.secondary">{product.description}</Typography>
              </TabPanel>
              <TabPanel value={value} index={3}><ProductReview product={product} /></TabPanel>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} xl={4} sx={{ position: 'relative' }}>
          <MainCard title="Related Products" sx={{ height: 'calc(100% - 16px)', position: 'absolute', top: '16px' }}>
            {relatedProducts}
          </MainCard>
        </Grid>
      </Grid>
      <FloatingCart />
    </>
  );
}

TabPanel.propTypes = { children: PropTypes.any, value: PropTypes.any, index: PropTypes.any, other: PropTypes.any };
