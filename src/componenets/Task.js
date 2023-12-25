import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function Task({ task }) {
    const dispatch = useDispatch();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);
    const [isEditingPriority, setIsEditingPriority] = useState(false);
    const [inputValues, setInputValues] = useState({
        title: task.title,
        category: task.category,
        dueDate: task.dueDate,
        priority: task.priority
    });

    const handleInputChange = (e, prop) => {
        setInputValues({ ...inputValues, [prop]: e.target.value });
    };

    const handleBlur = (prop) => {
        dispatch({ type: 'EDIT_TASK', payload: { id: task.id, updates: { [prop]: inputValues[prop] } } });
        setIsEditingTitle(false);
        setIsEditingCategory(false);
        setIsEditingDueDate(false);
        setIsEditingPriority(false);
    };


    return (
        <div className="taskItem" style={task.completed ?
            { backgroundImage: "url('Images/Completed-bro.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }
            :
            { backgroundImage: "url('Images/Inprogress-bro.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }
        }>

            <div className="task-title">
                {isEditingTitle ? (
                    <input className="task-title-input" value={inputValues.title}
                        onChange={(e) => handleInputChange(e, 'title')}
                        onBlur={() => handleBlur('title')} />
                ) : (
                    <span onDoubleClick={() => setIsEditingTitle(true)}>Title: {task.title}</span>
                )}
                <p className="category">
                    {isEditingCategory ? (
                        <select className="category-input" value={inputValues.category}
                            onChange={(e) => handleInputChange(e, 'category')}
                            onBlur={() => handleBlur('category')}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <span onDoubleClick={() => setIsEditingCategory(true)}>Category: {task.category}</span>
                    )}
                </p>
                <p className="due-date">
                    {isEditingDueDate ? (
                        <input type="date" className="due-date-input" value={inputValues.dueDate}
                            onChange={(e) => handleInputChange(e, 'dueDate')}
                            onBlur={() => handleBlur('dueDate')} />
                    ) : (
                        <span onDoubleClick={() => setIsEditingDueDate(true)}>Due date: {task.dueDate}</span>
                    )}
                </p>
                <p>
                    {isEditingPriority ? (
                        <select className="priority-input" value={inputValues.priority}
                            onChange={(e) => handleInputChange(e, 'priority')}
                            onBlur={() => handleBlur('priority')}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    ) : (
                        <span onDoubleClick={() => setIsEditingPriority(true)}>
                            <span className="priority-label">Priority: </span>
                            <span className={`priority-value priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                        </span>
                    )}
                </p>
            </div>
            <div className="task-buttons">
                <button onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
                    {task.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
                </button>
                <button style={{ backgroundColor: 'red' }} onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
                    Delete Task
                </button>
            </div>
        </div>
    );
}

export default Task;