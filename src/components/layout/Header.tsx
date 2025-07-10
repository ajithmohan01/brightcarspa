import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Select,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import {
  Menu as MenuIcon,
  LocationOn,
  AccountCircle,
  Phone,
  DirectionsCar
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLocation, setSelectedLocation] = useState('downtown');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value as string);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleProfileMenuClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Packages', path: '/packages' },
    { label: 'Book Now', path: '/booking' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
        BrightCarSpa
      </Typography>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.label} 
            onClick={() => navigate(item.path)}
            sx={{ 
              textAlign: 'center',
              backgroundColor: isActive(item.path) ? 'primary.light' : 'transparent',
              '&:hover': { backgroundColor: 'primary.light' }
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{ 
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.path) ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: isMobile ? 1 : 0, 
              color: 'primary.main', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
            BrightCarSpa
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Location Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <LocationOn sx={{ color: 'primary.main', mr: 0.5 }} />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedLocation}
                onChange={handleLocationChange}
                displayEmpty
                sx={{ 
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
              >
                <MenuItem value="downtown">Downtown</MenuItem>
                <MenuItem value="uptown">Uptown</MenuItem>
                <MenuItem value="suburbs">Suburbs</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Emergency Contact */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', mr: 2 }}>
            <Phone sx={{ color: 'primary.main', mr: 0.5, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              +91 9876543210
            </Typography>
          </Box>

          {/* Authentication */}
          {currentUser ? (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {userProfile?.displayName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleProfileMenuClose(); }}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </Box>
          )}

          {/* Mobile menu */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;