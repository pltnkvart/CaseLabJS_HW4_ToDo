const UsersUrl = 'https://jsonplaceholder.typicode.com/users/'
const TodDoURL = 'https://jsonplaceholder.typicode.com/users/1/todos'

const selectUser = document.getElementById('user-todo')
const listToDos = document.getElementById('todo-list')

function getUsers() {
    fetch(UsersUrl)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userSelect = document.createElement('option');
                userSelect.innerHTML = `${user.name}`
                selectUser.appendChild(userSelect);
            });
        });
}

function getToDos() {
    fetch(TodDoURL)
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                const elem = document.createElement('li');
                elem.innerHTML = `<input type="checkbox" id="isCompleted">
                                <span>${todo.title}</span>`
                listToDos.appendChild(elem);
            });
        });
}

getUsers()
getToDos()


