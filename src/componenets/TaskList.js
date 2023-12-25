import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';


function TaskList() {

    const tasks = useSelector(state => state.tasks);

    const [selectedPriority, setSelectedPriority] = useState('All');

    const handlePriorityChange = (event) => {
        setSelectedPriority(event.target.value);
    };

    const completedTasks = tasks.filter(task => task.completed);
    const inProgressTasks = tasks.filter(task => !task.completed);
    const inProgressTasksFiltered = inProgressTasks.filter(task => selectedPriority === 'All' || task.priority === selectedPriority);
    const completedTasksFiltered = completedTasks.filter(task => selectedPriority === 'All' || task.priority === selectedPriority);

    const swapTaskPosition = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        });

        const updatedCompletedTasks = updatedTasks.filter(task => task.completed);
        const updatedInProgressTasks = updatedTasks.filter(task => !task.completed);

        return [...updatedInProgressTasks, ...updatedCompletedTasks];
    };

    return (
        <div >
            <select id="priority-filter" value={selectedPriority} className="filter-select" onChange={handlePriorityChange}>
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <table>
                <thead>


                    <tr>

                        <th>In Progress</th>
                        <th>Completed</th>

                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            {inProgressTasksFiltered.map(task => (
                                <Task key={task.id} task={task} swapTaskPosition={swapTaskPosition} />
                            ))}
                        </td>
                        <td>
                            {completedTasksFiltered.map(task => (
                                <Task key={task.id} task={task} swapTaskPosition={swapTaskPosition} />
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;