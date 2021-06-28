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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListIcon from "@material-ui/icons/List";
import DoneIcon from "@material-ui/icons/Done";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ABlogo from "../../images/logo.png";

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
    background: 'white'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    background: 'white'
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

export default function PersistentDrawer({ user, setUser, history }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    service.logout().then(() => {
      setUser(null);
      history.push("/");
    });
  };

  //use hooks to define state
  const [open, setOpen] = React.useState(false);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [activeGoals, setActiveGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [createGoal, setCreateGoal] = useState(false);
  const [manageActivities, setManageActivities] = useState(false);
  const [manageCalendar, setManageCalendar] = useState(false);
  const [manageCompletedGoals, setManageCompletedGoals] = useState(false);

  // goals specific to user
  const getGoalsFromDB = async () => {
    const data = await service.getGoals();
    setGoals(data.data.goals ? data.data.goals : null);
  };

  useEffect(() => {
    getGoalsFromDB();
  }, [createGoal]);

  useEffect(() => {
    const active = goals.filter((goal) => goal.completed !== true);
    const completed = goals.filter((goal) => goal.completed === true);
    setActiveGoals(active);
    setCompletedGoals(completed);
  }, [goals]);

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
    setManageActivities(false);
    setManageCompletedGoals(false);
    history.push("/dashboard", { ...user });
  };

  const handleActivities = () => {
    setManageActivities(true);
    setCreateGoal(false);
    setSelectedGoal(null);
    setManageCompletedGoals(false);
    setManageCalendar(false);
    handleDrawerClose();
  };

  const handleCalendar = () => {
    setManageCalendar(true);
    setCreateGoal(false);
    setSelectedGoal(null);
    setManageActivities(false);
    setManageCompletedGoals(false);
    handleDrawerClose();
  };

  const handleCompletedGoals = () => {
    setManageCompletedGoals(true);
    setManageCalendar(true);
    setCreateGoal(false);
    setSelectedGoal(null);
    setManageActivities(false);
    handleDrawerClose();
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
            <img src={ABlogo} alt="AB logo" />
            </ListItem>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        background="white"
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
              <ListItem className={"reg"}>{user && <p>{user.username}</p>}</ListItem>
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
        <List>
          {activeGoals ? (
            activeGoals.map((goal) => (
              <ListItem
                className={"reg"}
                button
                key={goal._id}
                onClick={() => {
                  handleGoalSelect(goal);
                }}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary={goal.title} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText>No Active Goals</ListItemText>
            </ListItem>
          )}
        </List>

        <List>
          <Divider />

          {/* <Typography variant="h6" noWrap>
            <List>
              <ListItem>{user && <p>{user.username}</p>}</ListItem>
              <Divider />
              <ListItem
                className={"reg"}
                button
                onClick={() => {
                  handleCreateGoal();
                }}
              >
                Create a Goal
              </ListItem>
            </List>
          </Typography> */}

          <ListItem 
              className={"reg"}
              button
              onClick={() => {
                  handleCreateGoal();
                }} 
            >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={["reg", "big"]}>CREATE A GOAL</ListItemText>
          </ListItem>
        </List>

        <Divider />
        <List>
          <ListItem 
            button 
            onClick={handleActivities}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={["reg", "big"]}>ACTIVITIES</ListItemText>
          </ListItem>

          <ListItem 
            className={"reg"}
            button 
            onClick={handleCalendar}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={["reg", "big"]}>CALENDAR</ListItemText>
          </ListItem>

          <ListItem button onClick={handleCompletedGoals}>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={["reg", "big"]}>COMPLETED GOALS</ListItemText>
          </ListItem>

          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={["reg", "big"]}>LOGOUT</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main>
        <>
          <Dashboard
            // {...props}
            user={user}
            selectedGoal={selectedGoal}
            createGoal={createGoal}
            goals={goals}
            setGoals={setGoals}
            manageActivities={manageActivities}
            manageCompletedGoals={manageCompletedGoals}
            completedGoals={completedGoals}
            manageCalendar={manageCalendar}
            handleReturnToDashboard={handleReturnToDashboard}
          />
          {!activeGoals && <h2>Create a goal!</h2>}
        </>
      </main>
    </div>
  );
}
