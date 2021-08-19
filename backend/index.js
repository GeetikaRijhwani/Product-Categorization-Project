const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());



const productSchema = new mongoose.Schema({
	productName: String,
	price: Number,
})

const productModel = new mongoose.model('products', productSchema);


let dummyRes = { "message": "Test Successful!" };


mongoose.connect("mongodb://127.0.0.1:27017/deepnet_task_db", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("connected to database");
	})



app.get('/rootCategory', async (req, res) => {
	let rootCategory = await productModel.aggregate([
		{ "$group": { _id: "$rootCat", count: { $sum: 1 } } }
	]);
	res.send(rootCategory);
})
app.get('/products', async (req, res) => {
	let products = await productModel.find();
	res.send(products);
})

app.get('/rootCategoryProducts/:rootcat', async (req, res) => {
	let rootCategory = req.params.rootcat;
	let products = await productModel.find({ "rootCat": rootCategory });
	res.send(products);
})

app.get('/categoryL1/:rootcat', async (req, res) => {
	let rootCat = req.params.rootcat;
	let catL1 = await productModel.aggregate([
		{
			"$group": { _id: { cat_l1: "$cat_l1", rootCat: "$rootCat" }, count: { $sum: 1 } }
		},
		{
			"$match": { "_id.rootCat": rootCat }
		}
	]);
	res.send(catL1);
})

app.get('/categoryL1Products/:rootcat/:catL1', async (req, res) => {
	let rootCategory = req.params.rootcat;
	let catL1 = req.params.catL1;
	let products = await productModel.find({ "rootCat": rootCategory, "cat_l1": catL1 });
	res.send(products);
})

app.get('/categoryL2/:rootcat/:catL1', async (req, res) => {
	let rootCat = req.params.rootcat;
	let catL1 = req.params.catL1;
	let catL2 = await productModel.aggregate([
		{
			"$group": { _id: { cat_l2: "$cat_l2", cat_l1: "$cat_l1", rootCat: "$rootCat" }, count: { $sum: 1 } }
		},
		{
			"$match": { "_id.rootCat": rootCat, "_id.cat_l1": catL1 }
		}
	]);
	res.send(catL2);
})

app.get('/categoryL2Products/:rootcat/:catL1/:catL2', async (req, res) => {
	let rootCategory = req.params.rootcat;
	let catL1 = req.params.catL1;
	let catL2 = req.params.catL2;
	let products = await productModel.find({ "rootCat": rootCategory, "cat_l1": catL1, "cat_l2": catL2 });
	res.send(products);
})


// Start the server 
app.listen(8000);

