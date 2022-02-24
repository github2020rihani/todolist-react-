//REACT
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
//MUI COMPONENTS
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    Typography,
    ListItemText,
    ListItemIcon,
    makeStyles,
} from '@material-ui/core';
//MUI ICONS
import {Menu as MenuIcon, List as ListIcon, Label as LabelIcon} from '@material-ui/icons';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    menuIcon: {
        marginRight: theme.spacing(2),
    },
    list:     {
        width: '200px',
    },
    link:     {
        textDecoration: 'none',
        color:          theme.palette.text.primary,
    },
}));

const Navigation = (props) => {
    const {history} = props;

    //styles
    const classes = useStyles();

    //state
    const [drawerOpen, setDrawerOpen] = useState(false);

    //functions
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerItems = [
        {
            text: 'TodoList',
            icon: <ListIcon/>,
            link: '/todo-list',
        },
        {
            text: 'Tags',
            icon: <LabelIcon/>,
            link: '/tag-list',
        },
    ];

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton onClick={toggleDrawer} className={classes.menuIcon} edge="start"><MenuIcon/></IconButton>
                <Link className={classes.link} to="/todo-list">
                    <Typography color="textPrimary" variant="h6">TodoApp</Typography>
                </Link>
                <Box flexGrow={1}/>
                <Button size="large">Login</Button>
            </Toolbar>
            <Drawer anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}>
                <List className={classes.list}>
                    {drawerItems.map((prop, index) => (
                        <Link className={classes.link}
                              onClick={() => props.history.push(prop.link)}
                              key={index}>
                            <ListItem button>
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;