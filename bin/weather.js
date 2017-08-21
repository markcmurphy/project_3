const express = require('express');
const request = require('request');
const apiKey = process.env.API_KEY;

const getWeather = (res, city) => {

  const responseToClient = (res, data) => {
    res.send(data)
  }

    request("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey, function(error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      console.log(typeof body)
      const parsedBody = JSON.parse(body)
      responseToClient(res, body)
      console.log(parsedBody.main.temp, parsedBody.name)
    });

// end of const getWeather
}

module.exports = getWeather;
