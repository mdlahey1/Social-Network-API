const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require("../../controllers/thought-controller");

router
.route("/")
.get(getAllThoughts);

router
.route("/:userId")
.post(addThought);

router
.route("/:userId/:thoughtId")
.delete(deleteThought);

router
.route("/:id")
.get(getThoughtById)
.put(updateThought);

router
.route("/:thoughtId/reactions")
.put(addReaction);

router
.route("/:thoughtId/:reactionId/reactions")
.delete(removeReaction);

module.exports = router;