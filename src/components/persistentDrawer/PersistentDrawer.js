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

  //use hook to define state
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
  const fetchData = async () => {
    const data = await service.getGoals();
    setGoals(data.data.goals ? data.data.goals : null);
  };

  useEffect(() => {
    fetchData();
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
    console.log("you clicked manage calender", manageCalendar);
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
              <ListItem>{user && <p>{user.username}</p>}</ListItem>
              <Divider />
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
        <List>
          {activeGoals ? (
            activeGoals.map((goal) => (
              <ListItem
                button
                key={goal._id}
                onClick={() => {
                  handleGoalSelect(goal);
                }}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary={goal.name} />
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
        <Divider />
        <List>
          <ListItem button onClick={handleActivities}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>Activities</ListItemText>
          </ListItem>

          <ListItem button onClick={handleCalendar}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </ListItem>

          <ListItem button onClick={handleCompletedGoals}>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText>Completed Goals</ListItemText>
          </ListItem>

          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
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
            handleReturnToDashboard={handleReturnToDashboard}
            goals={goals}
            setGoals={setGoals}
            manageActivities={manageActivities}
            setManageActivities={setManageActivities}
            manageCompletedGoals={manageCompletedGoals}
            setManageCompletedGoals={setManageCompletedGoals}
            completedGoals={completedGoals}
          />
          {!activeGoals && <h2>Create a goal!</h2>}
        </>
      </main>
    </div>
  );
}
