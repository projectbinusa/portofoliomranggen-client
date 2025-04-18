import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project-imports
import Logo from "./LogoMain";
import LogoIcon from './LogoIcon';
import useAuth from '../hooks/useAuth';
import config from '../config'; // ✅ Impor config, lalu ambil APP_DEFAULT_PATH dari config.defaultPath

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }) {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: to || config.defaultPath, sx })}>
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
