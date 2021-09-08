import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ResponseAppStatus} from "./app-reducer";

function App() {
    const status = useSelector<AppRootStateType, ResponseAppStatus>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            {status === 'loading' && <LinearProgress />}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App
