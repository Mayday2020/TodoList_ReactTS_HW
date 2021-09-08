export type ResponseAppStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: ResponseAppStatus
    error: string | null
}
const initialState = {
    status: 'loading' as ResponseAppStatus,
    error: null
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>

type ActionsType =  SetErrorActionType |
                    SetStatusActionType

export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setStatusAC = (status: ResponseAppStatus) => {
    return {type: 'APP/SET-STATUS', status} as const
}