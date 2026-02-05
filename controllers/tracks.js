//* MNT
const Track = require("../models/Track.js");

const express = require("express");
const router = express.Router();

//* ROUTE
// POST /tracks
router.post("/", async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    return res.status(201).json(newTrack);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create track." });
  }
});

// GET /tracks - index (200)
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find({});
    return res.status(200).json(tracks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

// Show - GET '/:trackId' => Search by ID, Show one Track entry
router.get("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (foundTrack) {
      res.json(foundTrack);
    } else {
      throw new Error("404 Not Found. Please try another Search");
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch track." });
  }
});

// PUT /tracks/:id - update (200)
router.put("/:id", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(200).json(updatedTrack);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update track." });
  }
});

// DELETE /tracks/:id - delete (200)
router.delete("/:id", async (req, res) => {
  try {
    let track = await Track.findById(req.params.id);
    track = await track.deleteOne();
    console.log("Deletion Response", track);
    if (track.deletedCount===0) throw new Error("Failed to Delete Track.");
    return res.status(204).json(track);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete track." });
  }
});

//* IO
module.exports = router;