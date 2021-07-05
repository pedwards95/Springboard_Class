const TodoList = (props) => {
    return (
        <div>
            <h4>Todo List</h4>
            <ul>{props.todos.map(item => <li>{item}</li>)}</ul>
        </div>
    )
}