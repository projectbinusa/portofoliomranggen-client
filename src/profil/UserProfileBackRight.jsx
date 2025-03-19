import { alpha, useTheme } from "@mui/material/styles";

const UserProfileBackRight = () => {
  const theme = useTheme();

  return (
    <svg
      width="447"
      height="116"
      viewBox="0 0 447 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 bottom-0"
    >
      <path
        opacity="0.4"
        d="M55.2678 22.3777C-49.5465 -14.1611 7.16534 -48.8529 136.242 -34.0647L214.579 -30.0724L448.260 -8.82579L..."
        fill={alpha(theme.palette.primary.light, 0.4)}
      />
    </svg>
  );
};

export default UserProfileBackRight;
