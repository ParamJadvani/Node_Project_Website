import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", // Navy Blue for main elements like navbars
      contrastText: "#FFFFFF", // White for contrast text
    },
    secondary: {
      main: "#3B82F6", // Sky Blue for buttons and links
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#10B981", // Leaf Green for success messages and positive actions
    },
    info: {
      main: "#14B8A6", // Teal Green for info elements or less prominent buttons
    },
    warning: {
      main: "#F59E0B", // Ocean Blue for warning messages
    },
    background: {
      default: "#FFFFFF", // White background for clean look
      paper: "#F3F4F6", // Light background for cards, panels
    },
    text: {
      primary: "#172831", // Blackish Navy for primary text
      secondary: "#6B7280", // Muted gray for secondary text
    },
    error: {
      main: "#EF4444", // Red for errors
    },
  },
  typography: {
    fontFamily:
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", // Clean sans-serif font
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none", // Avoid uppercase button text
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16, // Consistent rounded corners
  },
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
