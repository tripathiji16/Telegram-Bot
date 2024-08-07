var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json()) // for parsing application/json
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
) 

//This is the route the API will call
app.post("/new-message", function(req, res) {
	const { message } = req.body

	if (!message || message.text.toLowerCase().indexOf("ralco") < 0) {
		// In case a message is not present, or if our message does not have the word ralco in it, do nothing and return an empty response
		return res.end()
	}

	
	// Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
	axios
		.post(
			"https://api.telegram.org/bot7353904317:AAEPgm4_d8XfMpzjUhb3vSe4HJxktuhZTPs/sendMessage",
			{
				chat_id: message.chat.id,
				text: "Hello, this is RalcoBot",
			}
		)
		.then((response) => {
			// We get here if the message was successfully posted
			console.log("Message posted")
			res.end("ok")
		})
		.catch((err) => {
			// ...and here if it was not
			console.log("Error :", err)
			res.end("Error :" + err)
		})
})

// start the server
app.listen(3000, function() {
	console.log("Telegram app listening on port 3000!")
})
