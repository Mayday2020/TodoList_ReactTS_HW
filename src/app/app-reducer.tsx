export type ResponseAppStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: ResponseAppStatus
    error: string | null
}
const initialState = {
    status: 'idle' as ResponseAppStatus,
    error: 'Это какая-то ошибка! Вы не того взяли...'
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

type ActionsType = any
