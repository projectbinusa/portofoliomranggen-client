import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

// Konstanta untuk rute default
const APP_DEFAULT_PATH = "/";

// ==============================|| NOT FOUND PAGE ||============================== //

export default function NotFoundPage() {
  return (
    <Grid
      container
      spacing={5} // Mengurangi spasi agar tidak terlalu berjauhan
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", pt: 2, pb: 1, overflow: "hidden" }}
    >
      {/* Bagian Gambar */}
      <Grid item xs={12}>
        <Stack direction="row">
          <Grid item>
            <Box sx={{ width: { xs: 200, sm: 400 }, height: { xs: 100, sm: 200 } }}>
              <img
                src="/maintance/img-error-404.svg"
                alt="Error 404"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
        </Stack>
      </Grid>

      {/* Bagian Keterangan */}
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h4">Page Not Found</Typography> {/* Lebih kecil dari h1 */}
          <Typography color="text.secondary" align="center" sx={{ fontSize: "1rem", width: { xs: "80%", sm: "60%" } }}>
            The page you are looking for was moved, removed, renamed, or might never exist!
          </Typography>

          {/* Alert untuk menunjukkan error */}
          <Alert severity="error">
            <Typography variant="body1">Error 404 - This page doesn't exist!</Typography>
          </Alert>

          {/* Tombol untuk kembali ke halaman utama */}
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained" sx={{ fontSize: "0.875rem" }}>
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
