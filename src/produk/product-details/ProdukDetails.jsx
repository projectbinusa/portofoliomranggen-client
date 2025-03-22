import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MainCard from "../../components/MainCard";
import FloatingCart from "../../components/FloatingCart";
import ProdukFeatures from './ProdukFeatures';
import ProdukImages from './ProdukImages';
import ProdukInfo from './ProdukInfo';
import ProdukReview from './ProdukReview';
import ProdukSpecifications from './ProdukSpecifications';
import ProdukRelated from './ProdukRelated';

// Import data produk dari file ProdukPage.js
import produk from '../Produk';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`produk-detail-tabpanel-${index}`}
      aria-labelledby={`produk-detail-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `produk-detail-tab-${index}`,
    'aria-controls': `produk-detail-tabpanel-${index}`
  };
}

export default function ProdukDetail() {
  const { id } = useParams();

  // Cari produk berdasarkan ID dari URL
  const produkItem = produk.find((p) => p.id === Number(id));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const produkImages = useMemo(() => produkItem ? <ProdukImages produk={produkItem} /> : null, [produkItem]);
  const RelatedProduk = useMemo(() => <RelatedProduk id={id} />, [id]);

  if (!produkItem) {
    return <Typography variant="h5" color="error">Produk tidak ditemukan</Typography>;

  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={5} lg={4}>
              {produkImages}
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
              <MainCard border={false} sx={{ height: '100%', bgcolor: 'secondary.lighter' }}>
                <ProdukInfo produk={produkItem} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <MainCard>
            <Stack spacing={3}>
              <Tabs
                value={value}
                indicatorColor="primary"
                onChange={handleChange}
                variant="scrollable"
              >
                <Tab label="Features" {...a11yProps(0)} />
                <Tab label="Specifications" {...a11yProps(1)} />
                <Tab label="Ringkasan" {...a11yProps(2)} />
                <Tab
                  label={
                    <Stack direction="row" alignItems="center">
                      Review <Chip label={String(produkItem.rating)} size="small" sx={{ ml: 0.5 }} />
                    </Stack>
                  }
                  {...a11yProps(3)}
                />
              </Tabs>
              <Divider />
              <TabPanel value={value} index={0}><ProdukFeatures /></TabPanel>
              <TabPanel value={value} index={1}><ProdukSpecifications /></TabPanel>
              <TabPanel value={value} index={2}>
                <Typography color="text.secondary">{produkItem.description}</Typography>
              </TabPanel>
              <TabPanel value={value} index={3}><ProdukReview produk={produkItem} /></TabPanel>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} xl={4} sx={{ position: 'relative' }}>
          <MainCard title="Produk Related" sx={{ height: 'calc(100% - 16px)', position: 'absolute', top: '16px' }}>
            {RelatedProduk}
          </MainCard>
        </Grid>
      </Grid>
      <FloatingCart />
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.any,
  other: PropTypes.any,
};
