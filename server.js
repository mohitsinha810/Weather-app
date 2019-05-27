const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
const logger = require("morgan");

const app = express();

const apiKey = "9978fc8ea32153c71390eadb35ef5070";

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');


app.use(logger('short'));

app.get("/",function(req,res){
	res.render("index");
}); 

app.post("/",function(req,res){
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
		if(err)
			res.render("index",{weather: null, error: "Something went wrong."});
		else{
			let weather = JSON.parse(body);
			if(weather.main == undefined)
				res.render("index",{weather: null, error: "Something went wrong. Please try again."});
			else{
				let weatherText = `It's ${weather.main.temp} degress in ${weather.name} right now.`;
				res.render("index",{weather: weatherText, error: null});
			}
		}
	});
});

app.listen(5000);