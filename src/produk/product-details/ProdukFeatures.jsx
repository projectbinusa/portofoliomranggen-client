import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// ==============================|| PRODUCT DETAILS - FEATURES ||============================== //

export default function ProductFeatures({ features }) {
  return (
    <Grid container spacing={2}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Typography color="text.secondary">{feature.label}:</Typography>
          <Typography>{feature.value}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}

// PropTypes untuk validasi props
ProductFeatures.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};
