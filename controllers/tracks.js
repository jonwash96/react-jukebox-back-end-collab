const Track = require("../models/Track.js");

const express = require("express");
const router = express.Router();

// POST /tracks
router.post("/", async (req, res) => {
  try {
    console.log("GOT A POST REQUEST FROM ", req.url)
    const newTrack = await Track.create(req.body);
    res.status(201).json({
      message: "Successfully created new track.",
      track: newTrack,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
