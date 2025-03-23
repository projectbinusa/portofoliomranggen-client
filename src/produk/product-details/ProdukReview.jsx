import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { format } from "date-fns";

// Material-UI
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Komponen Project
import MainCard from "../../components/MainCard";

// Dummy Data Review
const reviewsData = [
  {
    id: 1,
    productId: 1,
    profile: { name: "Ratu Spanyol", avatar: "" },
    rating: 4,
    review: "oke, sesuai selera",
    date: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    productId: 2,
    profile: { name: "Mami Zahra", avatar: "" },
    rating: 5,
    review: "bagus si",
    date: "2024-03-14T08:45:00Z",
  },
  {
    id: 3,
    productId: 1,
    profile: { name: "Enin", avatar: "" },
    rating: 3,
    review: "Good, tapi nggak sesuai ekspetasi.",
    date: "2024-03-12T16:20:00Z",
  },
];

// Progress Bar untuk Rating
function LinearProgressWithLabel({ star, value }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <LinearProgress
        value={value}
        variant="determinate"
        color="warning"
        sx={{ width: "100%", bgcolor: "secondary.lighter" }}
      />
      <Typography variant="body2" sx={{ minWidth: 50 }} color="text.secondary">
        {`${star} Star`}
      </Typography>
    </Stack>
  );
}

// Komponen Review Produk
export default function ProductReviews({ productId }) {
  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi mengambil review berdasarkan productId
    const filteredReviews = reviewsData.filter((review) => review.productId === productId);
    setReviews(filteredReviews);
    setLoading(false);
  }, [productId]);

  // Menghitung rata-rata rating dan jumlah review
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  return (
    <Grid container spacing={2} sx={{ maxWidth: 600, mx: "auto" }}>
  {/* Statistik Review */}
<Grid item xs={12}>
  <MainCard sx={{ p: 3, ml: -3 }}> {/* Geser seluruh card ke kiri */}
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Stack spacing={1}>
          {totalReviews > 0 ? (
            <>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <Typography variant="h4" fontWeight={600} sx={{ textAlign: "left" }}>
                  {averageRating.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">/5</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                Berdasarkan {totalReviews} ulasan
              </Typography>
              <Rating name="read-only" value={averageRating} readOnly precision={0.1} sx={{ textAlign: "left" }} />
            </>
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: "left" }}>
              Belum ada ulasan untuk produk ini.
            </Typography>
          )}
        </Stack>
      </Grid>

      {/* Progress bar hanya muncul jika ada review */}
      {totalReviews > 0 && (
        <Grid item sx={{ minWidth: 120, ml: -3 }}> {/* Geser progress bar ke kiri */}
          <Stack spacing={1}>
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage =
                totalReviews > 0
                  ? (reviews.filter((r) => r.rating === star).length / totalReviews) * 100
                  : 0;
              return percentage > 0 ? (
                <LinearProgressWithLabel key={star} star={star} value={percentage} />
              ) : null;
            })}
          </Stack>
        </Grid>
      )}
    </Grid>
  </MainCard>
</Grid>


  {/* Daftar Review */}
<Grid item xs={12}>
  <List>
    {loading ? (
      <Typography sx={{ textAlign: "left" }}>Loading reviews...</Typography>
    ) : reviews.length > 0 ? (
      reviews.map((review) => (
        <MainCard sx={{ bgcolor: "secondary.lighter", mb: 1.5, p: 2, ml: -3 }} key={review.id}>
          <Stack spacing={1} sx={{ textAlign: "left" }}>
            {/* Username & Tanggal Review */}
            <Stack>
              <Typography variant="subtitle1" fontWeight={700}>{review.profile.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {format(new Date(review.date), "dd/MM/yyyy h:mm a")}
              </Typography>
            </Stack>

            {/* Rating & Isi Review */}
            <Rating name="read-only" value={review.rating} readOnly precision={0.1} />
            <Typography variant="body2">{review.review}</Typography>
          </Stack>
        </MainCard>
      ))
    ) : (
      <Typography sx={{ textAlign: "left" }}>Tidak ada ulasan.</Typography>
    )}
  </List>
</Grid>

  {/* Tombol "View More Comments" */}
  {totalReviews > 3 && (
    <Grid item xs={12}>
      <Stack direction="row" justifyContent="flex-start">
        <Button variant="outlined" size="small">Lihat lebih banyak</Button>
      </Stack>
    </Grid>
  )}
</Grid>
  );
}

ProductReviews.propTypes = {
  productId: PropTypes.number.isRequired,
};
