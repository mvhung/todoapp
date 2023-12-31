import { useReducer, useRef, useState } from 'react';
import TodoItem from '../TodoItems';
const initTodo = JSON.parse(localStorage.getItem('todotask')) || [
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
const saveSate = (state) => {
    localStorage.setItem('todotask', JSON.stringify(state));
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            if (action.newTask) {
                let newState = [...state, action.newTask];
                saveSate(newState);
                return newState;
            }
            return;
        case 'CHANGE_STATUS':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    let newState = { ...todo, status: !todo.status };
                    // console.log(newState ,action.status)
                    saveSate(newState);
                    return newState;
                } else {
                    return todo;
                }
            });
        case 'DELETE':
            let delState = state.filter((todo) => todo.id !== action.id);
            saveSate(delState);
            return delState;
        case 'EDIT':
            let editState = state.map((todo) => {
                if (action.id === todo.id) {
                    let newTodo = { ...todo, task: action.newTask };
                    // console.log(newTodo ,action.status)
                    return newTodo;
                } else {
                    return todo;
                }
            });
            saveSate(editState);
            return editState;
        default:
            return;
    }
};
function TodoApp() {
    const [newTask, setNewTask] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [newTaskStatus, setNewTaskStatus] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [nullTask, setNullTask] = useState(false);

    const [todos, dispatch] = useReducer(reducer, initTodo);
    const input = useRef(null);

    const handleChangeStatus = (todo) => {
        return dispatch({ type: 'CHANGE_STATUS', id: todo.id });
    };

    const handleDelete = (todo) => {
        let text = 'do you want to delete this task?';
        // eslint-disable-next-line no-restricted-globals
        if (confirm(text) === true) {
            return dispatch({ type: 'DELETE', id: todo.id });
        } else {
            return;
        }
    };

    const handleAdd = () => {
        if (!newTask) {
            setNullTask(true);
            return;
        }
        setNullTask(false);
        let Task = { id: todos.length + 1, task: newTask, status: newTaskStatus };
        setNewTask('');

        // console.log({ id: todos.length + 1, task: newTask, status: newTaskStatus });
        return dispatch({ type: 'ADD_TASK', newTask: Task });
    };

    const handleEdit = (id, newTask) => {
        console.log(id, newTask);
        return dispatch({ type: 'EDIT', id: id, newTask: newTask });
    };

    const submitEdit = () => {
        // console.log({ id: todos.length + 1, task: newTask, status: newTaskStatus });
        setEditMode(false);
        // setNewTask('');
        // setNewTaskStatus(false);
        // return dispatch({ type: 'EDIT', id: taskId, newTask: { id: taskId, task: newTask, status: newTaskStatus } });
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
                        className={nullTask ? 'errorInput' : ''}
                        placeholder={nullTask ? 'cant be null at this field' : 'add your tasks'}
                        ref={input}
                        type="text"
                        value={newTask}
                        onChange={(e) => {
                            setNullTask(false);
                            setNewTask(e.target.value);
                        }}
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
