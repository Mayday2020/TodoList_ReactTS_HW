import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

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

export function Todolist(props: PropsType) {
    const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

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
                <Delete />
            </IconButton>
            <AddItemForm addItem={(title: string)=>{dispatch(addTaskAC(title, props.id))}} />
            <div>
                {tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const onChangeTitleHandler = (title: string) => {
                        dispatch(changeTaskTitleAC(t.id, title, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? 'is_done' : ''}>
                        <Checkbox color="primary"
                                  onChange={onChangeStatusHandler}
                                  checked={t.isDone}/>
                        <EditableSpan value={t.title}
                                      onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })}
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
}
