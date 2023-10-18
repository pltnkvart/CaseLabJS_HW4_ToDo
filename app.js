const UsersUrl = 'https://jsonplaceholder.typicode.com/users/'
const ToDoURL = 'https://jsonplaceholder.typicode.com/todos/'

let usersData = [];
let todoData = [];

async function getUsers() {
    let response = await fetch(UsersUrl);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} - ${response.text}`);
    }
    let text = await response.json();
    usersData = text;
    addUser();
    getToDos();
}


async function getToDos() {
    let response = await fetch(ToDoURL);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} - ${response.text}`);
    }
    let text = await response.json();
    todoData = text;
    updateListToDo();
}

function updateListToDo() {
    const listToDos = document.getElementById('todo-list');
    todoData.forEach(todo => {
        let elem = createToDo(todo);
        listToDos.appendChild(elem);
    })
}

function addUser() {
    const selectUserList = document.getElementById('user-todo');
    usersData.forEach(user => {
        userSelect = document.createElement('option');
        userSelect.innerHTML = `${user.name}`;
        selectUserList.appendChild(userSelect);
    })
}

function createToDo(todo) {
    let elem = document.createElement('li');
    elem.classList.add("todo-item");
    elem.setAttribute("value", todo.id);
    elem.innerHTML = `<input type="checkbox" id="isCompleted" ${todo.completed ? "checked" : ""}>
                        <span value >${todo.title} <em>by</em> <b>${searchUser(todo)}</b></span> 
                        <div class="close" onclick="removeToDo(${todo.id})" id="close">×</div>`
    return elem;
}

function searchUser(todo) {
    const userFind = usersData.find(user => user.id === todo.userId);
    return userFind.name;
}


getUsers();