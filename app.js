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
    let listToDos = document.getElementById('todo-list');
    listToDos.innerHTML = '';
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
                        <div class="close" onclick="deleteToDo(${todo.id})" id="close">×</div>`
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

// PATCH METHOD
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
    } catch (e) {
        alert(`Error changing TODO: ${e.message}`);
    }
}

function deleteInArr(todoID) {
    const index = todoData.findIndex(todoArr => todoArr.id === todoID)
    if (index > -1) {
        todoData.splice(index, 1);
        updateListToDo();
    }
}

// DELETE METHOD
async function deleteToDo(todoID) {
    try {
        let response = await fetch(ToDoURL + todoID, {
            method: 'DELETE',
        })
        let result = await response.json();
        console.log(result);
        if (response.ok) {
            deleteInArr(todoID);
        }
    } catch (e) {
        alert(`Error deleting TODO: ${e.message}`);
    }
}

// PUT METHOD
async function postToDo(userID, textToDo) {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: userID,
                title: textToDo,
                completed: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        let result = await response.json()
        console.log(result);
        if(response.ok){
            let newToDo = {
                userId: userID,
                title: textToDo,
                completed: false
            }
            todoData.unshift(newToDo);
            updateListToDo();
        }
    } catch (e) {
        alert(`Error adding TODO: ${e.message}`);
    }
}


getUsers();
