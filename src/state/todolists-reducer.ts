import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType|
    ChangeTodolistTitleActionType|
    ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

let initialState: TodolistType[] = [
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return([...state])
        case 'CHANGE-TODOLIST-FILTER':
            let todolistFilter = state.find(tl => tl.id === action.id)
            if (todolistFilter){
                todolistFilter.filter = action.filter
            }

            return [...state]
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", todolistId: todolistId}
}
export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: todolistTitle, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: todolistTitle}
}
export const changeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: todolistFilter}
}
