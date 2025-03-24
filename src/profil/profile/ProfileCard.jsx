import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '../../components/MainCard';
import ProfileRadialChart from './ProfileRadialChart';

// ==============================|| USER PROFILE - TOP CARD ||============================== //

export default function ProfileCard({ focusInput }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainCard
      border={false}
      content={false}
      sx={{
        position: 'relative',
        background: `linear-gradient(to right, #E3ECFF, #F0F5FF)`, // Background gradient biru muda
        overflow: 'hidden',
        p: 2
      }}
    >
      {/* Efek Wave di Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 200,
          height: '100%',
          background: 'url(/path-to-wave-image.png) no-repeat center',
          backgroundSize: 'cover',
          opacity: 0.3
        }}
      />

      <Grid container justifyContent="space-between" alignItems="center" sx={{ position: 'relative', zIndex: 5 }}>
        {/* Bagian Kiri: Progress Chart + Text */}
        <Grid item>
          <Stack direction="row" spacing={matchDownSM ? 1 : 2} alignItems="center">
            {/* Progress Chart */}
            <Box sx={{ ml: matchDownSM ? 0 : 1 }}>
              <ProfileRadialChart />
            </Box>
            {/* Teks */}
            <Stack spacing={0.75}>
              <Typography variant="h5" color="primary.dark">Edit Your Profile</Typography>
              <Typography variant="body2" color="secondary">
                Complete your profile to unlock all features
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Bagian Kanan: Button */}
        <Grid item sx={{ mx: matchDownSM ? 2 : 3, my: matchDownSM ? 1 : 0, mb: matchDownSM ? 2 : 0 }} xs={matchDownSM ? 12 : 'auto'}>
          <Button 
            variant="contained" 
            fullWidth={matchDownSM} 
            component={Link} 
            to="/personal" 
            onClick={focusInput}
            sx={{
              bgcolor: "#3D70FF", // Warna biru seperti di foto
              '&:hover': { bgcolor: "#335BDA" } // Warna hover lebih gelap
            }}
          >
            Edit Your Profile
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}

ProfileCard.propTypes = { focusInput: PropTypes.func };
