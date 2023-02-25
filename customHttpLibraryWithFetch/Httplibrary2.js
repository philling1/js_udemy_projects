/**
 * EasyHTTP Library
 * Library for making Http request
 * 
 * @version 2.0.0
 * @author mbadugha philip
 * @license MIT
 */

class EasyHTTP2{
  //Then going to making Http request
  //get(url){
  //  //without a promise
  //  fetch(url)
  //  .then(res => res.json())
  //  .then(data => console.log(data))
  //  .catch(err => console.log(err));
  //}
  get(url){
    //with a promise
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  //Make an Http POST Request
  post(url, data){
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  //Make an HTTP PUT Request
  put(url, data){
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  //Make an HTTP DELETE Request
  delete(url){
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => resolve('Resource deleted'))
      .catch(err => reject(err));
    });
  }

}