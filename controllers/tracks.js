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
    handleError(req, res, err, 404);
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
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedTrack);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete track." });
  }
});

//* IO
module.exports = router;

//* FUNC
// I use this/similar function(s) in my controllers as a universal error handler.
// It's like Morgan, but custom and automatically sends a response to the client.
// For a simple app like this, it may be a bit overngineered,
// but it's copy/paste, provides a solid format with automatic defaults,
// and simplifies code above when using defaults.
// Default call: handleError(req,res,err);
function handleError(req, res, err = null, code = 500, title, callback) {
  const info = `Internal Server ERROR! (${code}) | ${req.method} => ${req.url}`;
  console.error(info, err);
  callback() ||
    res.status(code).json({
      code: code,
      title:
        title ||
        "The server encountered an error. Please try your request again later.",
      info,
      message: err.message || err || null,
    });
}
