import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  Theme,
  WithStyles,
  Menu,
  MenuItem,
  createMuiTheme,
  Paper
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ListAltIcon from "@material-ui/icons/ListAltTwoTone";

import { RouterStore } from "mobx-react-router";
import { inject, observer } from "mobx-react";

import Container from "../Container/Container";
import { AppStore } from "../../services/app.store";
import { ApiStore } from "../../services/api/api.store";
import ColorDot from "../ColorDot";

class LayoutRoute {
  constructor(
    public path: string,
    public name: string,
    public icon: React.ReactElement<any>
  ) {}
}

const routes: LayoutRoute[] = [
  new LayoutRoute("/week", "Week", <ViewWeekIcon />),
  new LayoutRoute("/year", "Year", <ListAltIcon />)
];

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2
    }
  });

interface DefaultLayoutProps extends WithStyles<typeof styles> {
  theme: Theme;
  router?: RouterStore;
  app?: AppStore;
  api?: ApiStore;
}

@inject("router", "app", "api")
@observer
class DefaultLayout extends React.Component<DefaultLayoutProps> {
  state = {
    mobileOpen: false,
    title: "",
    themeMenuEl: null
  };

  componentWillMount() {
    this.updateTitle();
  }

  componentWillUpdate() {
    this.updateTitle();
  }

  updateTitle = () => {
    for (let route of routes) {
      if (this.isActiveRoute(route.path) && this.state.title !== route.name) {
        this.setState({ title: route.name });
        document.title = `${route.name}`;
      }
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  isActiveRoute = (path: string) =>
    path === this.props.router!.history.location.pathname;

  openMenu = (event: any) => {
    this.setState({ themeMenuEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ themeMenuEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { themes } = this.props.app!;
    const { signOut } = this.props.api!;

    const isDark = theme.palette.type === "dark";

    const themeList = Object.keys(themes).map((key: string) => ({
      name: key,
      ...themes[key]
    }));

    const drawer = (
      <div>
        <AppBar
          position="static"
          color="default"
          style={{
            boxShadow: "none",
            background: "transparent",
            borderBottom: "solid 1px rgba(0,0,0,0.12)"
          }}
        >
          <Toolbar>
            <Typography color="inherit" variant="h6">
              {process.env.REACT_APP_NAME}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {routes.map((route, i) => (
            <ListItem
              key={i}
              button
              dense
              style={{
                background: this.isActiveRoute(route.path)
                  ? "rgba(0,0,0,0.06)"
                  : "transparent"
              }}
              onClick={() => this.props.router!.history.push(route.path)}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText>{route.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.title}
            </Typography>
            <div style={{ flex: "1 1" }} />
            <IconButton color="inherit" onClick={this.openMenu}>
              <ColorLensIcon />
            </IconButton>
            <IconButton color="inherit" onClick={signOut}>
              <ExitToAppIcon />
            </IconButton>
            <Menu
              open={this.state.themeMenuEl !== null}
              anchorEl={this.state.themeMenuEl}
              onClose={this.closeMenu}
            >
              {themeList.map((theme, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    this.props.app!.theme = theme;
                    this.closeMenu();
                  }}
                >
                  <ListItemIcon>
                    <ColorDot
                      color={createMuiTheme(theme).palette.primary.main}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    {theme.name[0].toUpperCase() + theme.name.slice(1)}
                  </ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Container>
            <Paper style={{ padding: "15px", borderRadius: 10 }}>
              {this.props.children}
            </Paper>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DefaultLayout);
