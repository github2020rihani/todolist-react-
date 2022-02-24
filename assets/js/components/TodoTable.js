import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";


import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from "./DeleteDialog";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, useTheme} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
const useStyles = makeStyles(theme => ({
    td: {
        padding: theme.spacing(3)
    },
    thead:{
        backgroundColor: theme.palette.primary.main,

    }
}));

// const styles = (theme) => createStyles({
//
//     thead: {
//         backgroundColor: 'red'
//     }
//
// })


function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deletConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBedeleted, setTodoToBedeleted] = useState('false');

    const classes = useStyles();
    const theme = useTheme();
    // const {classes} = props;

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodoName, description: addTodoDescription});
        setAddTodoName('');
        setAddTodoDescription('');
    }
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, name: editTodoName, description: editTodoDescription})
        setEditIsShown(false);
    }

    const clear = () => {
        setEditIsShown(false);

    }

    return (
        <Fragment>

            <Table>
                <TableHead className={classes.thead}>
                    <TableRow>
                        <TableCell className={classes.td}>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right"> Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField value={addTodoName} onChange={(event) => {
                                    setAddTodoName(event.target.value)
                                }} label="New task" fullWidth={true}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField value={addTodoDescription} onChange={(event) => {
                                    setAddTodoDescription(event.target.value)
                                }} label="New description" fullWidth={true}/>
                            </form>
                        </TableCell>


                        <TableCell align="right">
                            <IconButton  onClick={onCreateSubmit}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                        <TextField value={editTodoName}
                                                   fullWidth={true}
                                                   autoFocus={true}
                                                   type="text"
                                                   onChange={(event) => {
                                                       setEditTodoName(event.target.value)
                                                   }}
                                                   InputProps={{
                                                       endAdornment:
                                                           <Fragment>
                                                               <IconButton onClick={clear}><CloseIcon/></IconButton>
                                                               <IconButton
                                                                   onClick={onEditSubmit.bind(this, todo.id)}><DoneIcon/></IconButton>
                                                           </Fragment>
                                                   }}
                                                   fullWidth={true}/>
                                    </form>
                                    :
                                    <Typography>{todo.name}</Typography>
                                }
                            </TableCell>
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                        <TextField value={editTodoDescription}
                                                   fullWidth={true}
                                                   autoFocus={true}
                                                   type="text"
                                                   onChange={(event) => {
                                                       setEditTodoDescription(event.target.value)
                                                   }}
                                                   InputProps={{
                                                       endAdornment:
                                                           <Fragment>
                                                               <IconButton onClick={clear}><CloseIcon/></IconButton>
                                                               <IconButton
                                                                   onClick={onEditSubmit.bind(this, todo.id)}><DoneIcon/></IconButton>
                                                           </Fragment>
                                                   }}
                                                   fullWidth={true}/>
                                    </form>
                                    :
                                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" onClick={() => {
                                    setEditIsShown(todo.id);
                                    setEditTodoName(todo.name)
                                    setEditTodoDescription(todo.description)
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary" onClick={() => {
                                    setDeleteConfirmationIsShown(true);
                                    setTodoToBedeleted(todo);
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {deletConfirmationIsShown && (
                <DeleteDialog
                    open={deletConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                    todo={todoToBedeleted}
                >
                </DeleteDialog>


            )}


        </Fragment>

    );


}


export default TodoTable;
// export default withStyles(styles)(TodoTable);