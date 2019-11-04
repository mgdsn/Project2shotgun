var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/all", function(req, res) {
    db.Dev_Profile.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/devadd2", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/devadd", function(req, res) {
    db.Dev_Profile.create({
      Name: req.body.name,
      LinkedIn: req.body.linkedIn,
      GitHub: req.body.gitHub,
      Project: req.body.q1,
      Stack: req.body.q2,
      Language: req.body.q3,
      Database: req.body.q4,
      MVC: req.body.q5,
      Motivation: req.body.q6,
      Misc: req.body.misc
    }).then(function() {
      db.Dev_Profile.findAll({}).then(function(dbExamples) {
        var devArray = dbExamples.map(function(example) {
          return example.dataValues;
        });
        var currentUser = devArray[devArray.length - 1];
        var matchArray = [];

        for (i = 0; i < devArray.length - 1; i++) {
          var totalMatches = 0;
          if (devArray[i].Project === currentUser.Project) {
            totalMatches++;
          }
          if (
            devArray[i].Stack === currentUser.Stack &&
            currentUser.Stack === "Full Stack"
          ) {
            totalMatches++;
          }
          if (devArray[i].Stack !== currentUser.Stack) {
            totalMatches++;
          }
          if (devArray[i].Language === currentUser.Language) {
            totalMatches++;
          }
          if (devArray[i].Database === currentUser.Database) {
            totalMatches++;
          }
          if (devArray[i].MVC === currentUser.MVC) {
            totalMatches++;
          }
          if (devArray[i].Motivation === currentUser.Motivation) {
            totalMatches++;
          }

          if (totalMatches >= 5) {
            matchArray.push(devArray[i]);
          }
        }
        res.json(matchArray);
      });
    });
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
