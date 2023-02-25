function easyHttp(){
  this.http = new XMLHttpRequest();
}

//Make an HTTP GET Request
easyHttp.prototype.get = function(url, callback){  
  this.http.open('GET', url, true);

  // using  callBack and self for the scoping rules
  let self = this;
  this.http.onload = function(){
    if(self.http.status === 200){
    callback(null, self.http.responseText);
    }else{
     callback('error: ' + self.http.status);
    }
  }

  this.http.send();
}

//Make an HTTP POST Request
 easyHttp.prototype.post = function(url, data, callback){
  this.http.open('POST', url, true)
  this.http.setRequestHeader('content-type', 'application/json')

  let self = this;
  this.http.onload = function(){
      callback(null, self.http.responseText);
    }
   this.http.send(JSON.stringify(data));   
  }

// Make an HTTP PUT Request
easyHttp.prototype.put = function(url, data, callback){
  this.http.open('PUT', url, true)
  this.http.setRequestHeader('content-type', 'application/json')

  let self = this;
  this.http.onload = function(){
      callback(null, self.http.responseText);
    }
    this.http.send(JSON.stringify(data));   
  }

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