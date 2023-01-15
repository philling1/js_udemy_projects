function easyHttp(){
  this.http = new XMLHttpRequest();
}

//Make an HTTP GET Request
/*easyHttp.prototype.get = function(url){  
  this.http.open('GET', url, true);*/
//using callBacks
//easyHttp.prototype.get = function(url, callback){  
//  this.http.open('GET', url, true);

  //This returns an error because the this keyword scope here pertains to the function it is inside of
 /* this.http.onload = function(){
    if(this.http.status === 200){
      console.log(this.http.responseText);
    }
  }*/

  //Fixing the above using the ESC6 error function because it adds the lexical this 
  //it works as the above function  should have work aftr instantiating it in the app.js
  /*this.http.onload = () => {
    if(this.http.status === 200){
      console.log(this.http.responseText);
    }
  }*/

  //A commom way to fix this using ESC5 without the error function
  //Is to set another variable to the this keyword outside the function to capture the this keyword in that scope
  /*let self = this;
  this.http.onload = function(){
    if(self.http.status === 200){
      console.log(self.http.responseText);
    }
  }*/

  //we might thibnk that using return instead of console logging it in the function will work but it doesn't instead it returns undefined
  /*let self = this;
  this.http.onload = function(){
    if(self.http.status === 200){
      return self.http.responseText;
    }
  }*/
  //We can fix this using a callBack
  // let self = this;
  //this.http.onload = function(){
  //  if(self.http.status === 200){
  //    callback(null, self.http.responseText);
  //  }else{
  //    callback('error: ' + self.http.status);
  //  }
  //}

  //this.http.send();
//}

//Make an HTTP POST Request
//easyHttp.prototype.post = function(url, data, callback){
//  this.http.open('POST', url, true)
//  this.http.setRequestHeader('content-type', 'application/json')

//  let self = this;
//  this.http.onload = function(){
//      callback(null, self.http.responseText);
//    }
//    this.http.send(JSON.stringify(data));   
//  }

//Make an HTTP PUT Request
//easyHttp.prototype.put = function(url, data, callback){
//  this.http.open('PUT', url, true)
//  this.http.setRequestHeader('content-type', 'application/json')

//  let self = this;
//  this.http.onload = function(){
//      callback(null, self.http.responseText);
//    }
//    this.http.send(JSON.stringify(data));   
//  }

//Make an HTTP DELETE Request
easyHttp.prototype.delete = function(url, callback){  
  this.http.open('DELETE', url, true);

let self = this;
this.http.onload = function(){
  if(self.http.status === 200){
    callback(null, 'Post Deleted');
  }else{
    callback('error: ' + self.http.status);
  }
}

this.http.send();
}