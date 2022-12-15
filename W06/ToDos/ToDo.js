// Array to hold the ToDo items
let todoItems = [];
// Get the ToDo items from local storage
function renderTodo(todo) {
    // save the ToDo items to local storage
    // localStorage.setItem('todoItems', JSON.stringify(todoItems));
    writeToLS('todoItems', todoItems);
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = '';
        return
    }

    // if the item is checked, mark it 'done'
    const isChecked = todo.checked ? 'done' : '';
    // create a new list item
    const node = document.createElement("li");
    // set the class of the list item
    node.setAttribute('class', `todo-item ${isChecked}`);
    // set the data-key of the list item
    node.setAttribute('data-key', todo.id);

    // create the HTML for the list item
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
        </button>
        `;

    // if the item exists replace it, otherwise add the list item to the list
    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
    // filterTodos('all');
}

// This function is called when the user enters text into the ToDo text area, and 
// hits the enter key.  It creates a new ToDo item, and adds it to the todoItems array.
// ?? It then calls the renderTodo function to display the new ToDo item.
function addTodo(text) {
    let activeToDo = 0
    const todo = {
        id: Date.now(),
        text,
        checked: false,
    };
    todoItems.push(todo);
    activeToDo = todoItems.filter(t => t.checked === false).length;
    document.getElementById('js-tasks-left').innerHTML = activeToDo;
    renderTodo(todo);
}

// This function is called when the user clicks on a To Do item, and it toggles the checked
function toggleDone(key) {
    // find the index of the item in the array
    let activeToDo = 0
    const index = todoItems.findIndex(item => item.id === Number(key));
    // toggle the checked value of the item
    todoItems[index].checked = !todoItems[index].checked;
    // get the number of active ToDo item from local storage
    activeToDo = todoItems.filter(t => t.checked === false).length;
    document.getElementById('js-tasks-left').innerHTML = activeToDo;
    // display the updated ToDo list
    renderTodo(todoItems[index]);
}

// This function is called when the user clicks on the delete button for a ToDo item
function deleteTodo(key) {
    // find the index of the item in the array
    let activeToDo = 0
    const index = todoItems.findIndex(item => item.id === Number(key));
    // create a new object with the deleted property set to true
    const todo = {
        deleted: true,
        ...todoItems[index]
    }
    // replace the item in the array with the new object
    todoItems = todoItems.filter(item => item.id !== Number(key));
    // get the number of active ToDo item from local storage
    activeToDo = todoItems.filter(t => t.checked === false).length;
    document.getElementById('js-tasks-left').innerHTML = activeToDo;
    // display the updated ToDo list
    renderTodo(todo);
}


// select the form and add an event listener
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    // stop the browser from reloading the page
    event.preventDefault();
    // select input element
    const input = document.querySelector('.js-todo-input');

    // get the text from the input element and trim item
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
    // filterTodos('all');
});


// function filterTodos(filter) {
//     alert("You clicked filter - " + filter);
// }

// function to filter the ToDo items to display 'all', 'active', or 'completed' items
function filterTodos( filter ) {
    // alert("Entering filterTodos");
    const list = document.querySelector('.js-todo-list');    // 
    const items = list.querySelectorAll('.todo-item');
    // for each item, display it if it matches the filter
    items.forEach(item => {
        switch (filter) {
            case 'all':
                // alert("Case filter - all");
                item.style.display = 'flex';
                break;
            case 'active':
                // alert("Case filter - active");
                if (item.classList.contains('done')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
            case 'completed':
                // alert("Case filter - completed");
                if (item.classList.contains('done')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    });
}
