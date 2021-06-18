import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { setDrawerOpen, setDrawerClose } from '../Reducers/Css-reducer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { IconButton, CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ChevronRight, ChevronLeft, Mail, MoveToInbox, Dashboard, ViewList } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100vw',
    background: 'lightgrey',
    margin: 0,
    padding: 0
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 24,
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: '240px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: '240px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    color: "#000",
    backgroundColor: "lightgrey",
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    backgroundColor: "lightgrey",
    color: "#000",
    width: theme.spacing(2) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  menuIcons: {
    color: "#7D7D7D",
  },
  textFont: {
    fontFamily: "Pattaya"
  },
}))



const App = ({ children }) => {

  const select = useSelector((state) => state.cssReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listItems, setListItems] = useState(['Dashboard', 'Products', 'Send email', 'Drafts']);

  const { main_drawer_open } = select || {};

  useEffect(() => {
  }, []);

  const selectionFunction = (path) => {
    const splitPath = path.split('/');
    if (splitPath[splitPath.length - 1] === 'main') {
      setSelectedIndex(0);
    } else if (splitPath[splitPath.length - 1] === 'products') {
      setSelectedIndex(1);
    } else {
      setSelectedIndex(2);
    }
  }


  const handleDrawerClose = () => {
    dispatch(setDrawerClose());
  }

  const handleDrawerOpen = () => {
    dispatch(setDrawerOpen());
  }

  const handleClick = (index, text) => {
    setSelectedIndex(index);
    if (text === 'Dashboard') {
      history.push({
        pathname: `/dashboard/main`
      })
    } else {
      history.push({
        pathname: `/dashboard/${text.toLowerCase()}`
      })
    }
  }


  return (

    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
        [classes.appBarShift]: main_drawer_open,
      })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={
              clsx(classes.menuButton, {
                [classes.hide]: main_drawer_open,
              })
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.textFont}>
            Shopping Mart
            </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: main_drawer_open,
          [classes.drawerClose]: !main_drawer_open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: main_drawer_open,
            [classes.drawerClose]: !main_drawer_open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List >
          {
            listItems.map((text, index) => {
              return (
                <ListItem
                  key={index}
                  button
                  selected={index === selectedIndex}
                  onClick={() => handleClick(index, text)}
                >
                  <ListItemIcon className={classes.menuIcons}>
                    {index === 0 && history.location.pathname === '/dashboard/main' ? (
                      <Dashboard />
                    ) : index === 1 && history.location.pathname === '/dashboard/products' ? (
                      <ViewList />
                    ) : index === 2 ? (
                      <Mail />
                    ) : (
                      <MoveToInbox />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            })
          }
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default App;