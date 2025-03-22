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
// import MainCard from "components/MainCard";

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
    <Grid container spacing={3}>
      {/* Statistik Review */}
      <Grid item xs={12}>
        <MainCard>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2.5}>
            <Grid item>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h2">{averageRating.toFixed(1)}</Typography>
                  <Typography variant="h4" color="text.secondary">
                    /5
                  </Typography>
                </Stack>
                <Typography color="text.secondary">Based on {totalReviews} reviews</Typography>
                <Rating name="read-only" value={averageRating} readOnly precision={0.1} />
              </Stack>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage =
                    totalReviews > 0
                      ? (reviews.filter((r) => r.rating === star).length / totalReviews) * 100
                      : 0;
                  return (
                    <Grid item xs={12} key={star}>
                      <LinearProgressWithLabel star={star} value={percentage} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Daftar Review */}
      <Grid item xs={12}>
        <List>
          {loading ? (
            <Typography>Loading reviews...</Typography>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <MainCard sx={{ bgcolor: "secondary.lighter", mb: 2 }} key={review.id}>
                <ProductReview
                  avatar={review.profile.avatar}
                  date={format(new Date(review.date), "dd/MM/yyyy h:mm a")}
                  name={review.profile.name}
                  rating={review.rating}
                  review={review.review}
                />
              </MainCard>
            ))
          ) : (
            <Typography>No reviews available.</Typography>
          )}
        </List>
      </Grid>

      {/* Tombol "View More Comments" */}
      {totalReviews > 3 && (
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Button variant="text">View more comments</Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

ProductReviews.propTypes = {
  productId: PropTypes.number.isRequired,
};
