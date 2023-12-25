const savedState = JSON.parse(localStorage.getItem('state'));

const initialState = {
    tasks: savedState ? savedState.tasks : []
};

function Reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = action.payload;
            if (newTask && newTask.id && newTask.title && newTask.completed !== null) {
                newState = {
                    ...state,
                    tasks: [...state.tasks, newTask]
                };
            } else {
                newState = state;
            }
            break;
        case 'DELETE_TASK':
            newState = {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
            break;
        case 'TOGGLE_TASK':
            newState = {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
            break;
            case 'EDIT_TASK':
            newState = {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
                )
            };
            break;
        default:
            newState = state;
    }

    localStorage.setItem('state', JSON.stringify(newState));

    return newState;
}

export default Reducer;
