import React, { useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MuiAppBar from '@mui/material/AppBar'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const [token, setToken] = useState(false)
  const userNameString = localStorage.getItem('userName')
  const image = localStorage.getItem('image')

  const navigate = useNavigate()
  let userName
  try {
    userName = userNameString
  } catch (error) {
    console.error('Error parsing userName:', error)
    userName = null
  }

  let role = localStorage.getItem('roles') || ''

  let userRole = ''

  if (role === 'Admin') {
    userRole = 'Admin'
  }

  if (role === 'Management') {
    userRole = 'Management'
  }

  if (role === 'User') {
    userRole = 'User'
  }
  const logout = () => {
    localStorage.clear()
    navigate('/Login')
  }
  const changePassword = () => {
    navigate('/dashboard/change-password')
  }
  useEffect(() => {
    var isAuth = localStorage.getItem('auth')

    if (isAuth) {
      setToken(true)
    }
  }, [])

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={changePassword}>Change Password</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  )
  const toggleApTheme = () => {
    localStorage.setItem(
      'currentMode',
      theme.palette.mode == 'dark' ? 'light' : 'dark'
    )
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
    const htmlElement = document.documentElement
    htmlElement.dataset.bsTheme = localStorage.getItem('currentMode')
  }
  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box flexGrow={1}></Box>
        <Stack direction={'row'}>
          {theme.palette.mode === 'light' ? (
            <IconButton onClick={toggleApTheme} color='inherit'>
              <LightModeOutlined />
            </IconButton>
          ) : (
            <IconButton onClick={toggleApTheme} color='inherit'>
              <DarkModeOutlined />
            </IconButton>
          )}

          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'
          >
            <Badge badgeContent={4} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'
          >
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <Avatar
              alt='Remy Sharp'
              src={
                image
                  ? image
                  : 'https://yt3.ggpht.com/yti/AGOGRCrmhdy4U2zPIn4E6exfLj5oE5Gb9AsTJyY6_LUKmQ=s88-c-k-c0x00ffffff-no-rj'
              }
            />

            <Typography color='inherit'>
              Welcome,{userName ? userName : 'Unknown User'}
            </Typography>
          </IconButton>
          {renderMenu}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
