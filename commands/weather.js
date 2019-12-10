/**
 * This class responds to anyone that types !bot talk and chooses one of the phrases below to respond with at random.
 *
 */
module.exports = {
    name: 'weather', // The name of the command
    description: 'Gets the weather', // The description of the command (for help text)
    usage: 'weather [zipcode]', // Help text to explain how to use the command (if it had any arguments)
    execute(message, args) {

        let weatherapi = 'api_key_here';
        let zip = args[0].toLowerCase();

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

            message.reply(weather);
        });


    },
};
