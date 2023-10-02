function TodoItem({ status, onChangeStatus, onEdit, onDelete, children }) {
    return (
        <div className="todo-item">
            <div className="todo-content">
                <input type="checkbox" checked={status} onClick={() => onChangeStatus()} />
                {children}
            </div>
            <div className="todo-btn">
                <button onClick={() => onEdit()} style={{ marginRight: '4px' }}>
                    edit
                </button>
                <button onClick={() => onDelete()}>delete</button>
            </div>
        </div>
    );
}

export default TodoItem;
