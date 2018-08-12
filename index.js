const express = require("express");
const greetings = require("./greetings.json");

const app = express();

app.set("trust proxy", (process.env.NODE_ENV === "production"));
app.set("view engine", "ejs");
app.use(require("helmet")());

app.get("/", (req, res) => {
	res.render("index", {
		greeting: greetings[Math.floor(Math.random()*greetings.length)],
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