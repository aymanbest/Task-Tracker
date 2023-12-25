import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

function NewTaskForm() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [category, setCategory] = useState('Other');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_TASK', payload: { id: v4(), title, completed: false, dueDate, priority, category } });
        setTitle('');
        setDueDate('');
    };

    return (
        <div>
            <form className="newTaskForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input id="title" value={title} onChange={e => setTitle(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default NewTaskForm;