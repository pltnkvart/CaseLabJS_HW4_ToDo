const UsersUrl = 'https://jsonplaceholder.typicode.com/users/'
const ToDoURL = 'https://jsonplaceholder.typicode.com/todos'

function getUsers() {
    const selectUser = document.getElementById('user-todo')
    fetch(UsersUrl)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userSelect = document.createElement('option');
                userSelect.innerHTML = `${user.name}`
                selectUser.appendChild(userSelect);
            });
        })
        .catch(error => {
            alert(error);
        })
}

function searchUser(todo, users) {
    const user = users.find(user => user.id === todo.userId);
    return user.name;
}

function getToDos() {
    const listToDos = document.getElementById('todo-list')
    fetch(ToDoURL)
        .then(response => response.json())
        .then(todos => {
            fetch(UsersUrl)
                .then(response => response.json())
                .then(users => {
                    todos.forEach(todo => {
                        const elem = document.createElement('li');
                        elem.classList.add("todo-item");
                        elem.innerHTML = `<input type="checkbox" id="isCompleted" ${todo.completed ? "checked" : ""}>
                                <span>${todo.title} <em>by</em> <b>${searchUser(todo, users)}</b></span>`
                        listToDos.appendChild(elem);
                    });
                })
                .catch(error => {
                    alert(error);
                })
        })
        .catch(error => {
            alert(error);
        })
}

getUsers()
getToDos()


