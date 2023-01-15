//Define UI VARS:
const form = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput  = document.querySelector('#task');

//calling a function to load all event listeners
loadEventListeners();

//creating the actual functon to load all event listeners
function loadEventListeners(){
  //DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event
  form.addEventListener('submit', addTask);

  //remove task event:
  taskList.addEventListener('click', removeTask)

  //clear task event
  clearBtn.addEventListener('click', clearTask);

  //filter task event
  filter.addEventListener('keyup', filterTasks)

}

//GET Task from local storage AFTER persisting it:
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //creating  a list item for the task that are been added
   const li = document.createElement('li');
   //Adding a className to the list element
   li.className = 'collection-item';

   //creating a text node and append it to the list item
   li.appendChild(document.createTextNode(task));
   
   //creating the delete link icon besides the different task
   const link = document.createElement('a');
   //Adding className to the link element
   link.className = 'delete-item secondary-content';
   //Adding the icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   /* fa-remove is the remove icon*/
   //Appending the link to the li
   li.appendChild(link);

   //Then Appending the li to the ul
   taskList.appendChild(li);
  });
}

//1st task: Add task to the task list:

function addTask(e){
   if(taskInput.value === ''){
     alert('Add a task');
   }
  //creating  a list item for the task that are been added
   const li = document.createElement('li');
   //Adding a className to the list element
   li.className = 'collection-item';
   /**
    * We used collection-item as the className for the list item because in materailize if you want your ul to look good,  your ul should have a class of "collection" and your li should have a class of "collection-item"
    */

   //creating a text node and append it to the list item
   li.appendChild(document.createTextNode(taskInput.value));
   
   //creating the delete link icon besides the different task
   const link = document.createElement('a');
   //Adding className to the link element
   link.className = 'delete-item secondary-content';
   /**
    * If u want to have something to the right of another element in materailize it has to have the secondary */
   //Adding the icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   /* fa-remove is the remove icon*/
   //Appending the link to the li
   li.appendChild(link);

   //Then Appending the li to the ul
   taskList.appendChild(li);

   //Persisting to local storage:
   storeTaskInLocalStorage(taskInput.value);

   //clear input after submitting
   taskInput.value = '';
  e.preventDefault();
}

//Storing task in local storage:
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

//2nd task: removing the task 
function removeTask(e){
  //firstly we target the delete link
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
    e.target.parentElement.parentElement.remove();

    //REMOVE FROM  THE LOCAL STORAGE TOO:
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

//Remove the local storage function:
function removeTaskFromLocalStorage (taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear task function
function clearTask(e){
  //taskList.innerHTML = '';

  //OR
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  e.preventDefault();

  //Clear also from the local storage:
  clearTaskFromLocalStaorge();
}

function clearTaskFromLocalStaorge(){
  localStorage.clear();
}

//Filter task function
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const  item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}