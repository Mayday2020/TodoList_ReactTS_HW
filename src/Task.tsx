import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string)=> void
    changeTaskStatus: (taskId: string, isDoneValue: boolean)=> void
    onChangeTaskTitle: (title: string, taskId: string)=> void
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue)
    },[props.changeTaskStatus, props.task.id])
    const onChangeTitleHandler = useCallback((title: string) => {
        props.onChangeTaskTitle(title, props.task.id)
    }, [props.onChangeTaskTitle, props.task.id])
    return <div>
        <div key={props.task.id} className={props.task.isDone ? 'is_done' : ''}>
            <Checkbox color="primary"
                      onChange={onChangeStatusHandler}
                      checked={props.task.isDone}/>
            <EditableSpan value={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    </div>
})