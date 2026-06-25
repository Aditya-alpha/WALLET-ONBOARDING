const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./db");
const Address = require('./models/address')
const sharp = require("sharp");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/checkaddress", async (req, res) => {
    let { address } = req.body
    try {
        let userAddress = await Address.findOne({ address })
        if (userAddress) {
            return res.status(401).json({ message: "Address already exists !" })
        }
        res.status(200).json({ message: "Address does not exist !" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to save address !" })
    }
})

app.post("/save", async (req, res) => {
    let { address, xhandle } = req.body
    try {
        await Address.create({ address, xhandle })
        res.status(200).json({ message: "Saved successfully !" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to save !" })
    }
})

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.error('Failed to start server')
        console.error(err)
        process.exit(1)
    }
}

startServer()