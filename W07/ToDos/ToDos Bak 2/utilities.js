// This function is called when the user clicks on a To Do item, and it toggles the checked status
const list = document.querySelector('.js-main-list');
let button = document.querySelector("button");
// add an event listener to the list
list.addEventListener('click', event => {
  // alert('You clicked on something');
    // if the user clicks on a To Do item, then toggle its 'checked' status
    // alert("You clicked on a ToDo item");
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
        // alert('Marked as done');
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
        // alert('Deleted');
    }

    if (event.target.classList.contains('js-filter-all')) {
        filterTodos('all');
        // alert('Filter All');
    }

    if (event.target.classList.contains('js-filter-active')) {
      alert("You clicked on the active filter");
      filterTodos('active');
      // alert('Filter Active');
    }
  
    if (event.target.classList.contains('js-filter-completed')) {
      alert("You clicked on the completed filter");
      filterTodos('completed');
      // alert('Filter Completed');
    }

});

// function to load the ToDo items from local storage
document.addEventListener('DOMContentLoaded', () => {
    // get the ToDo items from local storage
    // const ref = localStorage.getItem('todoItems');
    
    const ref = readFromLS('todoItems');
    // if there are ToDo items in local storage, then 
    // parse them and add them to the todoItems array
    if (ref) {
      todoItems = ref;
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });