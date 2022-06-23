const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());


const authRoute = require("./routes/auth");

app.use("/api/user", authRoute);

// app.get("/", function (req, res) {
// 	res.render("index.html");
// });

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("app listening on port", PORT);
});
 