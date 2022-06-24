const router = require("express").Router();
const bcrypt = require("bcrypt");
const express = require("express");
const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const PgPromise = require("pg-promise");

dotenv.config();

//Db Connect
const connectionString = process.env.DB_URL;
const pgp = PgPromise({});
const db = pgp(connectionString);

const app = express();

router.use(express.json());

app.get("/test", function (req, res) {
	res.json({
		name: "Kgotso",
	});
});
router.get("/users", async function (req, res) {
	let users = [];
	const getAllUsers = `select * from love_user`;

	users = await db.any(getAllUsers);

	res.json({
		data: users,
		message: "Success",
	});
});
//Register
router.post("/register", async (req, res) => {
	try {
		const { username, password, LoveCounter } = req.body;
		console.log(req.body, "register"); 
		// check(
		// 	"username",
		// 	"Username must be atleast 3 characters and not contain numbers"
		// )
		// 	.isString()
		// 	.isLength({
		// 		min: 3
		// 	}),
		// 	check("password", "Password must be greater than 6 characters").isLength({
		// 		min: 6
		// 	});

		// const errors = validationResult(req); 
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		// if(!req.body.isEmpty()){
			
		// }
		bcrypt.hash(password, 10).then(async function (hash) {
			let userDetails = `insert into love_user (user_name, pass_word, love_count) values($1, $2, $3)`;
			await db.none(userDetails, [username, hash, LoveCounter]);
		});
		res.json({
			status: "success", 
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: "error",
			error: err.message,
		});
	}
});

router.post("/login", async function (req, res) {
	const { username } = req.body;

	const user = await db.oneOrNone(
		`select * from love_user where user_name=$1`,
		[username]
	); 
	if (!user) return res.status(400).send("User does not exist");

	const dbPassword = user.pass_word;

	const validPass = await bcrypt.compare(req.body.password, dbPassword);
	if (!validPass) return res.status(400).send("Invalid credentials"); 
	//create and assign token
	const tokenUser = { name: username };
	const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
	
	res.header("access_token", token).send(token);
	// res.send("Login successful" );
});  

module.exports = router;
