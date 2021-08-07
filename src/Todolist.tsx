import React, {useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')
    const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => (props.changeFilter('all', props.id)),
        [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => (props.changeFilter('active', props.id)),
        [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => (props.changeFilter('completed', props.id)),
        [props.changeFilter, props.id]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props.changeTodolistTitle, props.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id])
    const removeTask = useCallback((taskId)=>{
        dispatch(removeTaskAC(taskId, props.id))
    } ,[dispatch, props.id])
    const changeTaskStatus = useCallback((taskId: string, isDoneValue: boolean)=>{
        dispatch(changeTaskStatusAC(taskId, isDoneValue, props.id))}, [dispatch, props.id])
    const onChangeTaskTitle = useCallback((title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, props.id))
    }, [props.id, dispatch])

    let tasksForTodolist = tasksObj;
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    return (
        <div>
            <span><EditableSpan value={props.title} onChange={changeTodolistTitle}/></span>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                                                 task={t}
                                                 todolistId={props.id}
                                                 removeTask={removeTask}
                                                 changeTaskStatus={changeTaskStatus}
                                                 onChangeTaskTitle={onChangeTaskTitle}/>)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color="default">All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color="primary">Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color="secondary">Completed
                </Button>
            </div>
        </div>)
})
