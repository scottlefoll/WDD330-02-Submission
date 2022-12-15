// A comment should consist of at least the name of the hike it is for, 
// a date, and the actual text of the comment. You will also need a comment 
// type to use as a key for when we store these to local storage.

// When the app loads we see a list of all hikes...below 
// we should also see a list of all comments with type:hike.
// When a hike is touched it will show us the details for that hike. 
// We should also see any comments for that hike, and an input and button to add a new comment.

// When the submit comment button is touched...

// A getAllComments and renderCommentList method.
// A comment type to use as a key.
// A filterCommentsByName method.
// An array to hold all of our comments.
// A comment should look something like this:

//     const newComment = {
//       name: hikeName,
//       date: new Date(),
//       content: comment
//     };
                    
// A method to add an event listener to the submit button.
// An addComment method

// Create a method in the class called showCommentsList. For now it can just return some 
// static text or log something out to the console.

// Insert your comment class into the hike class by adding a new instance of the comment 
// class in the constructor. Call the showCommentsList method when the list of hikes is 
// shown to make sure that you have things connected up correctly.

// When you are looking at a specific hike it should allow you to enter a new comment, 
// and should show all the comments below that form.

// Write the rest of the code to implement your commenting system. For now just store 
// your comments in an array.

//  Store It.
// Write the model code to store and retrieve the comments to/from local storage.

// Stretch Goals

// Stretch 1 Filtering comments
// When you are looking at a hike details screen you should only see the comments for that 
// hike. When you are looking at all hikes you should see all comments of type hike. Change 
// your code to support this.

// Stretch 2 Controlling comment entry
// When you are looking at a hike details screen...we should be able to enter a comment, 
// when you are looking at all hikes you should not be able to enter a new comment. Change 
// your code to support this.

// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.

import comments from './comments_solution.js';

//create an array of hikes
const hikeList = [
  {
    name: 'Bechler Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description:
      'Beautiful short hike along the Bechler river to Bechler Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
  },
  {
    name: 'Teton Canyon',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short (or long) hike through Teton Canyon.',
    directions:
      'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
  },
  {
    name: 'Denanda Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '7 miles',
    difficulty: 'Moderate',
    description:
      'Beautiful hike through Bechler meadows river to Denanda Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
  }
];

const imgBasePath = '//byui-cit.github.io/cit261/examples/';

export default class Hikes {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
    this.backButton = this.buildBackButton();
  }
  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllHikes() {
    return hikeList;
  }
  // For the first stretch we will need to get just one hike.
  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }
  //show a list of hikes in the parentElement
  showHikeList() {
    this.parentElement.innerHTML = '';
    // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
    renderHikeList(this.parentElement, this.getAllHikes());
    this.addHikeListener();
    // make sure the back button is hidden
    this.backButton.classList.add('hidden');
  }
  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneHikeFull(hike));
    // show the back button
    this.backButton.classList.remove('hidden');
  }
  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener() {
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('touchend', e => {
        // why currentTarget instead of target?
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }
  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- All Hikes';
    backButton.addEventListener('touchend', () => {
      this.showHikeList();
    });
    backButton.classList.add('hidden');
    this.parentElement.before(backButton);
    return backButton;
  }
}
// End of Hikes class
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHikeLight(hike));
  });
}
function renderOneHikeLight(hike) {
  const item = document.createElement('li');
  item.classList.add('light');
  // setting this to make getting the details for a specific hike easier later.
  item.setAttribute('data-name', hike.name);
  item.innerHTML = ` <h2>${hike.name}</h2>
<div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
<div>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
</div>`;

  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement('li');
  item.innerHTML = ` 
    
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        <h2>${hike.name}</h2>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>How to get there</h3>
            <p>${hike.directions}</p>
        </div>
    
    `;
  return item;
}

// select the form and add an event listener
// const form = document.querySelector('.js-form1');
// form.addEventListener('submit', event => {
//     // stop the browser from reloading the page
//     event.preventDefault();
//     // select input element
//     const input = document.querySelector('.js-todo-input');

//     // get the text from the input element and trim item
//     const text = input.value.trim();
//     if (text !== '') {
//         addTodo(text);
//         input.value = '';
//         input.focus();
//     }
//     // filterTodos('all');
// });

// function addTodo(text) {
//     let activeToDo = 0
//     const todo = {
//         id: Date.now(),
//         text,
//         checked: false,
//     };
//     todoItems.push(todo);
//     activeToDo = todoItems.filter(t => t.checked === false).length;
//     document.getElementById('js-tasks-left').innerHTML = activeToDo;
//     renderTodo(todo);
// }


// Get the ToDo items from local storage
// function renderTodo(todo) {
//     // save the ToDo items to local storage
//     // localStorage.setItem('todoItems', JSON.stringify(todoItems));
//     writeToLS('todoItems', todoItems);
//     const list = document.querySelector('.js-todo-list');
//     const item = document.querySelector(`[data-key='${todo.id}']`);

//     if (todo.deleted) {
//         item.remove();
//         if (todoItems.length === 0) list.innerHTML = '';
//         return
//     }

//     // if the item is checked, mark it 'done'
//     const isChecked = todo.checked ? 'done' : '';
//     // create a new list item
//     const node = document.createElement("li");
//     // set the class of the list item
//     node.setAttribute('class', `todo-item ${isChecked}`);
//     // set the data-key of the list item
//     node.setAttribute('data-key', todo.id);

//     // create the HTML for the list item
//     node.innerHTML = `
//         <input id="${todo.id}" type="checkbox"/>
//         <label for="${todo.id}" class="tick js-tick"></label>
//         <span>${todo.text}</span>
//         <button class="delete-todo js-delete-todo">
//         <svg><use href="#delete-icon"></use></svg>
//         </button>
//         `;

//     // if the item exists replace it, otherwise add the list item to the list
//     if (item) {
//         list.replaceChild(node, item);
//     } else {
//         list.append(node);
//     }
//     // filterTodos('all');
// }
