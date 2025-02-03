export type TaskActions = 
{type: 'add-task', payload: {task: string}} |
{type: 'show-modal'} 

export type TaskState = {
    task: string,
    modal: boolean
}

export const initialState : TaskState = {
    modal: false,
    task: ""
}

export const taskReducer = (
    state: TaskState = initialState,
    action: TaskActions
    ) => {
    if(action.type === 'add-task'){
        return {
            ...state,
            task: action.payload.task
        }
    }

    if(action.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    }
    return state
}