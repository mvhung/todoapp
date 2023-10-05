import { useRef, useState } from 'react';
import { uppercaseFirstLetter } from '../../utils';

function TodoItem({ id, status, onChangeStatus, onEdit, onDelete, children }) {
    const [edit, setEdit] = useState(false);
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);

    const [task, setTask] = useState(children);

    const handleChangeTask = (value) => {
        setTask(value);
    };

    const handleBlur = (event) => {
        // Check if the related target of the blur event is the edit button
        if (event.relatedTarget && event.relatedTarget.classList.contains('edit-btn')) {
            return;
        }

        setTask(children);
        setEdit(false);
    };

    const handleEdit = (id) => {
        console.log(inputWrapperRef);
        inputWrapperRef.current.blur();
        setEdit(false);
        onEdit(id, inputRef.current.value);
    };
    return (
        <div className="todo-item">
            <div className="todo-content">
                <input type="checkbox" checked={status} onClick={() => onChangeStatus()} />
                <div className="task" ref={inputWrapperRef} onFocus={() => setEdit(true)} onBlur={handleBlur}>
                    <input
                        className="task"
                        ref={inputRef}
                        type="text"
                        value={uppercaseFirstLetter(task)}
                        onChange={(e) => handleChangeTask(e.target.value)}
                    />
                    {edit && (
                        <button className="edit-btn" onClick={() => handleEdit(id)} style={{ marginRight: '4px' }}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <div className="delete-btn">
                <button onClick={() => onDelete()}>remove</button>
            </div>
        </div>
    );
}

export default TodoItem;
