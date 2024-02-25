import * as React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";



import CssBaseline from "@mui/material/CssBaseline";



import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { getDesignTokens } from "./theme";
import { Outlet } from "react-router-dom";


export const Login_BASE_URL = "https://usermsapi.azurewebsites.net";
export const Register_BASE_URL = "https://usermsapi.azurewebsites.net";
export const Role_BASE_URL = "https://usermsapi.azurewebsites.net";
export const BASE_URL = "https://usermsapi.azurewebsites.net";



const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




export default function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [mode, setMode] = React.useState(Boolean(localStorage.getItem("currentMode")) ? localStorage.getItem("currentMode"): "light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
 
  
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
    <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode}/>
     
     <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader/>
          <Outlet/>
    
     
      </Box>
    </Box>
    </ThemeProvider>
  );
}
