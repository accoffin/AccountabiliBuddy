import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import service from "../../utils/service";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dashboard from "../dashboard/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("you clicked logout");
    service.logout().then(() => {
      props.setUser(null);
      props.history.push("/");
    });
  };

  //use hook to define state
  const [goals, setGoals] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState("null");
  const [createGoal, setCreateGoal] = useState(false);

  // goals loaded on initial render only
  useEffect(() => {
    const fetchData = async () => {
      const data = await service.getGoals();
      setGoals(data.data.allGoals);
    };
    fetchData();
  }, []);

  //updates everytime selectedGoal is changed
  useEffect(() => {
    setCreateGoal(false);
    handleDrawerClose();
  }, [selectedGoal]);

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };

  const handleCreateGoal = () => {
    setCreateGoal(true);
    handleDrawerClose();
  };

  const handleReturnToDashboard = () => {
    setCreateGoal(false);
    setSelectedGoal(null);
    props.history.push("/dashboard");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <ListItem
              button
              onClick={() => {
                handleReturnToDashboard();
              }}
            >
              Goal Zone!
            </ListItem>
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
          <Typography variant="h6" noWrap>
            <List>
              <ListItem
                button
                onClick={() => {
                  handleCreateGoal();
                }}
              >
                Create Goal!
              </ListItem>
            </List>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {goals &&
            goals.map((goal, index) => (
              <ListItem
                button
                key={goal.name}
                onClick={() => {
                  handleGoalSelect(goal.name);
                }}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary={goal.name} />
              </ListItem>
            ))}

          {!goals &&
            ["You don't have any goals"].map((text, index) => (
              <ListItem key={text}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem button key={text} onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        {goals && (
          <Dashboard selectedGoal={selectedGoal} createGoal={createGoal} />
        )}
        {!goals && <h2>Create a goal!</h2>}
      </main>
    </div>
  );
}
