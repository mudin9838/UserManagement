import * as React from 'react'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import { getDesignTokens } from './theme'
import { Outlet } from 'react-router-dom'

const buildMode = import.meta.env.MODE;

export const Login_BASE_URL = buildMode === "development" ? "https://localhost:44314" : "https://usermsapi.azurewebsites.net";
export const Register_BASE_URL = buildMode === "development" ? "https://localhost:44314" : "https://usermsapi.azurewebsites.net";
export const Role_BASE_URL = buildMode === "development" ? "https://localhost:44314" : "https://usermsapi.azurewebsites.net";
export const BASE_URL = buildMode === "development" ? "https://localhost:44314" : "https://usermsapi.azurewebsites.net";


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}))

export default function MiniDrawer() {
    //var media = useMediaQuery('(min-width:768px)');
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        function handleResize() {
            // Get window width
            const windowWidth = window.innerWidth
            // Define a breakpoint where the sidebar should be hidden
            const breakpoint = 768 // Example breakpoint
            // Update state to hide/show sidebar based on window width
            setOpen(windowWidth >= breakpoint)
        }

        // Add event listener for window resize
        window.addEventListener('resize', handleResize)

        // Initial call to handleResize to set initial state based on window width
        handleResize()

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const [mode, setMode] = React.useState(
        localStorage.getItem('currentMode')
            ? localStorage.getItem('currentMode')
            : 'light'
    )
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    setMode={setMode}
                />

                <SideBar open={open} handleDrawerClose={handleDrawerClose} />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    )
}
