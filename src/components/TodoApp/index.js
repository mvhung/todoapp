import { useReducer, useRef, useState } from 'react';
import TodoItem from '../TodoItems';

const initTodo = [
    {
        id: 1,
        task: 'quet nha',
        status: true,
    },
    {
        id: 2,
        task: 'quet nha',
        status: true,
    },
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            if (action.newTask) {
                return [...state, action.newTask];
            }
            return;
        case 'CHANGE_STATUS':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    let newState = { ...todo, status: !todo.status };
                    // console.log(newState ,action.status)
                    return newState;
                } else {
                    return todo;
                }
            });
        case 'DELETE':
            return state.filter((todo) => todo.id !== action.id);
        case 'EDIT':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    let newTodo = { ...todo, task: action.newTask };
                    // console.log(newTodo ,action.status)
                    return newTodo;
                } else {
                    return todo;
                }
            });
        default:
            return;
    }
};
function TodoApp() {
    const [newTask, setNewTask] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState(false);
    const [taskId, setTaskId] = useState();
    const [editMode, setEditMode] = useState(false);

    const [todos, dispatch] = useReducer(reducer, initTodo);
    const input = useRef(null);

    const handleChangeStatus = (todo) => {
        return dispatch({ type: 'CHANGE_STATUS', id: todo.id });
    };

    const handleDelete = (todo) => {
        return dispatch({ type: 'DELETE', id: todo.id });
    };

    const handleAdd = () => {
        console.log({ id: todos.length + 1, task: newTask, status: newTaskStatus });
        return dispatch({ type: 'ADD_TASK', newTask: { id: todos.length + 1, task: newTask, status: newTaskStatus } });
    };

    const handleEdit = (id, newTask) => {
        console.log(id, newTask);
        return dispatch({ type: 'EDIT', id: id, newTask: newTask });
    };

    const submitEdit = () => {
        console.log({ id: todos.length + 1, task: newTask, status: newTaskStatus });
        setEditMode(false);
        setNewTask('');
        setNewTaskStatus(false);
        return dispatch({ type: 'EDIT', id: taskId, newTask: { id: taskId, task: newTask, status: newTaskStatus } });
    };
    return (
        <div className="container">
            <h1>My Todos</h1>
            <div className="input-container">
                <div className="new-task">
                    {/* <input
                        type="checkbox"
                        checked={newTaskStatus}
                        onChange={() => {
                            return setNewTaskStatus(!newTaskStatus);
                        }}
                    /> */}
                    <input
                        placeholder="add your task"
                        ref={input}
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </div>
                <button className="add-btn" onClick={editMode ? submitEdit : handleAdd}>
                    {editMode ? 'EDIT' : 'Save'}
                </button>
            </div>
            <div className="list-tasks">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        status={todo.status}
                        onChangeStatus={() => handleChangeStatus(todo)}
                        onDelete={() => handleDelete(todo)}
                        onEdit={handleEdit}
                    >
                        {todo.task}
                    </TodoItem>
                ))}
            </div>
        </div>
    );
}

export default TodoApp;
