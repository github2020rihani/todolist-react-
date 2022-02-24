import React from 'react';
//ROUTER
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
//make styles
import {makeStyles} from "@material-ui/core";

//custom Component
import TodoContextProvider from "../contexts/TodoContext";
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import Navigation from "./Navigation";

import NotFound from "./NotFound";
import Login from './Login';


const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}));

const TodoList = () => (
    <TodoContextProvider>
        <TodoTable/>
        <AppSnackbar/>
    </TodoContextProvider>
)

const Router = () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <Navigation/>
            <div className={classes.divider}/>
            <Routes>
                <Route exact path="/" element={<TodoList/>}></Route>
                <Route exact  path="/todo-list" element={<TodoList/>}></Route>
                <Route exact path="/tag-list" element={<TodoList/>}></Route>
                <Route  path="/login" element={<Login/>}></Route>
                <Route  path="/*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}


export default Router;