import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string)=> void
}

export function Todolist(props: PropsType) {

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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3>{props.title}</h3><button onClick={removeTodolist}>remove list</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    }
                )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active_filter': ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active_filter': ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active_filter': ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>)
}
