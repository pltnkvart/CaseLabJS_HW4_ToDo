const UsersUrl = 'https://jsonplaceholder.typicode.com/users/'
const ToDoURL = 'https://jsonplaceholder.typicode.com/todos/'

let usersData = [];
let todoData = [];

function getUsers() {
    const selectUser = document.getElementById('user-todo')
    fetch(UsersUrl)
        .then(response => response.json())
        .then(users => { 
            users.forEach(user => {
                usersData.push(user);
                const userSelect = document.createElement('option');
                userSelect.innerHTML = `${user.name}`;
                selectUser.appendChild(userSelect);
            });
            getToDos();
        })
        .catch(error => {
            alert(error);
        })
}

function searchUser(todo) {
    const userFind = usersData.find(user => user.id === todo.userId);
    return userFind.name;
}

function getToDos() {
    const listToDos = document.getElementById('todo-list')
    fetch(ToDoURL)
        .then(response => response.json())
        .then(todos => {
            todoData = todos;
            todos.forEach(todo => {
                const elem = document.createElement('li');
                elem.classList.add("todo-item");
                elem.innerHTML = `<input type="checkbox" id="isCompleted" ${todo.completed ? "checked" : ""}>
                                <span>${todo.title} <em>by</em> <b>${searchUser(todo)}</b></span>`
                listToDos.appendChild(elem);
            });
        })
        .catch(error => {
            alert(error);
        })
}


getUsers();