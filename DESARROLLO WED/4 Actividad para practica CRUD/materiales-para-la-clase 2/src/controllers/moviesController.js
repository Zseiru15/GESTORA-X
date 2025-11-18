const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
  list: (req, res) => {
    Movies.findAll({
      include: ["genre"], // 👈 Incluye el género
    })
      .then((movies) => res.render("moviesList.ejs", { movies }))
      .catch((error) => res.send(error));
  },

  detail: (req, res) => {
    Movies.findByPk(req.params.id, {
      include: ["genre", "actors"], // 👈 Incluye género y actores
    })
      .then((movie) => res.render("moviesDetail.ejs", { movie }))
      .catch((error) => res.send(error));
  },

  new: (req, res) => {
    Movies.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => res.render("newestMovies", { movies }));
  },

  recomended: (req, res) => {
    Movies.findAll({
      where: {
        rating: { [Op.gte]: 8 },
      },
      include: ["genre"],
      order: [["rating", "DESC"]],
    }).then((movies) => res.render("recommendedMovies.ejs", { movies }));
  },

  // CRUD
  add: function (req, res) {
    Genres.findAll().then((genres) => res.render("moviesAdd.ejs", { genres }));
  },

  create: function (req, res) {
    Movies.create({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
      genre_id: req.body.genre_id,
    }).then(() => res.redirect("/movies"));
  },

  edit: function (req, res) {
    let moviePromise = Movies.findByPk(req.params.id, {
      include: ["genre"], // 👈 agrega esta línea
    });
    let genrePromise = Genres.findAll();

    Promise.all([moviePromise, genrePromise]).then(([movie, genres]) => {
      res.render("moviesEdit.ejs", { movie, genres });
    });
  },

  update: function (req, res) {
    Movies.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      },
      {
        where: { id: req.params.id },
      }
    ).then(() => res.redirect("/movies/" + req.params.id));
  },

  delete: function (req, res) {
    Movies.findByPk(req.params.id).then((movie) =>
      res.render("moviesDelete.ejs", { movie })
    );
  },

  destroy: function (req, res) {
    Movies.destroy({
      where: { id: req.params.id },
    }).then(() => res.redirect("/movies"));
  },
};

module.exports = moviesController;
