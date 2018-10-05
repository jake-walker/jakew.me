const express = require("express");
const greetings = require("./greetings.json");
const request = require("request");

const app = express();

app.set("trust proxy", (process.env.NODE_ENV === "production"));
app.set("view engine", "ejs");
app.use(require("helmet")());

const earnerId = 415794;
const groupId = 141217;

app.get("/", (req, res) => {
	request({
		url: `https://backpack.openbadges.org/displayer/${earnerId}/group/${groupId}.json`,
		json: true
	}, (err, response, body) => {
		let badges = [];

		if (err) {
			console.error("Error grabbing badges:");
			console.error(err);
		} else if (response.statusCode == 200) {
			badges = body.badges;
		}

		res.render("index", {
			greeting: greetings[Math.floor(Math.random()*greetings.length)],
			badges: badges
		});
	});
});

app.use("/assets", express.static("./assets"));

app.use((req, res, next) => {
  res.status(404).render("404");
});

console.log(`Starting jakew-me in ${process.env.NODE_ENV || "[development]"} mode!`);


app.listen(3000, () => {
	console.log(`jakew-me listening on port 3000 (${((process.env.NODE_ENV === "production") ? "" : "not ")}trusting proxy)!`);
});