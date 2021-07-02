import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () =>{
        setEditMode(true)
        setTitle(props.value)
    }
    const activatedViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input onChange={onChangeTitleHandler} onBlur={activatedViewMode} value={title} autoFocus/>
        : <span onDoubleClick={activateEditMode}>---{props.value}</span>
}