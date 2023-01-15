class Weather {
  constructor() {
    this.apiKey = '808e5eec45b2efd7a3bcf1b3b50ba6b0';
    this.city = city;
  }

  //Fetching weather from the api
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={${this.city}}&appid={${this.apiKey}}`);

    const responseData = await response.json();

    return  responseData;
  }

  //Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}