// This function is called when the user clicks on a To Do item, and it toggles the checked status
const list = document.querySelector('.js-todo-list');
const button = document.querySelector('a').click();
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

});

const jumpLinks = document.querySelectorAll("a[href^='#']");

jumpLinks.forEach(link => {
 link.addEventListener('click', event => {
    event.preventDefault();
    // user clicked on a filter link - call the filterTodos function and 
    // pass the filter type as an argument
    // alert('You clicked on a filter link.' + event.target.classList);
    if (event.target.classList.contains("js-filter-active")) {
      // alert('Entering if active statement');
      filterTodos('active');
  } else if (event.target.classList.contains("js-filter-completed")) {
      // alert('Entering if active statement');
      filterTodos( 'completed' );
  } else if (event.target.classList.contains("js-filter-all")) {
      // alert('Entering if active statement');
      filterTodos( 'all' );
  }
 });
});


// function to load the ToDo items from local storage
document.addEventListener('DOMContentLoaded', () => {
    // get the ToDo items from local storage
    // const ref = localStorage.getItem('todoItems');
    let activeToDo = 0;
    const ref = readFromLS('todoItems');
    
    // if there are ToDo items in local storage, then 
    // parse them and add them to the todoItems array
    if (ref) {
      todoItems = ref;
      // get the number of active ToDo item from local storage
      activeToDo = todoItems.filter(t => t.checked === false).length;
      document.getElementById('js-tasks-left').innerHTML = activeToDo;
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }


    
  });