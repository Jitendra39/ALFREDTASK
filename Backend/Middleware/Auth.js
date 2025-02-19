const flashCardModule = require("../Models/flashcard");

function Authenticated(req, res, next) {
  const { id } = req.query;
  //console.log("id", { id});
  if (!id) {
    res.status(401).send("Unauthorized");
  }
  flashCardModule
    .findOne({ userId: id })
    .then((data) => {
      if (data) {
        req.userData = data;
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((err) => {
      res.status(401).send("Unauthorized");
    });
}

module.exports = Authenticated;
