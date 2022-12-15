

function writeToLS(key, todoItems) {
    // save the ToDo items to local storage
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}


function readFromLS() {
    return JSON.parse(localStorage.getItem('todoItems'));
}

