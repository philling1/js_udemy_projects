const http = new EasyHTTP3;

//Get Users;
http.get('http://jsonplaceholder.typicode.com/users')
.then(data => console.log(data))
.catch(err => console.log(err));

//Creating the data firstly before posting
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
}

//creating the post
http.post('http://jsonplaceholder.typicode.com/users', data)
.then(data => console.log(data))
.catch(err => console.log(err));

//Update Post or put post
http.put('http://jsonplaceholder.typicode.com/users/2', data)
.then(data => console.log(data))
.catch(err => console.log(err));

//Delete Users
http.delete('http://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(err => console.log(err));