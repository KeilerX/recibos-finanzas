import React from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { logout } from '../../store/actions/authActions';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#A9A9A9",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const SingedInLinks = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const cleanLocalStorage = () => {
    setOpen(false);
    if(localStorage.getItem("to")) {
      localStorage.removeItem("to");
    }
  }

  const toLogout = (e) => {
    cleanLocalStorage();
    dispatch(logout());
  }

  const toHome = (e) => {
    cleanLocalStorage();
    history.push("/");
  }

  const toCurrency = (e) => {
    cleanLocalStorage();
    history.push("/currency");
  }

  const toReceipt = (e) => {
    cleanLocalStorage();
    localStorage.setItem("to", "/receipt");
    localStorage.setItem('operation_type', 'receipt')
    history.push("/check-currency");

  }

  const toWallet = (e) =>  {
    cleanLocalStorage()
    localStorage.setItem("to", "/wallet");
    localStorage.setItem('operation_type', 'wallet')
    history.push("/check-currency");
  }

  const toMyReceipts = (e) => {
    cleanLocalStorage()
    history.push("/receipt-table")
  }

  const toMyWallets = (e) => {
    cleanLocalStorage()
    history.push("/wallet-table")
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            PrePay
        </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={e => toHome(e)}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Principal" />
          </ListItem>
          <ListItem button onClick={e => toReceipt(e)}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Generar Recibo" />
          </ListItem>
          <ListItem button onClick={e => toWallet(e)}>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary="Generar Cartera" />
          </ListItem>
          <ListItem button onClick={e => toMyReceipts(e)}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Mis Recibos" />
          </ListItem>
          <ListItem button onClick={e => toMyWallets(e)}>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary="Mis Carteras" />
          </ListItem>
          <ListItem button onClick={e => toCurrency(e)}>
            <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
            <ListItemText primary="Mis Monedas" />
          </ListItem>
          <ListItem button onClick={(e) => toLogout(e)}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default SingedInLinks;
