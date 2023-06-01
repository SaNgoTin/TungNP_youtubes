const express = require("express"),
  bodyParser = require("body-parser");
const Youtubes = require("../Model/youtubes");
const youtubeRouter = express.Router();
youtubeRouter.use(bodyParser.json());

youtubeRouter
  .route("/")
  .get((req, res, next) => {
    Youtubes.find({})
      .then(
        (youtubes) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtubes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Youtubes.create(req.body)
      .then(
        (youtube) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtube);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not suported on /youtubes");
  })
  .delete((req, res, next) => {
    Youtubes.deleteMany({})
      .then(
        (reqs) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reqs);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

youtubeRouter
  .route("/:youtubeId")
  .get((req, res, next) => {
    Youtubes.findById(req.params.youtubeId)
      .then(
        (youtube) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtube);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST opeeration not suported on /youtubes/" + req.params.youtubeId
    );
  })
  .put((req, res, next) => {
    Youtubes.findByIdAndUpdate(
      req.params.youtubeId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (youtube) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtube);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Youtubes.findByIdAndRemove(req.params.youtubeId)
      .then(
        (reqs) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reqs);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = youtubeRouter;
