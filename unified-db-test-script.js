require('dotenv').config();
const mongoose = require('mongoose');
const Track = require("./models/Track.js");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', ()=>console.log("Connected to MongoDB"));
mongoose.connection.on('error', ()=>console.log("Error Connecting to MongoDB"));

(async function doTheCreate() {
    const newSong = await Track.create({
        title:"Zone",
        artist:"Rezz"
    })
    console.log("Created New Song:", newSong)
    process.exit();
})()