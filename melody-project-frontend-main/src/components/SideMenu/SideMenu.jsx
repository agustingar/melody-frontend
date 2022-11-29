import React from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useMediaQuery } from "react-responsive";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../utils/img/toolbar.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';

const drawerWidth = 200;

function SideMenu(props) {
  const [value, setValue] = React.useState(0);

  const responsive = useMediaQuery({
    query: "(max-width: 750px)",
  });
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const logout = () => {
    localStorage.clear();
  }
  const navItems = [
  <Link to="/home">
    <HomeIcon />Home
  </Link>,
  <Link to="/search">
  <SearchIcon />Search
</Link>,
  <Link to="/playlists">
    <ListIcon/>Playlists
  </Link>,
  <Link to="/favorites">
    <FavoriteIcon/>Favorites
  </Link>,
  <Link to="/songs">
    <AddIcon/> Upload song
  </Link>
  ];
  const drawer = (
    <div className="sideMenu" onClick={handleDrawerToggle}>
      <Toolbar className="toolbar">
        <img src={logo} alt="logo" width="900" height="50" />
      </Toolbar>

      <Divider sx={{ p: 1 }} />
      <List >


        {navItems.map((item) => (
          <ListItem key={item} disablePadding >
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}

      </List>
      <Divider />
      <Link to="/">
        {" "}
        <List>
          {[<><LogoutIcon/>"Logout"</>].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Link>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>

      {responsive ?
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ zIndex: 999, color: 'grey' }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            <Drawer
            className="sideMenu"
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: '1', sm: 'block' }, zIndex: 1,
                '& .MuiDrawer-paper': { boxSizing: 'border-box' , width: drawerWidth, },
              }}
            >
              {drawer}
            </Drawer>
          </Typography>
        </Toolbar>
        :

        <Box component="nav" >
          <Drawer
            className="sideMenu"
            container={container}
            variant="permanent"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: '1', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

      }
    </Box>

  );
}

export default SideMenu;
