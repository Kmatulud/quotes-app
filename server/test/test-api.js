const router = require("express").Router();
const bcrypt = require("bcrypt");
const express = require("express");
const supertest = require("supertest");
const assert = require("assert");
const fs = require("fs");
const { default: axios } = require("axios");
const cors = require("cors");
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

app.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

describe("The Love Counter App", function () {
	before(async function () {
		this.timeout(5000);
		await db.none(`delete from love_user`);
		const commandText = fs.readFileSync("table.sql", "utf-8");
		await db.none(commandText);
	});

	    it('should have a test method', async () => {

		const response = await supertest(app)
			.get('/api/user/test')
			.expect(200);

		assert.deepStrictEqual({ name: 'Kgotso' }, response.body);

	});

    it('should be able to find all users', async () => {
		const response = await supertest(app)
			.get("/api/user/users")
			.expect(200);

		const users = response.body.data;
		assert.equal(5, users);

	});

	it('should be able to find loggedin user by username and password', async () => {
		// change the code statement below

		const response = await supertest(app)
			.get('/api/user/login?username={$user_name}&password={pass_word}')
			.expect(200);

		const user = response.body.data;
		assert.equal(1, user);

	});
	after(() => {
		db.$pool.end();
	});
});
