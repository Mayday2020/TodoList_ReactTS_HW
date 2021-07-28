import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
function AppWithReducers() {
    let todolistId1 = v1(),
        todolistId2 = v1();
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn?', filter: 'all'},
        {id: todolistId2, title: 'What to buy?', filter: 'all'}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'English', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Limon', isDone: false}]
    })
    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
    }
    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId);
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action);
    }
    function changeTodolistTitle(newTitle: string, id: string){
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle));
    }
    function addTodolist(title: string){
        const action = addTodolistAC(title);
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              id={tl.id}
                                              key={tl.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
