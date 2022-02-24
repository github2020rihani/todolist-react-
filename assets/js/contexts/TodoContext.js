import React, {createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: {}
        };
        this.readTodo();
    }

    //create
    createTodo(e, todo) {
        e.preventDefault();
        axios.post('/api/task/create', todo)
            .then(response => {
                if (response.data.message.level === 'success') {
                    // console.log(response.data);
                    let data = [...this.state.todos];
                    data.push(response.data.todo);
                    this.setState({
                        todos: data,
                        message: response.data.message
                    })
                }else{
                    this.setState({
                        message: response.data.message
                    })
                }
            })
            .catch(error => {
                console.log(error);

            });


    }

    //update
    updateTodo(data) {
        axios.put('/api/task/update/'+data.id, data)
            .then((response => {
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message
                    })
                }else{
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    })
                    todo.name = response.data.todo.name;
                    todo.description = response.data.todo.description;
                    this.setState({
                        todos: todos,
                        message: response.data.message
                    })
                }


            })).catch(error => {
                console.log(error);

        })

    }


    //read
    readTodo() {
        axios.get('/api/task/read')
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });

    }


    //delete
    deleteTodo(data) {
        axios.delete('/api/task/delete/'+data.id)
            .then(response => {
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message

                    })
                }else{
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    })
                    todos.splice(todos.indexOf(todo), 1);

                    this.setState({
                        todos: todos,
                        message: response.data.message

                    })
                }

            })
            .catch(error => {

            })

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) =>this.setState({message: message})
            }}>
                {this.props.children}
            </TodoContext.Provider>


        )
    }
}

export default TodoContextProvider;