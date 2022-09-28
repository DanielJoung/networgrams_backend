const db = require("../models");

const index = (req, res) => {
  db.Comments.find({}, (err, comment) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json({
      comment,
      requestedAt: new Date().toLocaleDateString(),
    });
  });
};

const create = (req, res) => {
  db.Comments.create(req.body, (err, createdComment) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(createdComment);
  });
};

const destroy = (req, res) => {
  db.Comments.findByIdAndDelete(req.params.id, (err, deletedComment) => {
    if (!deletedComment)
      return res.status(404).json({ error: "Comment not found" });
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json({
      message: "deleted",
    });
  });
};

const update = (req, res) => {
  db.Comments.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, updatedComment) => {
      if (err) return res.status(404).json({ error: err.message });
      return res.status(200).json(updatedComment);
    }
  );
};

module.exports = {
  index,
  create,
  destroy,
  update,
};
