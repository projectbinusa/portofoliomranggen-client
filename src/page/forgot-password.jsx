import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthWrapper from '../components/AuthWrapper';
import AuthForgotPassword from '../components/auth/AuthForgotPasswoard';
import { useAuth } from "../components/hooks/useAuth";


export default function ForgotPassword() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h4">Forgot Password</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/dashboard' : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Back to Login
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
