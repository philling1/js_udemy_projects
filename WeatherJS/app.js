//init the storage class
//const storage = new Storage();

//Get stored location data
//const weatherLocation = storage.getLocationData();

//init the weather object
const weather = new Weather('Miami' );

//Init UI
//const ui = new UI();

//Get weather on DOM load
//document.addEventListener('DOMContentLoaded', getWeather);

//Change location event
//document.getElementById('w-change-btn').addEventListener('click', (e) => {
  //const city = document.getElementById('city').value;
  //const state = document.getElementById('state').value;

  //change location
  //weather.changeLocation(city, state);

  //Set location in LS
  //storage.setLocationData(city, state);

  //Get and display final weather after changing the city and state
  //getWeather();

  //then closing the modal after displayng the weather
  //$('#locModal').modal('hide');
//})

//function getWeather(){
  weather.getWeather()
    .then(results => {
      //ui.paint(results);
      console.log(results);
    })
  .catch(err => console.log(err));
//}