import {v1} from 'uuid';
import {TaskType, todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistItem: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> =  [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todos.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolistItem, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string, todolistItem: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistItem}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistsAC = (todos: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todos
    } as const
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) : void => {
        todolistsAPI.getTodolists()
            .then((res) => {
                let todos = res.data
                dispatch(setTodolistsAC(todos))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) : void => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId));
            })
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(todolistTitle)
            .then((res) => {
                let todolist = res.data.data.item
                dispatch(addTodolistAC(todolistTitle, todolist));
            })
    }
}
export const changeTitleTodolistTC = (todolistId: string, todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId, todolistTitle));
            })
    }
}






