import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

export default function SpesifikasiProduk({ produk }) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #E0E0E0" }}>
      <Grid container spacing={3}>
        {/* Kategori Produk */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Kategori Produk
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                Kategori:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">{produk.category || "N/A"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                Gender:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">{produk.gender || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Detail Produsen */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detail Produsen
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                Merek:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">{produk.brand || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

// Validasi Props
SpesifikasiProduk.propTypes = {
  produk: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
};
