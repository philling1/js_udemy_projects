document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);

//Getting loccal text file data
function getText(e){
  //since fetch returns promises
  fetch('text.txt')
  //.then(function(res){
  //  return res.text();
  //using arrow function
  .then((res) => res.text())

  //.then(function(data){
  //with arrow function
  .then((data) => {
    console.log(data);
    document.getElementById('output').innerHTML= data;
  })
  //.catch(function(err){
  //  console.log(err)
  //})
  //with arrow function
  .catch(err => console.log(err))
  e.preventDefault();
}

//Getting local json data
function getJson(e){
  //since fetch returns promises
  fetch('post.json')
  //.then(function(res){
  //  return res.json();
  //using arrow function
  .then(res =>  res.json())
  //.then(function(data){
  //using arrow function
  .then(data => {
    console.log(data);

    let output ='';
    data.forEach(function(post){
      output += `<li>${post.title}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch(err => console.log(err))
  e.preventDefault();
}

//Getting data from external Api
function getExternal(e){
  //since fetch returns promises
  fetch('https://api.github.com/users')
  //.then(function(res){
  //  return res.json()
    //using arrow function
  .then(res =>  res.json())
  //.then(function(data){
    //using arrow function
  .then(data => {
    console.log(data);

    let output ='';
    data.forEach(function(user){
      output += `<li>${user.login}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  })
  //.catch(function(err){
  //  console.log(err)
  //})
  //using arrow function
  .catch(err =>console.log(err))
  e.preventDefault();
}