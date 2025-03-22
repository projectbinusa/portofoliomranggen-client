import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid } from '@mui/material';

export default function AuthForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
    setError(false); // Hapus error saat user mulai mengetik
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    // Redirect ke halaman CheckMail jika email valid
    navigate('/check-mail');
  };

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography variant="h6">Enter your email</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={handleChange}
          error={error}
          helperText={error ? "Please enter a valid email address" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!email || !email.includes('@')} // Disable jika email kosong / tidak valid
        >
          SEND PASSWORD RESET EMAIL
        </Button>
      </Grid>
    </Grid>
  );
}
