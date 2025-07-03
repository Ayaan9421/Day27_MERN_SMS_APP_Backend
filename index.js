const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save-student", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("sms_26june25");
	const coll = db.collection("student");
	console.log(req.body);
	const doc = { "_id": req.body.rno, "name": req.body.name, "marks": req.body.marks };
	coll.insertOne(doc)
		.then(response => {
			console.log(response);
			res.send(response);
		})
		.catch(error => {
			res.send(error);
		});
});

app.get("/get-students", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("sms_26june25");
	const coll = db.collection("student");
	coll.find().toArray()
		.then(response => {
			res.send(response);
		})
		.catch(error => {
			res.send(error);
		});
});

app.delete("/delete-student", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("sms_26june25");
	console.log(req.body);
	const coll = db.collection("student");
	const doc = { "_id": req.body.rno };
	console.log(doc);
	coll.deleteOne(doc)
		.then(response => {
			res.send(response);
		})
		.catch(error => {
			res.send(error);
		});
});

app.put("/update-student", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("sms_26june25");
	const coll = db.collection("student");
	console.log(req.body);
	const doc = { "_id": req.body.rno, "name": req.body.name, "marks": req.body.marks };
	coll.replaceOne({ "_id": req.body.rno }, doc)
		.then(response => {
			console.log(response);
			res.send(response);
		})
		.catch(error => {
			console.log(error);
			res.send(error);
		});
});

app.listen(8000, () => {
	console.log("Server running at 8000");
});