const UsersUrl = 'https://jsonplaceholder.typicode.com/users/'
const ToDoURL = 'https://jsonplaceholder.typicode.com/todos/'

let usersData = [];
let todoData = [];

// GET METHODS
async function getUsers() {
    try {
        let response = await fetch(UsersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let text = await response.json();
        usersData = text;
        addUsers();
        getToDos();
    } catch (e) {
        alert(`Error: ${e.message} users`);
    }
}


async function getToDos() {
    try {
        let response = await fetch(ToDoURL);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} - ${response.text}`);
        }
        let text = await response.json();
        todoData = text;
        updateListToDo();
    } catch (e) {
        alert(`Error: ${e.message} todos`);
    }
}

function updateListToDo() {
    const listToDos = document.getElementById('todo-list');
    todoData.forEach(todo => {
        let elem = createToDo(todo);
        listToDos.appendChild(elem);
    })
}

function addUsers() {
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
    const checkbox = elem.querySelector("#isCompleted");
    checkbox.addEventListener("change", () => {
        changeCompleted(todo);
    });
    return elem;
}

function searchUser(todo) {
    const userFind = usersData.find(user => user.id === todo.userId);
    return userFind.name;
}

async function changeCompleted(todo) {
    try {
        let response = await fetch(ToDoURL + todo.id, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !todo.completed
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        let result = await response.json();
        console.log(result);
        todoData.find((elem) => elem.id === todo.id).completed = !todo.completed;
        console.log("asdasda", todoData);
    } catch (e) {
        alert(`Error: ${e.message} users`);
    }
}

window.addEventListener("offline", (e) => {
    console.log("offline");
});

window.addEventListener("online", (e) => {
  console.log("online");
});

getUsers();
// changeCompleted(1);