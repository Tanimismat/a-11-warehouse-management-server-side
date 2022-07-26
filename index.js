const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(port, () => {
	console.log("Listening to port", port);
});

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sidhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sidhf.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log('warehouse DB connected')
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
	try {
		await client.connect();
		const carCollection = client.db("warehouseManagement").collection("car");

		app.get("/item", async (req, res) => {
			const query = {};
			const cursor = carCollection.find(query);
			const items = await cursor.toArray();
			res.send(items);
		});

		app.post("/item", async (req, res) => {
			const newItem = req.body;
			const result = await carCollection.insertOne(newItem);
			res.send(result);
		});
	} finally {
	}
}
run().catch(console.dir);
