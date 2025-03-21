import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

// ==============================|| PRODUCT DETAILS - SPECIFICATIONS ||============================== //

export default function ProductSpecifications({ product }) {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Product Category</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Wearable Device Type:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.deviceType || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Compatible Devices:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.compatibleDevices || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Ideal For:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.idealFor || "N/A"}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Manufacturer Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Brand:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.brand || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Model Series:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.modelSeries || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Model Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.modelNumber || "N/A"}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// Validasi Props
ProductSpecifications.propTypes = {
  product: PropTypes.shape({
    deviceType: PropTypes.string,
    compatibleDevices: PropTypes.string,
    idealFor: PropTypes.string,
    brand: PropTypes.string,
    modelSeries: PropTypes.string,
    modelNumber: PropTypes.string,
  }).isRequired,
};
