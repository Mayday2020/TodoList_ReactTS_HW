import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const [error, setError] = useState<string | null>(null)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField variant="outlined"
               value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}
               label="Title"
                helperText={error}/>
        <IconButton color="primary" onClick={addTask}>
            <AddBox />
        </IconButton>
    </div>
}