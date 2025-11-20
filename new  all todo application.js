let todoItemsConatiner = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todolist");
    let parseTodoList = JSON.parse(stringifiedTodoList);
    if (parseTodoList === null) {
        return [];
    } else {
        return parseTodoList;
    }
}
let todolist = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
};
let todosCount = todolist.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let LabelElement = document.getElementById(labelId);
    LabelElement.classList.toggle("checked");
    let todoObjectIndex = todolist.findIndex(
        function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }

    );
    let todoObject = todolist[todoObjectIndex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsConatiner.removeChild(todoElement);

    let deleteElementIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todolist.splice(deleteElementIndex, 1);
}

function createAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-items-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsConatiner.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkBox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.ischecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelConainer = document.createElement("div");
    labelConainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelConainer);

    let LabelElement = document.createElement("label");
    LabelElement.setAttribute("for", checkboxId);
    LabelElement.id = labelId;
    LabelElement.classList.add("checkbox-label");
    LabelElement.textContent = todo.text;
    if (todo.ischecked === true) {
        LabelElement.classList.add("checked");
    }
    labelConainer.appendChild(LabelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelConainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todolist) {
    createAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        ischecked: false
    };
    todolist.push(newTodo);
    createAppendTodo(newTodo);
    userInputElement.value = "";
}
addTodoButton.onclick = function() {
    onAddTodo();
};