/**
 * This class responds to anyone that types !bot weather followed by their zipcode (e.g. !bot weather 90210) with the
 * current weather for that area!
 */
module.exports = {
    name: 'weather', // The name of the command
    description: 'Gets the weather', // The description of the command (for help text)
    usage: 'weather [zipcode]', // Help text to explain how to use the command (if it had any arguments)
    execute(message, args) {

        let weatherapi = 'api_key_here';
        let zip = args[0].toLowerCase();

        if(weatherapi === 'api_key_here') {
            console.error('No API key set in handlers/commands/weather.js');
            console.log('Make sure you obtain an API key from https://openweathermap.org if you want to use the weather command!')
            return;
        }

        var Request = require("request");

        Request.get("http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=" + zip + ",us&appid=" + weatherapi, (error, response, body) => {
            if(error) {
                console.log(body);
                console.log(error);
                return false;
            }
            console.log(body);

            let weatherdata = JSON.parse(body);

            let title = weatherdata.weather[0].description;
            let temp = weatherdata.main.temp;
            let humidity = weatherdata.main.humidity;
            let wind = weatherdata.wind.speed;
            let city = weatherdata.name;

            let weather = `The current weather in ${city} is ${title} at a temperature of ${temp}F and humidity of ${humidity}. The wind is currently blowing at a speed of ${wind} MPH.`;

            return message.reply(weather);
        });


    },
};
