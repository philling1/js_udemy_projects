const http = new easyHttp;

//Get posts
//http.get('http://jsonplaceholder.typicode.com/posts');

//Using return instead of console log we are doing 
//But this will return an error
/*const posts = http.get('http://jsonplaceholder.typicode.com/posts')
console.log(posts);*/
//Fixing the Above error
// http.get('http://jsonplaceholder.typicode.com/posts', function(err, posts){
//  if(err){
//  console.log(err);
//  }else{
//    console.log(posts);
//  }
// });

//Get Single Post
// http.get('http://jsonplaceholder.typicode.com/posts/1', function(err, post){
//  if(err){
//  console.log(err);
//  }else{
//    console.log(post);
//  }
// });

//Creating the Data
//const data = {
//  title: "Custom Post",
//  body: "This is a custom post"
//};

//Creating Post
//http.post('http://jsonplaceholder.typicode.com/posts', data, function(err, post){
//  if(err){
//      console.log(err);
//      }else{
//        console.log(post);
//      }
//})

//Update Post
//http.put('http://jsonplaceholder.typicode.com/posts/5', data, function(err, post){
//  if(err){
//    console.log(err);
//  }else{
//    console.log(post);
//    }
//});

//Delete Post
http.delete('http://jsonplaceholder.typicode.com/posts/1', function(err, response){
  if(err){
  console.log(err);
  }else{
    console.log(response);
  }
 });