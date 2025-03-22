import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Paper, Box } from "@mui/material";

const CheckMail = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "12px",
            maxWidth: "350px",
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Hi, Check Your Mail
          </Typography>
          <Typography sx={{ color: "gray", mb: 2 }}>
            We have sent a password recovery instruction to your email.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              py: 1.2,
            }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CheckMail;
