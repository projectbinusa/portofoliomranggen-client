import { alpha, useTheme } from "@mui/material/styles";

const UserProfileBackLeft = () => {
  const theme = useTheme();

  return (
    <svg
      width="333"
      height="61"
      viewBox="0 0 333 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-0"
    >
      <path
        opacity="0.4"
        d="M-0.322477 0.641086L-0.418408 0.55164L-9.20939 59.4297L23.6588 106.206L154.575 130.423..."
        fill={alpha(theme.palette.primary.light, 0.4)}
      />
    </svg>
  );
};

export default UserProfileBackLeft;
