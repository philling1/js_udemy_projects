// Book Constructors: which is going to handle creating the actual book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructors: They are going to be a set of prototype methods that are going to be used to perform some certain function on the book object e.g; delete book, add book etc.
function UI() {}

//Adding Book to the list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //creating the trow element
  const row = document.createElement('tr');
  //And then inserting the colons
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  //Adding the list items to the rows
  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className){
  //creating a div element to display the message
  const div = document.createElement('div');
  //Adding a className to the div element created
  div.className = `alert ${className}`;
  //Adding the display text node
  div.appendChild(document.createTextNode(message));
  //Get the parent element to dispaly the error message before the form using th event bubbling
  const container = document.querySelector('.container');
  //Then getting the form
  const form = document.querySelector('#book-form');
  //Inserting the alert
  container.insertBefore(div, form);

  //Setting the timeout for the error message to display
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);

}

//Delete book 
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//Clearing the fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}

//Event Listeners for adding book to the UI
document.getElementById('book-form').addEventListener('submit', function(e){
  //Getting form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiating the Book object
  const book = new Book(title, author, isbn);
  //Also instantiating the UI object
  const ui = new UI();

  //Validating the user inputs
  if(title === "" || author === "" || isbn === ""){
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Adding book to the list items
  ui.addBookToList(book);

  //display success message when book is added
  ui.showAlert('Book Added', 'success');

  //Clear fields after input
  ui.clearFields();
  }

  e.preventDefault();
});


//Event listener for deleting book  from the UI
document.getElementById('book-list').addEventListener('click', function(e){
  //instantiating the object as we did before
  const ui = new UI()
  ui.deleteBook(e.target);

  //Displaying message to the UI after a book have deleted
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
})